import { getUserSessionServer } from "@/lib/utils/session";
import { getSession } from "next-auth/react";

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request was successful
 * @property {number} status - HTTP status code
 * @property {string} [message] - Optional message from the server
 * @property {Object} [data] - Optional data returned by the server
 * @property {Error} [error] - Error object if request failed
 */

/**
 * Check if code is running in a browser environment
 * @returns {boolean} True if in browser, false if in server
 */
const isBrowser = () => typeof window !== "undefined";

/**
 * API client for making fetch requests with proper authentication and error handling
 * Automatically adds auth headers and handles refresh token rotation
 *
 * @param {string} url - The URL to fetch
 * @param {Object} requestOptions - Options for the fetch request
 * @param {boolean} [requestOptions.isForm=false] - Whether the request is a form submission
 * @param {Object} [requestOptions.session=null] - Session object (for server components)
 * @param {Object} [requestOptions.headers={}] - Additional headers to include
 * @returns {Promise<ApiResponse>} The response from the server
 */
async function apiClient(url, requestOptions = {}) {
  const {
    isForm = false,
    session: providedSession = null,
    headers = {},
    tags,
    revalidate,
    cache,
    ...rest
  } = requestOptions;

  try {
    // Get session based on context
    let session = providedSession;

    // If no session is provided and we're in a browser, get it from client
    if (!session && isBrowser()) {
      session = await getSession();
    }
    // Server-side requests should pass session explicitly

    // Prepare headers with authentication if available
    const customHeaders = prepareHeaders(headers, session, isForm, url);

    // Execute request with prepared options
    const response = await executeFetch(url, {
      ...rest,
      headers: customHeaders,
      tags,
      revalidate,
      cache,
    });

    return response;
  } catch (error) {
    console.error(`API request error for ${url}:`, error);
    return {
      success: false,
      status: error.status || 500,
      message: error.message || "An unexpected error occurred",
      error,
    };
  }
}

/**
 * Prepare request headers, including authentication if available
 *
 * @param {Object} initialHeaders - Initial headers object
 * @param {Object} session - User session data
 * @param {boolean} isForm - Whether the request is a form submission
 * @param {string} url - The request URL
 * @returns {Headers} Prepared headers object
 */
function prepareHeaders(initialHeaders, session, isForm, url) {
  const headers = new Headers(initialHeaders);

  // Add auth header for authenticated requests (except login/register)
  const isAuthEndpoint = /\/(login|register)/.test(url);
  if (!isAuthEndpoint && session?.accessToken) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }

  // Add content type for non-form requests
  if (!isForm && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return headers;
}

/**
 * Execute fetch with proper response handling
 *
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise<ApiResponse>} Processed response
 */
async function executeFetch(url, options) {
  const { tags, revalidate, cache, ...fetchOptions } = options;
  const response = await fetch(url, {
    ...fetchOptions,
    ...(tags || revalidate
      ? {
          next: {
            ...(tags && { tags: Array.isArray(tags) ? tags : [tags] }),
            ...(revalidate !== undefined && { revalidate }),
          },
        }
      : {}),
    ...(cache && { cache }),
  });
  const contentType = response.headers.get("content-type") || "";

  // Handle JSON responses
  if (contentType.includes("json")) {
    return handleJsonResponse(response);
  }

  // Handle binary responses (file downloads)
  if (contentType.includes("octet-stream") || contentType.includes("pdf")) {
    return response;
  }

  // Handle SSE streams — return raw response so caller can read the stream
  if (contentType.includes("text/event-stream")) {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response;
  }

  // Handle other response types (text, html, etc.)
  return handleTextResponse(response);
}

/**
 * Handle JSON response parsing and normalization
 *
 * @param {Response} response - Fetch response object
 * @returns {Promise<ApiResponse>} Normalized JSON response
 */
async function handleJsonResponse(response) {
  let data = await response.json();
  if (Array.isArray(data)) {
    data = { data };
  }

  // Normalize response structure
  const result = {
    ...data,
    success: data.success !== undefined ? data.success : response.ok,
    status: data.status !== undefined ? data.status : response.status,
  };

  // Handle authentication errors
  if ([401, 403].includes(response.status)) {
    console.error("Authentication error:", result.message || "Unauthorized");
    // Only throw for non-login endpoints to allow proper error handling in login flow
    if (!response.url.includes("/login")) {
      throw new Error(result.message || "Unauthorized request");
    }
  }

  return result;
}

/**
 * Handle text response
 *
 * @param {Response} response - Fetch response object
 * @returns {Promise<ApiResponse>} Processed text response
 */
async function handleTextResponse(response) {
  // Handle auth errors
  if ([401, 403].includes(response.status)) {
    throw new Error("Unauthorized request");
  }

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
  }

  const text = await response.text();
  return {
    success: response.ok,
    status: response.status,
    data: text,
  };
}

/**
 * Server-side API client helper that automatically includes session
 * Use this in server components or API routes
 *
 * @param {string} url - The URL to fetch
 * @param {Object} options - Request options
 * @returns {Promise<ApiResponse>} The response
 */
export async function serverApiClient(url, options = {}) {
  try {
    // Get session server-side using cached helper
    const session = await getUserSessionServer();

    // Call the main apiClient with the session
    return await apiClient(url, {
      ...options,
      session,
      cache: options.cache ? "force-cache" : "no-store",
    });
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Server API request failed",
    };
  }
}

export default apiClient;
