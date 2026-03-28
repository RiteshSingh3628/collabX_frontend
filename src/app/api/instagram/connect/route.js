import { redirect } from "next/navigation";

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.INSTAGRAM_CLIENT_ID,
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/instagram/callback`,
    scope: "instagram_business_basic",
    response_type: "code",
  });

  redirect(`https://www.instagram.com/oauth/authorize?${params}`);
}
