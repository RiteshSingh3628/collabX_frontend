"use client";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import ButtonWrapper from "@/components/Custom_UI/Button";
import LoadingDots from "@/components/Custom_UI/Button/LoadingDots";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import OptionCard from "@/components/common/OptionCard";
import { updateBrand } from "@/framework/server-action/brand/action";


export default function BusinessType() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { update: updateSession } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const OPTIONS = [
    { id: 1, value: "e-commerce", description: "Your business sells products online and delivers across the country." },
    { id: 2, value: "In Person Services", description: "Your business provides services to customers in a specific location. e.g Salons, Gyms, Restaurants, etc." },
    { id: 3, value: "software", description: "Your business provides software as a service to customers. e.g SaaS, Apps, etc." },
    { id: 4, value: "Marketplace", description: "Your business operates as a marketplace connecting buyers and sellers." },
    { id: 5, value: "Digital Services", description: "Your business provides digital services to customers. e.g Online classes, Content Creation, etc." },
    { id: 6, value: "other", description: "If not coverd in the above categories please select this option" },
  ]

  const onSubmit = async () => {
    setIsSubmitting(true);
    startTransition(async () => {
      const data = {
        brandType: selectedOption.value,
        currentStep: "3"
      }
      const response = await updateBrand(data);
      if (response?.success) {
        toast.success(response?.message);
        await updateSession({ currentStep: "3" });
        router.refresh();
      } else {
        toast.error(response?.message);
      }
      setIsSubmitting(false);
    });
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

  };

  return (
    <div className=" min-h-screen flex items-center bg-white justify-center ">
      <div className="relative w-full max-w-[520px]">
        <div className=" bg-white px-10 py-11">

          {/* header */}
          <div className="reg-field reg-d0" style={{ marginBottom: 32 }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>
              ONBOARDING
            </p>
            <h1 className="reg-serif" style={{ fontSize: "2rem", lineHeight: 1.2, color: "#0f172a", margin: 0 }}>
              Brand Type
            </h1>
            <p style={{ marginTop: 12, fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.65 }}>
              Which type of brand are you? Do you offer products, services, software, or something else? Online or inPerson?
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
                  key={option.value}
                  option={option}
                  isSelected={selectedOption?.id === option.id}
                  onSelect={handleOptionSelect}
                />
              ))}
            </div>

            <div className="reg-field reg-d7" style={{ marginTop: 6 }}>
              <ButtonWrapper
                type="submit"
                label={isPending ? <LoadingDots /> : "Next"}
                isSubmitting={isPending}
                disabled={isPending}
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

