"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { brandBasicInfoSchema, DEFAULT_VALUES } from "@/validations/BrandBasicInfoSchema";

import TextInput from "@/components/Custom_UI/TextInput";
import ButtonWrapper from "@/components/Custom_UI/Button";
import { TextareaInput } from "@/components/Custom_UI";
import LoadingDots from "@/components/Custom_UI/Button/LoadingDots";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createBrand } from "@/framework/server-action/brand/action";


export default function BasicInfo() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { update: updateSession } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors, isSubmitted },
    control
  } = useForm({
    resolver: zodResolver(brandBasicInfoSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const sharedErrors = isSubmitted ? errors : {};

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    startTransition(async () => {
      data.currentStep = 2;
      const response = await createBrand(data);
      if (response?.success) {
        toast.success(response?.message);
        await updateSession({ currentStep: 2 });
        router.refresh();
      } else {
        toast.error(response?.message);
      }
      setIsSubmitting(false);
    });
  }

  return (
    <div className=" min-h-screen flex items-center bg-white justify-center ">

        <div className="relative w-full max-w-[520px]">
            <div className=" bg-white px-10 py-11">

              {/* header */}
              <div className="reg-field reg-d0" style={{ marginBottom:32 }}>
                <p style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#94a3b8", marginBottom:10 }}>
                  ONBOARDING
                </p>
                <h1 className="reg-serif" style={{ fontSize:"2rem", lineHeight:1.2, color:"#0f172a", margin:0 }}>
                  Brand Details
                </h1>
                <p style={{ marginTop:12, fontSize:"0.85rem", color:"#94a3b8", lineHeight:1.65 }}>
                  To effectively engage creators, make sure your description is brief and engaging.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Registration form"
                style={{ display:"flex", flexDirection:"column", gap:14 }}
              >


                {/* website */}
                <div className="reg-field reg-d2 reg-wrap">
                  <TextInput
                    control={control}
                    name="website"
                    label="Website"
                    isRequired
                    placeholder="https://gymshark.com"
                    autoComplete="url"
                    errors={sharedErrors}
                    disabled={isSubmitting}
                    aria-invalid={errors.website ? "true" : "false"}
                  />
                </div>

                {/* Brand Name */}
                <div className="reg-field reg-d4 reg-wrap">
                  <TextInput
                    control={control}
                    name="brandName"
                    label="Brand Name"
                    isRequired
                    placeholder="Gymshark"
                    autoComplete="brand-name"
                    errors={sharedErrors}
                    disabled={isSubmitting}
                    aria-invalid={errors.brandName ? "true" : "false"}
                  />
                </div>

                <div className="reg-field reg-d6 reg-wrap">
                    <TextareaInput
                        control={control}
                        name="description"
                        label="What makes your brand special?"
                        isRequired
                        placeholder="e.g. We are a sustainable fashion brand that uses recycled materials..."
                        autoComplete="brand-description"
                        errors={sharedErrors}
                        disabled={isSubmitting}
                        aria-invalid={errors.description ? "true" : "false"}
                    />
                </div>

                {/* Submit — reusing ButtonWrapper */}
                <div className="reg-field reg-d7" style={{ marginTop:6 }}>
                  <ButtonWrapper
                    type="submit"
                    label={isSubmitting ? <LoadingDots />  : "Next"}
                    isSubmitting={isSubmitting}
                    disabled={isSubmitting}
                    className="w-full rounded-[14px] bg-[#0f172a] text-white text-sm font-semibold tracking-wide py-[14px] hover:bg-[#1e293b] transition-all hover:-translate-y-px shadow-[0_4px_20px_rgba(15,23,42,0.18)] hover:shadow-[0_8px_28px_rgba(15,23,42,0.22)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 cursor-pointer"
                  />
                </div>
              </form>
            </div>
        </div>
      </div>
  );
}