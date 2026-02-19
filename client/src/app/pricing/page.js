"use client";
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-3xl font-bold text-center mb-10">Pricing Plans</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="border p-8 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Free Plan</h2>
          <p className="mb-4">Limited daily usage</p>
          <p className="text-2xl font-bold">$0</p>
        </div>
        <div className="border p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Pro Plan</h2>
          <p className="mb-4">Unlimited usage + API Access</p>
          <p className="text-2xl font-bold">$9/month</p>
        </div>
      </div>
    </div>
  );
}
