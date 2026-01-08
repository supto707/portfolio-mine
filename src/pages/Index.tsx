import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import FloatingDock from "@/components/FloatingDock";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkSection from "@/components/sections/WorkSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import AwardsSection from "@/components/sections/AwardsSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";
import useLenis from "@/hooks/useLenis";

const Index = () => {
  useLenis();

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden grain">
      <GrainOverlay />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <SkillsSection />
        <AwardsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
        <FooterSection />
      </main>

      <FloatingDock />
    </div>
  );
};

export default Index;
