"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

export default function PricingPage() {

  const plans = [
    {
      name: "Free",
      price: "₹0",
      desc: "Try PixelClean tools with limited usage",
      features: [
        "1 Image Watermark Removal",
        "1 PDF Watermark Removal",
        
        "1 Video Watermark Removal",
        "2 Logo Watermark Uses",
        "2 Background Removals",
        "2 Image Enhancements",
      ],
      button: "Start Free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹799",
      desc: "Best for creators and frequent users",
      features: [
        "5 Image Watermark Removals",
        "3 PDF Watermark Removals",
        "1 Video Watermark Removal",
        "Unlimited Logo Watermark",
        "Unlimited Background Removal",
        "Unlimited Image Enhancement",
      ],
      button: "Upgrade to Pro",
      highlight: true,
    },
    {
      name: "Premium",
      price: "₹999",
      desc: "Unlimited access to all PixelClean tools",
      features: [
        "Unlimited Image Watermark Removal",
        "Unlimited PDF Watermark Removal",
        "Unlimited Video Watermark Removal",
        "Unlimited Logo Watermark",
        "Unlimited Background Removal",
        "Unlimited Image Enhancement",
      ],
      button: "Upgrade to Premium",
      highlight: false,
    },
  ];

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 pt-28 pb-16 sm:pb-24 min-h-screen px-4 sm:px-6">

        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight">
            PixelClean Pricing
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 sm:mb-16">
            Choose a plan that fits your workflow. Upgrade anytime for more
            processing power and unlimited tools.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

            {plans.map((plan, index) => (

              <div
                key={index}
                className={`p-6 sm:p-10 rounded-2xl shadow-xl bg-white cursor-pointer
                transition-all duration-300 hover:shadow-2xl border-2 flex flex-col justify-between
                ${
                  plan.highlight
                    ? "border-orange-500 md:scale-105 hover:border-orange-500"
                    : "border-transparent hover:border-orange-500"
                }`}
              >

                  <h2 className="text-2xl font-bold mb-2">
                    {plan.name}
                  </h2>

                  <p className="text-gray-500 text-sm mb-6">
                    {plan.desc}
                  </p>

                  <div className="text-4xl font-bold mb-8">
                    {plan.price}
                  </div>

                  <ul className="space-y-3 text-gray-600 text-sm mb-10">

                    {plan.features.map((feature, i) => (
                      <li key={i}>
                        ✓ {feature}
                      </li>
                    ))}

                  </ul>

                  <Button
                    variant={plan.highlight ? "pricingHighlight" : "pricingDefault"}
                  >
                    {plan.button}
                  </Button>

                </div>

              ))}

            </div>

            <p className="text-sm text-gray-500 mt-12">
              Payments will be securely processed. Upgrade anytime to unlock more
              AI processing power.
            </p>

          </div>

        </section>

      <Footer />
    </>
  );
}
