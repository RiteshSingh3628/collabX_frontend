export const ROUTES = {
  LANDING: "/",
  HOME: "/home",
  LOGIN: "/auth/login",
  REGISTER_BRAND: "/auth/brand",
  REGISTER_CREATOR: "/auth/creator",
};

export const AUTH_ROUTES = [
  "/auth"
];

export function getProxyRedirect(requestUrl, token) {
  const url = new URL(requestUrl);
  const pathname = url.pathname;

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // 1. Not Logged In
  if (!token) {
    // Landing page is allowed
    if (pathname === ROUTES.LANDING) {
      return null;
    }
    // Auth routes are allowed
    if (isAuthRoute) {
      return null;
    }
    // Unauthenticated, trying to access a protected route -> Redirect to Landing
    return new URL(ROUTES.LANDING, requestUrl);
  }

  // 2. User IS Logged In, but Profile is NOT completed
  if (token && token.isProfileCompleted !== true) {
    // Determine onboarding path based on role (assumes "brand" or "influencer")
    const role = token.role?.toLowerCase() || "brand";
    const onboardingPath = `/onboarding/${role}`;
    
    // If they are already on their designated onboarding path, allow it
    if (pathname.startsWith(onboardingPath)) {
      return null;
    }

    // Force redirection to their onboarding path
    return new URL(onboardingPath, requestUrl);
  }

  // 3. User IS Logged In and Profile IS completed
  if (token && token.isProfileCompleted === true) {
    // Redirect away from landing, auth, or onboarding routes to Homepage
    if (
      pathname === ROUTES.LANDING ||
      isAuthRoute ||
      pathname.startsWith("/onboarding")
    ) {
      return new URL(ROUTES.HOME, requestUrl);
    }
    
    // Allow access to all other paths (e.g., /home, protected routes)
    return null;
  }

  return null;
}
