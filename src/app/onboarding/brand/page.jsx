import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth"; 
import { Onboarding } from "@/components/Brand/Onboarding/Onboarding";

export default async function BrandOnboardingPage() {
    const session = await getServerSession(authOptions);
    const stepsCompleted = session?.user?.currentStep;

    return (
        <Onboarding stepsCompleted={stepsCompleted}/>
    )

}