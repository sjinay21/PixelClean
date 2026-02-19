export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Simple & Transparent Pricing
        </h2>
        <p className="text-gray-600 mb-16">
          Choose the plan that fits your needs.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Free</h3>
            <p className="text-3xl font-bold mb-6">$0</p>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li>Limited uploads</li>
              <li>Basic AI removal</li>
              <li>Standard resolution</li>
            </ul>
            <button className="w-full bg-gray-900 text-white py-3 rounded-lg">
              Get Started
            </button>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-500">
            <h3 className="text-xl font-semibold mb-4">Pro</h3>
            <p className="text-3xl font-bold mb-6">$9/month</p>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li>Unlimited uploads</li>
              <li>Advanced AI engine</li>
              <li>HD downloads</li>
            </ul>
            <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">
              Upgrade Now
            </button>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Business</h3>
            <p className="text-3xl font-bold mb-6">Custom</p>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li>API access</li>
              <li>Priority support</li>
              <li>Bulk processing</li>
            </ul>
            <button className="w-full bg-gray-900 text-white py-3 rounded-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
