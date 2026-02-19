export default function TrustSection() {
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
}
