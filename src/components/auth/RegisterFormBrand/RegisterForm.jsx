"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { brandRegisterSchema } from "@/validations/BrandRegisterSchema";
import { DEFAULT_VALUES } from "@/validations/BrandRegisterSchema";

import PasswordInput from "@/components/Custom_UI/PasswordInput";
import TextInput from "@/components/Custom_UI/TextInput";
import ButtonWrapper from "@/components/Custom_UI/Button";
import { ArrowRight, Check } from "lucide-react";


function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
    control
  } = useForm({
    resolver: zodResolver(brandRegisterSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const sharedErrors = isSubmitted ? errors : {};

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call — replace with real endpoint
      await new Promise((res) => setTimeout(res, 2000));
      toast.success("Account created! Welcome to CollabXSphere 🎉", {
        description: `Signed up as ${data.role === "brand" ? "Brand" : "Influencer"}: ${data.email}`,
      });
      reset();
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reg-root reg-bg  min-h-screen flex items-center justify-center px-4 py-16">

        {/* ambient blobs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
          <div style={{ position:"absolute", top:"-10%", right:"-8%", width:440, height:440, borderRadius:"50%", background:"radial-gradient(circle, #dbeafe 0%, transparent 70%)", opacity:0.5 }} />
          <div style={{ position:"absolute", bottom:"-12%", left:"-8%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, #fce7f3 0%, transparent 70%)", opacity:0.45 }} />
        </div>

        <div className="relative w-full max-w-[420px]">

          {done ? (
            /* ── success state ── */
            <div className="reg-card rounded-3xl bg-white border border-slate-100 shadow-[0_8px_60px_rgba(0,0,0,0.07)] px-10 py-14 text-center">
              <div style={{ margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center", width:56, height:56, borderRadius:"50%", background:"#f0fdf4", border:"1px solid #bbf7d0" }}>
                <Check size={22} strokeWidth={2.5} color="#16a34a" />
              </div>
              <h2 className="reg-serif" style={{ fontSize:"1.8rem", color:"#0f172a", marginBottom:8 }}>
                You&apos;re in!
              </h2>
              <p style={{ fontSize:"0.875rem", color:"#64748b", lineHeight:1.7 }}>
                Welcome to CollabXSphere. Your brand account is ready to go.
              </p>
              <Link
                href="/auth/brand/login"
                style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:28, fontSize:"0.875rem", fontWeight:600, color:"#0f172a" }}
              >
                Go to login <ArrowRight size={14} />
              </Link>
            </div>

          ) : (
            /* ── form card ── */
            <div className="rounded-3xl bg-white border border-slate-100 shadow-lg px-10 py-11">

              {/* header */}
              <div className="reg-field reg-d0" style={{ marginBottom:32 }}>
                <p style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#94a3b8", marginBottom:10 }}>
                  CollabXSphere
                </p>
                <h1 className="reg-serif" style={{ fontSize:"2rem", lineHeight:1.2, color:"#0f172a", margin:0 }}>
                  Register as<br /><em>a Brand</em>
                </h1>
                <p style={{ marginTop:12, fontSize:"0.85rem", color:"#94a3b8", lineHeight:1.65 }}>
                  If you are a creator,{" "}
                  <Link href="/auth/creator/register" style={{ color:"#0f172a", fontWeight:500, textDecoration:"underline", textUnderlineOffset:3 }}>
                    sign up here
                  </Link>
                  .
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Registration form"
                style={{ display:"flex", flexDirection:"column", gap:14 }}
              >

                {/* First & Last name */}
                <div className="reg-field reg-d1" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <div className="reg-wrap">
                    <TextInput
                      control={control}
                      name="firstName"
                      label="First Name"
                      isRequired
                      placeholder="Jane"
                      autoComplete="given-name"
                      errors={sharedErrors}
                      disabled={isSubmitting}
                      aria-invalid={errors.firstName ? "true" : "false"}
                    />
                  </div>
                  <div className="reg-wrap">
                    <TextInput
                      control={control}
                      name="lastName"
                      label="Last Name"
                      isRequired
                      placeholder="Cat"
                      autoComplete="family-name"
                      errors={sharedErrors}
                      disabled={isSubmitting}
                      aria-invalid={errors.lastName ? "true" : "false"}
                    />
                  </div>
                </div>

                {/* Business email */}
                <div className="reg-field reg-d2 reg-wrap">
                  <TextInput
                    control={control}
                    name="email"
                    label="Email"
                    isRequired
                    placeholder="jane@gmail.com"
                    autoComplete="email"
                    errors={sharedErrors}
                    disabled={isSubmitting}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                </div>

                {/* Brand website */}
                {/* <div className="reg-field reg-d3 reg-wrap">
                  <TextInput
                    control={control}
                    name="website"
                    label="Brand Website"
                    placeholder="gymshark.com"
                    autoComplete="url"
                    errors={sharedErrors}
                    disabled={isSubmitting}
                    aria-invalid={errors.website ? "true" : "false"}
                  />
                </div> */}

                {/* Password */}
                <div className="reg-field reg-d4 reg-wrap">
                  <PasswordInput
                    control={control}
                    name="password"
                    label="Password"
                    isRequired
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    errors={sharedErrors}
                    disabled={isSubmitting}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                </div>

                {/* Confirm Password */}
                <div className="reg-field reg-d5 reg-wrap">
                  <PasswordInput
                    control={control}
                    name="confirmPassword"
                    label="Confirm Password"
                    isRequired
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    errors={sharedErrors}
                    disabled={isSubmitting}
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                  />
                </div>

                {/* Promotions toggle */}
                {/* <div
                  className="reg-field reg-d6"
                  style={{ display:"flex", alignItems:"center", justifyContent:"space-between", borderRadius:12, border:"1px solid #e2e8f0", background:"#f8fafc", padding:"11px 16px" }}
                >
                  <span style={{ fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.07em", textTransform:"uppercase", color:"#94a3b8" }}>
                    Offers &amp; promotions
                  </span>
                  <label style={{ position:"relative", display:"inline-flex", alignItems:"center", cursor:"pointer" }}>
                    <input className="reg-toggle-input" type="checkbox" style={{ position:"absolute", opacity:0, width:0, height:0 }} />
                    <div className="reg-toggle-track">
                      <div className="reg-toggle-thumb" />
                    </div>
                  </label>
                </div> */}

                {/* Submit — reusing ButtonWrapper */}
                <div className="reg-field reg-d7" style={{ marginTop:6 }}>
                  <ButtonWrapper
                    type="submit"
                    label={isSubmitting ? "Creating account…" : "Register as a Brand"}
                    isSubmitting={isSubmitting}
                    disabled={isSubmitting}
                    className="w-full rounded-[14px] bg-[#0f172a] text-white text-sm font-semibold tracking-wide py-[14px] hover:bg-[#1e293b] transition-all hover:-translate-y-px shadow-[0_4px_20px_rgba(15,23,42,0.18)] hover:shadow-[0_8px_28px_rgba(15,23,42,0.22)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 cursor-pointer"
                  />
                </div>
              </form>

              {/* footer links */}
              <p style={{ marginTop:22, textAlign:"center", fontSize:"0.8rem", color:"#94a3b8" }}>
                Already have an account?{" "}
                <Link href="/auth/brand/login" style={{ color:"#0f172a", fontWeight:500 }}>
                  Login here
                </Link>
              </p>

              <p style={{ marginTop:14, textAlign:"center", fontSize:"0.7rem", color:"#cbd5e1", lineHeight:1.65 }}>
                By registering you agree to our{" "}
                <Link href="/terms" style={{ textDecoration:"underline", textUnderlineOffset:2 }}>Terms</Link>
                {" "}&amp;{" "}
                <Link href="/privacy" style={{ textDecoration:"underline", textUnderlineOffset:2 }}>Privacy Policy</Link>
              </p>
            </div>
          )}
        </div>
      </div>
  );
}

export default RegisterForm;
