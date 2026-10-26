"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 pt-28 pb-16 sm:pb-20 px-4 sm:px-6 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed">
            Welcome to PixelClean. We value your privacy and are committed to protecting
            the personal information and digital assets you share with us while using our
            image editing tools and services.
          </p>

          <section className="space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                1. Information We Collect
              </h2>
              <p className="mb-2">
                When you create an account or interact with PixelClean, we may collect basic account details including:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your name and chosen username</li>
                <li>Email address and mobile contact number</li>
                <li>Account credentials and session tokens</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                2. Uploaded Media and Image Processing
              </h2>
              <p>
                Files uploaded to PixelClean—including images, logos, and documents—are uploaded exclusively for the purpose of executing the requested AI tool (such as watermark removal, background removal, or image enhancement). Uploaded files are processed in automated environments and are not shared with unauthorized third parties or used for public training.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                3. How We Use Information
              </h2>
              <p className="mb-2">
                The information collected is used solely to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide, operate, and maintain PixelClean services</li>
                <li>Authenticate your identity and manage tool usage credits</li>
                <li>Prevent unauthorized automated access or abuse of the platform</li>
                <li>Communicate critical account updates or notifications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                4. Data Protection and Security
              </h2>
              <p>
                We implement industry-standard administrative and technical security measures to safeguard data against unauthorized access, disclosure, alteration, or destruction. Encrypted network connections (HTTPS/TLS) are utilized during all file uploads and downloads.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                5. Cookies and Local Storage
              </h2>
              <p>
                PixelClean uses local storage and cookies strictly to manage user authentication sessions and preserve your preferences across visits.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                6. Updates to This Policy
              </h2>
              <p>
                We may periodically update this Privacy Policy to reflect improvements in our platform or changes in applicable practices. Continued use of PixelClean signifies acceptance of any updated policy terms.
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
