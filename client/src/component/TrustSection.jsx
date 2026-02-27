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
