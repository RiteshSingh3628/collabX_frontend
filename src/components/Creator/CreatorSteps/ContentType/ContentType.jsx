"use client";
import { toast } from "sonner";
import { useState } from "react";
import ButtonWrapper from "@/components/Custom_UI/Button";
import LoadingDots from "@/components/Custom_UI/Button/LoadingDots";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import OptionCard from "@/components/common/OptionCard";

export default function ContentType() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { update: updateSession } = useSession();
  const router = useRouter();

  const OPTIONS = [
    { id: 1, value: "Beauty & Care" },
    { id: 2, value: "Business & Finance" },
    { id: 3, value: "Fashion & Style" },
    { id: 4, value: "Sports & Fitness" },
    { id: 5, value: "Food & Drinks" },
    { id: 6, value: "Gaming" },
    { id: 7, value: "Hair" },
    { id: 8, value: "Health & Wellness" },
    { id: 9, value: "Home & Garden" },
    { id: 10, value: "Jewellery" },
    { id: 11, value: "Lifestyle" },
    { id: 12, value: "Makeup" },
    { id: 13, value: "Music" },
    { id: 14, value: "Other" },
    { id: 15, value: "Outdoors & Nature" },
    { id: 16, value: "Kids & Parenting" },
    { id: 17, value: "Pet" },
    { id: 18, value: "Photography" },
  ];

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      toast.success("Successfully added data");
      console.log("selected option", selectedOptions)
      await updateSession({ currentStep: "3" }); 
      router.refresh();
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionSelect = (option) => {
    if (selectedOptions.find(o => o.id === option.id)) {
      setSelectedOptions(selectedOptions.filter(o => o.id !== option.id));
    } else {
      if (selectedOptions.length < 3) {
        setSelectedOptions([...selectedOptions, option]);
      } else {
        toast.error("You can only select up to 3 options");
      }
    }
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
              What content do you create?
            </h1>
            <p style={{ marginTop: 12, fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.65 }}>
              Pick up to 3 that best describe your content.
            </p>
          </div>

          <form
            noValidate
            aria-label="Registration form"
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
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

            <div className="reg-field reg-d7" style={{ marginTop: 6 }}>
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
