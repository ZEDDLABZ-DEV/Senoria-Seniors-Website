import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import VisionSection from "@/components/VisionSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import KeyBenefitsSection from "@/components/KeyBenefitsSection";
import ImpactSection from "@/components/ImpactSection";
import FutureSection from "@/components/FutureSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <VisionSection />
        <ServicesSection />
        <HowItWorksSection />
        <KeyBenefitsSection />
        <ImpactSection />
        <FutureSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
