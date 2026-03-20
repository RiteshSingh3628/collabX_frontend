"use client";
import { toast } from "sonner";
import { useState } from "react";
import ButtonWrapper from "@/components/Custom_UI/Button";
import LoadingDots from "@/components/Custom_UI/Button/LoadingDots";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import OptionCard from "@/components/common/OptionCard";


export default function IndustryType() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { update: updateSession } = useSession();
  const router = useRouter();

  const OPTIONS = [
    { id:1, value: "Hair"},
    { id:2, value: "Jwellary"},
    { id:3, value: "Software"},
    { id:4, value: "Makeup"},
    {id:5, value: "Outdoors"},
    { id:6, value: "Skincare" },
    { id:7, value: "Beauty & Care" },
    { id:8, value: "Fashion & Apparel" },
    { id:9, value: "Food & Beverage" },
    { id:10, value: "Health & Wellness" },
    { id:11, value: "Home & Lifestyle" },
    { id:12, value: "Travel & Hospitality" },
    { id:13, value: "Technology" },
    { id:14, value: "Education" },
    { id:15, value: "Finance" },
    { id:16, value: "Real Estate" },
    { id:17, value: "Automotive" },
    { id:18, value: "Sports & Fitness" },
    { id:19, value: "Entertainment" },
    { id:20, value: "Other" },
  ]

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      toast.success("Successfully added data");
      await updateSession({ currentStep: "4" });
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
    setSelectedOption(option);
    
  };

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
                  Industry Type
                </h1>
                <p style={{ marginTop:12, fontSize:"0.85rem", color:"#94a3b8", lineHeight:1.65 }}>
                  What industry does your brand belong to? This helps us connect you with the right influencers.
                </p>
              </div>

              <form
                noValidate
                aria-label="Registration form"
                style={{ display:"flex", flexDirection:"column", gap:14 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {OPTIONS.map((option) => (
                    <OptionCard
                      key={option.id}
                      option={option}
                      isSelected={selectedOption?.id === option.id}
                      onSelect={handleOptionSelect}
                    />
                  ))}
                </div>

                <div className="reg-field reg-d7" style={{ marginTop:6 }}>
                  <ButtonWrapper
                    type="submit"
                    label={isSubmitting ? <LoadingDots />  : "Next"}
                    isSubmitting={isSubmitting}
                    disabled={isSubmitting}
                    onClick={() => onSubmit()}
                    className="w-full rounded-[14px] bg-[#0f172a] text-white text-sm font-semibold tracking-wide py-[14px] hover:bg-[#1e293b] transition-all hover:-translate-y-px shadow-[0_4px_20px_rgba(15,23,42,0.18)] hover:shadow-[0_8px_28px_rgba(15,23,42,0.22)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 cursor-pointer"
                  />
                </div>

              </form>
            </div>
        </div>
      </div>
  );
}

