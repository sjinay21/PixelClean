import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChoose from "@/components/home/WhyChoose";
import Footer from "@/components/layout/Footer";
import FeatureHighlight from "@/components/home/FeatureHighlight";
import FAQ from "@/components/home/FAQ";
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

