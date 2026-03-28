"use client";
import { IdentifyYourself, ContentType, PreferredCompanies, InterestedBrands, ConnectInstagram } from "@/components/Creator/CreatorSteps";

const STEP_CONFIG = {
    1: {
        title: "Identify Yourself",
        component: () => <IdentifyYourself />
    },
    2: {
        title: "Content Type",
        component: () => <ContentType />
    },
    3: {
        title: "Preferred Companies",
        component: () => <PreferredCompanies />
    },
    4: {
        title: "Interested Brands",
        component: () => <InterestedBrands />
    },
    5: {
        title: "Connect Instagram",
        component: () => <ConnectInstagram />
    }
};

export function Onboarding({ stepsCompleted }) {
    const Component = STEP_CONFIG[stepsCompleted]?.component;
    
    return (
        <>
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
          <div style={{ position: "absolute", top: "-10%", right: "-8%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)", opacity: 0.5 }} />
          <div style={{ position: "absolute", bottom: "-12%", left: "-8%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #fce7f3 0%, transparent 70%)", opacity: 0.45 }} />
        </div>
        {Component ? <Component /> : (
            <div className="min-h-screen flex items-center justify-center relative z-10">
                <p>Step configuration missing for step: {stepsCompleted}</p>
            </div>
        )}
        </>
    );
}
