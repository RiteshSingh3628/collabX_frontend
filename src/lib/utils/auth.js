import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import URLS from "@/constants/urls";
import apiClient from "./apiClient";
import { login } from "@/framework/server-action/auth/action";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await login(credentials);

          if (res.success && res.data) {
            const userData = res.data.user;
            const tokenData = res.data;
            return {
              id: userData._id,
              email: userData.email,
              fullName: userData.firstName + " " + userData.lastName,
              active: userData.status,
              token: tokenData.token,
              role: userData.userType,
              currentStep: userData.currentStep || 1,
              isProfileCompleted: userData.isProfileCompleted || false,
              tokenExpiryTime: tokenData.tokenExpiryTime,
              refreshToken: tokenData.refreshToken,
              refreshTokenExpiryTime: tokenData.refreshTokenExpiryTime,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // trigger when update() is called
      if (trigger === "update" && session) {
        token.user = { ...token.user, ...session };
      }

      if (user) {
        return {
          user: {
            id: user.id,
            email: user.email,
            active: user.active,
            fullName: user.fullName,
            role: user.role,
            currentStep: user.currentStep,
            isProfileCompleted: user.isProfileCompleted,
          },
          accessToken: user.token,
          accessTokenExpiry: user.tokenExpiryTime,
          refreshToken: user.refreshToken,
          refreshTokenExpiryTime: user.refreshTokenExpiryTime,
        };
      }
      const now = Date.now();

      // If access token still valid → return existing token
      if (token.accessTokenExpiry && now < token.accessTokenExpiry) {
        return token;
      }

      // If refresh token also expired → invalidate session
      if (token.refreshTokenExpiryTime && now >= token.refreshTokenExpiryTime) {
        return {
          ...token,
          user: null,
          accessToken: null,
          error: "RefreshTokenExpired",
        };
      }

      // If expired → refresh
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (!token.user || token.error) return null;

      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60*60*24,
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

async function refreshAccessToken(token) {
  try {
    const response = await apiClient(URLS.AUTH.REFRESH, {
      method: "POST",
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    if (!response.success) {
      throw response;
    }

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.token,
      accessTokenExpiry: refreshedTokens.tokenExpiryTime,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
      refreshTokenExpiryTime:
        refreshedTokens.refreshTokenExpiryTime ?? token.refreshTokenExpiryTime,
    };
  } catch (error) {
    console.error("RefreshTokenError", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth(authOptions);
export { handler };
