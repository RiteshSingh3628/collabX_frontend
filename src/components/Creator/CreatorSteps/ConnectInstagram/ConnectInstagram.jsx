"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ButtonWrapper from "@/components/Custom_UI/Button";
import LoadingDots from "@/components/Custom_UI/Button/LoadingDots";

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export default function ConnectInstagram() {
  const [igProfile] = useState(() => {
    const profileCookie = getCookie("ig_profile");
    if (profileCookie) {
      try {
        deleteCookie("ig_profile");
        return JSON.parse(profileCookie);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [isFinishing, setIsFinishing] = useState(false);
  const { update: updateSession } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (igProfile) {
      toast.success("Instagram connected successfully!");
    }
  }, [igProfile]);

  useEffect(() => {
    const igError = searchParams.get("ig_error");
    if (igError === "denied") {
      toast.error("Instagram connection was cancelled.");
    } else if (igError === "failed") {
      toast.error("Instagram connection failed. Please try again.");
    }
  }, [searchParams]);

  const completeOnboarding = async () => {
    setIsFinishing(true);
    try {
      await updateSession({ isProfileCompleted: true });
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
      setIsFinishing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-white justify-center">
      <div className="relative w-full max-w-130">
        <div className="bg-white px-10 py-11">
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>
              ONBOARDING — ALMOST DONE
            </p>
            <h1 className="reg-serif" style={{ fontSize: "2rem", lineHeight: 1.2, color: "#0f172a", margin: 0 }}>
              Connect your Instagram
            </h1>
            <p style={{ marginTop: 12, fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.65 }}>
              Link your account so brands can discover your profile and audience reach.
            </p>
          </div>

          {igProfile ? (
            // Connected state
            <div style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "16px 20px", borderRadius: 12,
              border: "1.5px solid #e2e8f0", background: "#f8fafc",
              marginBottom: 24,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white",
              }}>
                <InstagramIcon />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: "0.95rem", color: "#0f172a", margin: 0 }}>
                  @{igProfile.username}
                </p>
                <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "2px 0 0" }}>
                  {igProfile.media_count ?? 0} posts · {igProfile.account_type?.replace(/_/g, " ") ?? "Personal"}
                </p>
              </div>
              <span style={{
                padding: "4px 10px", borderRadius: 20,
                background: "#dcfce7", color: "#16a34a",
                fontSize: "0.72rem", fontWeight: 700, flexShrink: 0,
              }}>
                Connected
              </span>
            </div>
          ) : (
            // Connect button
            <a
              href="/api/instagram/connect"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                width: "100%", padding: "14px 20px", borderRadius: 14,
                background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                color: "white", fontWeight: 600, fontSize: "0.9rem",
                textDecoration: "none", marginBottom: 24,
                boxShadow: "0 4px 20px rgba(220, 39, 67, 0.3)",
              }}
            >
              <InstagramIcon />
              Connect Instagram
            </a>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <ButtonWrapper
              type="button"
              label={isFinishing ? <LoadingDots /> : "Finish Setup"}
              isSubmitting={isFinishing}
              disabled={isFinishing}
              onClick={completeOnboarding}
              className="w-full rounded-[14px] bg-[#64748b] text-white text-sm font-semibold tracking-wide py-3.5 hover:bg-[#475569] transition-all hover:-translate-y-px shadow-[0_4px_20px_rgba(15,23,42,0.18)] hover:shadow-[0_8px_28px_rgba(15,23,42,0.22)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 cursor-pointer"
            />
            {!igProfile && (
              <button
                type="button"
                onClick={completeOnboarding}
                disabled={isFinishing}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#94a3b8", fontSize: "0.8rem", padding: "8px",
                  textDecoration: "underline",
                }}
              >
                Skip for now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
