export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            How to Remove Watermarks
          </h2>
          <p className="mt-4 text-gray-600">
            Remove watermark from photos in 4 simple steps.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-lg">1. Upload Photo</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Upload your image with watermark or logo.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">2. AI Detection</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Our AI automatically detects watermark regions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">3. Clean & Refine</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Fine-tune results with advanced removal engine.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">4. Download</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Download your cleaned HD image.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-xl h-96"></div>
        </div>
      </div>
    </section>
  );
}
