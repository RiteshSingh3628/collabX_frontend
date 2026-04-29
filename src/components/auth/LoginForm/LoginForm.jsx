"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import Link from "next/link";

import PasswordInput from "@/components/Custom_UI/PasswordInput";
import TextInput from "@/components/Custom_UI/TextInput";
import ButtonWrapper from "@/components/Custom_UI/Button";
import { loginSchema, DEFAULT_VALUES } from "@/validations/LoginSchema";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/Custom_UI/Button/LoadingDots";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
    control
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const sharedErrors = isSubmitted ? errors : {};

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    NProgress.start();
    startTransition(async () => {
      try {
        const response = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });
        if (response?.ok) {
          toast.success(response?.message || 'Login successfull');
          router.push('/onboarding/brand');
        } else {
          toast.error(response?.message || 'Login failed');
        }
      } finally {
        NProgress.done();
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="reg-root reg-bg  min-h-screen flex items-center justify-center px-4 py-16">

        <div className="relative w-full max-w-[520px]">
            <div className="rounded-3xl bg-white border border-slate-100 shadow-lg px-10 py-11">

              {/* header */}
              <div className="reg-field reg-d0" style={{ marginBottom:32 }}>
                <p style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#94a3b8", marginBottom:10 }}>
                  CollabXSphere
                </p>
                <h1 className="reg-serif" style={{ fontSize:"2rem", lineHeight:1.2, color:"#0f172a", margin:0 }}>
                  Login
                </h1>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Registration form"
                style={{ display:"flex", flexDirection:"column", gap:14 }}
              >

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

                {/* Password */}
                <div className="reg-field reg-d4 reg-wrap">
                  <PasswordInput
                    control={control}
                    name="password"
                    label="Password"
                    isRequired
                    placeholder="*************"
                    autoComplete="new-password"
                    errors={sharedErrors}
                    disabled={isSubmitting}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                </div>

                {/* Submit — reusing ButtonWrapper */}
                <div className="reg-field reg-d7" style={{ marginTop:6 }}>
                  <ButtonWrapper
                    type="submit"
                    label={isSubmitting ? <LoadingDots/> : "Login"}
                    isSubmitting={isSubmitting}
                    disabled={isPending}
                    className="w-full rounded-[14px] bg-[#0f172a] text-white text-sm font-semibold tracking-wide py-[14px] hover:bg-[#1e293b] transition-all hover:-translate-y-px shadow-[0_4px_20px_rgba(15,23,42,0.18)] hover:shadow-[0_8px_28px_rgba(15,23,42,0.22)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 cursor-pointer"
                  />
                </div>
              </form>

              {/* footer links */}
              <p style={{ marginTop:22, textAlign:"center", fontSize:"0.8rem", color:"#94a3b8" }}>
                Don&apos;t have an account?{" "}
                <Link href="/auth/brand/register" style={{ color:"#0f172a", fontWeight:500 }}>
                  Register here
                </Link>
              </p>
            </div>
        </div>
      </div>
  );
}

export default LoginForm;
