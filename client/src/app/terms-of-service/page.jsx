import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 pt-28 pb-16 sm:pb-20 px-4 sm:px-6 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight">
            Terms of Service
          </h1>

          <p className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed">
            Please read these Terms of Service carefully before accessing or using the
            PixelClean platform, website, and associated AI processing tools.
          </p>

          <section className="space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                1. Acceptance of Terms
              </h2>
              <p>
                By creating an account or accessing any tool provided on PixelClean, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you are prohibited from using or accessing our tools.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                2. User Account and Responsibilities
              </h2>
              <p className="mb-2">
                To access and use PixelClean tools, you must register for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate, current, and complete registration information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Promptly notify us of any suspected unauthorized access to your account</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                3. Permitted and Prohibited Uses
              </h2>
              <p className="mb-2">
                You agree to use PixelClean only for lawful purposes. You must not:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Upload files that infringe on any third party’s intellectual property, copyright, or trademark rights without authorization</li>
                <li>Upload or process abusive, harmful, or unlawful content</li>
                <li>Attempt to reverse-engineer, disrupt, or overload our servers or networks</li>
                <li>Use automated scripts or bots to bypass credit limitations or fair use rules</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                4. Intellectual Property
              </h2>
              <p>
                PixelClean does not claim ownership over the images or media files you upload. You retain all existing rights and licenses to your content. PixelClean software, branding, logos, and user interface designs remain the exclusive property of PixelClean.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                5. Fair Usage and Availability
              </h2>
              <p>
                We strive to keep all tools operational 24/7. However, tool availability, processing times, and server capacity may vary depending on network traffic, maintenance schedules, or technical updates. PixelClean reserves the right to adjust credit allocations or limits in accordance with your plan.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                6. Changes to Terms
              </h2>
              <p>
                PixelClean reserves the right to modify or replace these terms at any time. Any changes will become effective immediately upon posting. Your continued use of the platform after updates indicates your agreement to the revised terms.
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
