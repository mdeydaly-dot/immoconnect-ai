import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import UserTypesSection from "@/components/landing/UserTypesSection";
import AISection from "@/components/landing/AISection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <UserTypesSection />
        <AISection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
