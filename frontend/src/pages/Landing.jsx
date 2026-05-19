import { useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import StatsStrip from "@/components/landing/StatsStrip";
import EarnSection from "@/components/landing/EarnSection";
import CoursesSection from "@/components/landing/CoursesSection";
import WhySection from "@/components/landing/WhySection";
import PartnersStrip from "@/components/landing/PartnersStrip";
import AdmissionForm from "@/components/landing/AdmissionForm";
import Testimonials from "@/components/landing/Testimonials";
import FaqSection from "@/components/landing/FaqSection";
import CtaBand from "@/components/landing/CtaBand";
import Footer from "@/components/landing/Footer";
import StickyMobileCTA from "@/components/landing/StickyMobileCTA";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import AIAssistant from "@/components/landing/AIAssistant";
import EnquiryPopup from "@/components/landing/EnquiryPopup";

export default function Landing() {
  useEffect(() => {
    // Belt-and-suspenders: remove any runtime-injected emergent badge
    const remove = () => {
      document
        .querySelectorAll('a[id="emergent-badge"], a[href*="emergent.sh"][id*="badge"]')
        .forEach((el) => el.remove());
    };
    remove();
    const obs = new MutationObserver(remove);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return (
    <main data-testid="landing-page" className="bg-white text-slate-950 font-body pb-14 lg:pb-0">
      <Navbar />
      <Hero />
      <StatsStrip />
      <EarnSection />
      <CoursesSection />
      <WhySection />
      <PartnersStrip />
      <AdmissionForm />
      <Testimonials />
      <FaqSection />
      <CtaBand />
      <Footer />

      <StickyMobileCTA />
      <WhatsAppButton />
      <AIAssistant />
      <EnquiryPopup />
    </main>
  );
}
