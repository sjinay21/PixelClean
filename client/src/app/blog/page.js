import Link from "next/link";
export default function BlogPage() {
  return (
    <section className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-bold mb-6">
          How Our Watermark Remover Works
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          In this article, we explain how our AI-powered watermark remover
          processes images and restores background details while maintaining
          visual quality.
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          What Type of Watermarks Can Be Removed?
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Our system is optimized to remove visible watermarks such as corner
          logos, text overlays, and semi-transparent branding marks. These are
          commonly placed at the bottom-right or across the image to protect
          ownership.
        </p>
        <p className="text-gray-700 mb-10 leading-relaxed">
          The AI analyzes the marked region and reconstructs the background
          using surrounding pixel information to generate a clean result.
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          How the AI Processing Works
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          When you upload an image, the system performs intelligent image
          processing using an inpainting technique. This technique allows the
          AI to detect unwanted elements and replace them with realistic
          background textures.
        </p>
        <ol className="list-decimal pl-6 text-gray-700 mb-10 space-y-2">
          <li>Image is uploaded securely to the server.</li>
          <li>The watermark region is identified.</li>
          <li>AI reconstructs the background using surrounding pixels.</li>
          <li>The cleaned image is generated and made available for download.</li>
        </ol>
        <h2 className="text-2xl font-semibold mb-4">
          Step-by-Step Usage
        </h2>
        <ol className="list-decimal pl-6 text-gray-700 mb-10 space-y-2">
          <li>Go to the Watermark Remover page.</li>
          <li>Upload your image file.</li>
          <li>Wait for the processing to complete.</li>
          <li>Download your cleaned image.</li>
        </ol>
        <h2 className="text-2xl font-semibold mb-4">
          Why Use an AI-Based Approach?
        </h2>
        <p className="text-gray-700 mb-10 leading-relaxed">
          Traditional editing tools require manual effort and precision. Our
          AI-based system automates this process, making watermark removal
          faster, simpler, and more accessible — even for users without design
          experience.
        </p>
        <div className="text-center mt-12">
          <Link
            href="/tools"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Try the Watermark Remover →
          </Link>
        </div>
      </div>
    </section>
  );
}
