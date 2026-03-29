"use client";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import ButtonWrapper from "@/components/Custom_UI/Button";
import LoadingDots from "@/components/Custom_UI/Button/LoadingDots";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import OptionCard from "@/components/common/OptionCard";
import { updateCreatorProfile } from "@/framework/server-action/creator/action";



export default function IdentifyYourself() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isPending, startTransition] = useTransition();
  const { update: updateSession } = useSession();
  const router = useRouter();

  const OPTIONS = [
    { id: 1, value: "female" },
    { id: 2, value: "male" },
    { id: 3, value: "Other" }
  ];

  const onSubmit = async () => {
    setIsSubmitting(true);
    startTransition(async () => {
      const data = { gender: selectedOption?.value };
      data.currentStep = 2;
      const response = await updateCreatorProfile(data);
      if (response?.success) {
        toast.success(response?.message);
        await updateSession({ currentStep: 2 });
        router.refresh();
      } else {
        toast.error(response?.message);
      }
      setIsSubmitting(false);
    });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="min-h-screen flex items-center bg-white justify-center">
      <div className="relative w-full max-w-[520px]">
        <div className="bg-white px-10 py-11">
          {/* header */}
          <div className="reg-field reg-d0" style={{ marginBottom: 32 }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>
              ONBOARDING - 2 MINUTES LEFT
            </p>
            <h1 className="reg-serif" style={{ fontSize: "2rem", lineHeight: 1.2, color: "#0f172a", margin: 0 }}>
              How do you identify yourself?
            </h1>
            <p style={{ marginTop: 12, fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.65 }}>
              We&apos;ll match you with brands that sell products specific to you.
            </p>
          </div>

          <form
            noValidate
            aria-label="Registration form"
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div className="grid grid-cols-1 gap-4">
              {OPTIONS.map((option) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  isSelected={selectedOption?.id === option.id}
                  onSelect={handleOptionSelect}
                />
              ))}
            </div>

            <div className="reg-field reg-d7" style={{ marginTop: 6 }}>
              <ButtonWrapper
                type="button"
                label={isSubmitting ? <LoadingDots /> : "Next"}
                isSubmitting={isSubmitting}
                disabled={isPending}
                onClick={onSubmit}
                className="w-full rounded-[14px] bg-[#64748b] text-white text-sm font-semibold tracking-wide py-3.5 hover:bg-[#475569] transition-all hover:-translate-y-px shadow-[0_4px_20px_rgba(15,23,42,0.18)] hover:shadow-[0_8px_28px_rgba(15,23,42,0.22)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
