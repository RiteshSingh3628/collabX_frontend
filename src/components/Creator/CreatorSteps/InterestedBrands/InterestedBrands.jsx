"use client";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import ButtonWrapper from "@/components/Custom_UI/Button";
import LoadingDots from "@/components/Custom_UI/Button/LoadingDots";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import OptionCard from "@/components/common/OptionCard";
import { updateCreatorProfile } from "@/framework/server-action/creator/action";

export default function InterestedBrands() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { update: updateSession } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const OPTIONS = [
    { id: 1, value: "Beauty & Care" },
    { id: 2, value: "Consumer Goods" },
    { id: 3, value: "Electronics" },
    { id: 4, value: "Essentials" },
    { id: 5, value: "Fashion & Apparel" },
    { id: 6, value: "Fintech" },
    { id: 7, value: "Sports & Fitness" },
    { id: 8, value: "Food & Beverages" },
    { id: 9, value: "Gaming" },
    { id: 10, value: "Hair" },
    { id: 11, value: "Home Goods" },
    { id: 12, value: "Jewellery & Extras" },
    { id: 13, value: "Kids & Family" },
    { id: 14, value: "Makeup" },
    { id: 15, value: "Other" },
    { id: 16, value: "Outdoors" },
    { id: 17, value: "Pets" },
    { id: 18, value: "Services" },
  ];

  const onSubmit = async () => {
    setIsSubmitting(true);
    startTransition(async () => {
      const data = { interests: selectedOptions.map(o => o.value) };
      data.currentStep = 5;
      const response = await updateCreatorProfile(data);
      if (response?.success) {
        toast.success(response?.message);
        await updateSession({ currentStep: 5 });
        router.refresh();
      } else {
        toast.error(response?.message);
      }
      setIsSubmitting(false);
    });
  };

  const handleOptionSelect = (option) => {
    if (selectedOptions.find(o => o.id === option.id)) {
      setSelectedOptions(selectedOptions.filter(o => o.id !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-white justify-center py-10">
      <div className="relative w-full max-w-[520px]">
        <div className="bg-white px-10 py-11">
          {/* header */}
          <div className="reg-field reg-d0" style={{ marginBottom: 32 }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>
              ONBOARDING - 1 MINUTE LEFT
            </p>
            <h1 className="reg-serif" style={{ fontSize: "2rem", lineHeight: 1.2, color: "#0f172a", margin: 0 }}>
              What brands are you interested in working with?
            </h1>
          </div>

          <form
            noValidate
            aria-label="Registration form"
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
            className="mt-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OPTIONS.map((option) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  isSelected={selectedOptions.some(o => o.id === option.id)}
                  onSelect={handleOptionSelect}
                  type="checkbox"
                />
              ))}
            </div>

            <div className="reg-field reg-d7" style={{ marginTop: 12 }}>
              <ButtonWrapper
                type="button"
                label={isSubmitting ? <LoadingDots /> : "Next"}
                isSubmitting={isSubmitting}
                disabled={isSubmitting || selectedOptions.length === 0}
                onClick={onSubmit}
                className="w-full rounded-[14px] bg-[#64748b] text-white text-sm font-semibold tracking-wide py-[14px] hover:bg-[#475569] transition-all hover:-translate-y-px shadow-[0_4px_20px_rgba(15,23,42,0.18)] hover:shadow-[0_8px_28px_rgba(15,23,42,0.22)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
