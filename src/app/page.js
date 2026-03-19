import {Footer, Navbar} from "@/components/LandingPage";
import {Hero} from "@/components/LandingPage";
import {SocialProof} from "@/components/LandingPage";
import {AIMatching} from "@/components/LandingPage";
import {Analytics} from "@/components/LandingPage";
import {CTA} from "@/components/LandingPage";
import {Features} from "@/components/LandingPage";
import {HowItWorks} from "@/components/LandingPage";
import {Pricing} from "@/components/LandingPage";
import {Problem} from "@/components/LandingPage";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SocialProof />
      <Problem />
      <Features />
      <HowItWorks />
      <Analytics />
      <AIMatching />
      <Pricing />
      <CTA />
      <Footer />
    </>
  )
}
