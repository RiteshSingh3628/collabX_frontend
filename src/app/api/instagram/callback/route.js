import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const base = process.env.NEXTAUTH_URL;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(
      new URL("/onboarding/influencer?ig_error=denied", base)
    );
  }

  try {
    // Exchange authorization code for access token (Business Login uses Facebook Graph API)
    const tokenRes = await fetch("https://graph.facebook.com/v21.0/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.INSTAGRAM_APP_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: `${base}/api/instagram/callback`,
        code,
      }),
    });

    const tokenData = await tokenRes.json();
    console.log("Instagram token response:", JSON.stringify(tokenData, null, 2));

    if (!tokenData.access_token) {
      throw new Error("No access token in response");
    }

    // Fetch Instagram profile via Graph API
    const profileRes = await fetch(
      `https://graph.instagram.com/v21.0/me?fields=id,username,account_type,media_count&access_token=${tokenData.access_token}`
    );
    const profile = await profileRes.json();
    console.log("Instagram profile response:", JSON.stringify(profile, null, 2));

    if (profile.error) {
      throw new Error(profile.error.message);
    }

    // Store profile in a short-lived client-readable cookie
    const response = NextResponse.redirect(
      new URL("/onboarding/influencer", base)
    );
    response.cookies.set("ig_profile", JSON.stringify(profile), {
      httpOnly: false,
      maxAge: 600,
      path: "/",
      sameSite: "lax",
    });
    // Store token securely (httpOnly)
    response.cookies.set("ig_token", tokenData.access_token, {
      httpOnly: true,
      maxAge: 600,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    console.error("Instagram OAuth callback error:", err);
    return NextResponse.redirect(
      new URL("/onboarding/influencer?ig_error=failed", base)
    );
  }
}
