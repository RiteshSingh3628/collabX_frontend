"use client";
import { toast } from "sonner";
import { useState } from "react";
import ButtonWrapper from "@/components/Custom_UI/Button";
import LoadingDots from "@/components/Custom_UI/Button/LoadingDots";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import OptionCard from "@/components/common/OptionCard";


export default function CompanyDetails() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const { update: updateSession } = useSession();
  const router = useRouter();

  const COMPANY_TYPE =[
    {
      id: 3, 
      value: "Medium Business",
      description:"Medium business blends growth, agility and customer focus."
    },
    {
      id: 4, 
      value: "Large Business",
      description:"Large business combines scale, stability, expertise and market leadership."
    },
    {
      id: 5, 
      value: "Enterprise",
      description:"Enterprise combines scale, stability, expertise and market leadership."
    },
    {
      id: 6, 
      value: "Government",
      description:"Government combines scale, stability, expertise and market leadership."
    },

  ]

  const COMPANY_SIZE  = [
    {
      id: 1,
      value: "1-10",
    },
    {
      id: 2,
      value: "10-1000",
    },
    {
      id: 3,
      value: "10000+",
    },
  ]

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    
  };

  const handleOptionSelect2 = (option) => {
    setSelectedOption2(option);
    
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
                  Company Details
                </h1>
                <p style={{ marginTop:12, fontSize:"0.85rem", color:"#94a3b8", lineHeight:1.65 }}>
                  We want to tailor the experience according to your company size.
                </p>
              </div>

              <form
                noValidate
                aria-label="Registration form"
                style={{ display:"flex", flexDirection:"column", gap:14 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {COMPANY_TYPE.map((option) => (
                    <OptionCard
                      key={option.id}
                      option={option}
                      isSelected={selectedOption?.id === option.id}
                      onSelect={handleOptionSelect}
                    />
                  ))}
                </div>

                <p style={{ marginTop:12, fontSize:"0.85rem", color:"#94a3b8", lineHeight:1.65 }}>
                  How many employees work at your company?
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {COMPANY_SIZE.map((option) => (
                    <OptionCard
                      key={option.id}
                      option={option}
                      isSelected={selectedOption2?.id === option.id}
                      onSelect={handleOptionSelect2}
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

