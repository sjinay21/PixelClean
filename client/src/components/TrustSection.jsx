/*export default function TrustSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm uppercase tracking-wide text-gray-500">
          Trusted by creators worldwide
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold">50K+</h3>
            <p className="text-gray-500 text-sm mt-2">Images Processed</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">99%</h3>
            <p className="text-gray-500 text-sm mt-2">Accuracy</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">10s</h3>
            <p className="text-gray-500 text-sm mt-2">Avg. Processing Time</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">24/7</h3>
            <p className="text-gray-500 text-sm mt-2">Secure & Reliable</p>
          </div>
        </div>
      </div>
    </section>
  );
}*/
"use client";
import CountUp from "react-countup";

export default function TrustSection() {
  return (
    <section className="py-20 bg-gray-50 text-center">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-4xl font-bold">
            <CountUp end={50000} duration={3} />+
          </h3>
          <p className="text-gray-600 mt-2">Images Processed</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">
            <CountUp end={99} duration={3} />%
          </h3>
          <p className="text-gray-600 mt-2">Accuracy</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">
            <CountUp end={10} duration={3} />s
          </h3>
          <p className="text-gray-600 mt-2">Avg Processing</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">24/7</h3>
          <p className="text-gray-600 mt-2">Secure System</p>
        </div>
      </div>
    </section>
  );
}
