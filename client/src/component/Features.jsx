export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            Powerful AI Tools
          </h2>
          <p className="text-gray-600 mt-4">
            Advanced image processing designed for speed, quality and simplicity.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              Watermark Removal
            </h3>
            <p className="text-gray-600 text-sm">
              Remove logos, watermarks and unwanted marks automatically.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              Background Removal
            </h3>
            <p className="text-gray-600 text-sm">
              Instantly remove backgrounds with clean edge detection.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              Object & Text Removal
            </h3>
            <p className="text-gray-600 text-sm">
              Erase unwanted text, objects or emojis naturally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
