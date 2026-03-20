"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { brandRegisterSchema } from "@/validations/BrandRegisterSchema";
import { DEFAULT_VALUES } from "@/validations/BrandRegisterSchema";

import TextInput from "@/components/Custom_UI/TextInput";
import ButtonWrapper from "@/components/Custom_UI/Button";
import { SelectInput, TextareaInput } from "@/components/Custom_UI";
import LoadingDots from "@/components/Custom_UI/Button/LoadingDots";


export default function BusinessType() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);


  const OPTIONS = [
    { value: "e-commerce", description: "Your business sells products online and delivers across the country." },
    { value: "In Person Services", description: "Your business provides services to customers in a specific location. e.g Salons, Gyms, Restaurants, etc." },
    { value: "software", description: "Your business provides software as a service to customers. e.g SaaS, Apps, etc." },
    { value: "Marketplace", description: "Your business operates as a marketplace connecting buyers and sellers." },
    {value: "Digital Services", description: "Your business provides digital services to customers. e.g Online classes, Content Creation, etc."},
    { value: "other", description: "If not coverd in the above categories please select this option" },
  ]

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
                  Brand Type
                </h1>
                <p style={{ marginTop:12, fontSize:"0.85rem", color:"#94a3b8", lineHeight:1.65 }}>
                  Which type of brand are you? Do you offer products, services, software, or something else? Online or inPerson?
                </p>
              </div>

              <form
                noValidate
                aria-label="Registration form"
                style={{ display:"flex", flexDirection:"column", gap:14 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {OPTIONS.map((option)=>{
                    return (
                    <div key={option.value} onClick={() => handleOptionSelect(option)} className={`border border-slate-300 hover:border-black rounded-lg p-4 cursor-pointer ${selectedOption?.value === option.value ? "bg-black text-white" : ""}`}>
                        <h1 className="text-lg font-semibold">{option.value}</h1>
                        <p className={`text-sm ${selectedOption?.value === option.value ? "text-white" : "text-gray-500"}`}>{option.description}</p>
                    </div>
                    )
                  })}
                </div>

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

