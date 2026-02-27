import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyChoose from "@/components/WhyChoose";
import Footer from "@/components/Footer";
import FeatureHighlight from "@/components/FeatureHighlight";
import FAQ from "@/components/FAQ";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyChoose />
      <FeatureHighlight />
      <FAQ />
      <Footer />
    </>
  );
}

