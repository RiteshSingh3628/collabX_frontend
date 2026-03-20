import { BasicInfo, BusinessType } from "@/components/Brand/BrandSteps"

const STEP_CONFIG = {
    1: {
        title: "Basic Information",
        component: ()=><BasicInfo/>
    },
    2:{
        title: "Business Type",
        component: ()=><BusinessType/>
    }
}

export function Onboarding({stepsCompleted}){
    return (
        <>
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
          <div style={{ position:"absolute", top:"-10%", right:"-8%", width:440, height:440, borderRadius:"50%", background:"radial-gradient(circle, #dbeafe 0%, transparent 70%)", opacity:0.5 }} />
          <div style={{ position:"absolute", bottom:"-12%", left:"-8%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, #fce7f3 0%, transparent 70%)", opacity:0.45 }} />
        </div>
        {STEP_CONFIG[stepsCompleted].component()}
        </>
    )
}