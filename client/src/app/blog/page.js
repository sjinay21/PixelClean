import Link from "next/link";

export default function BlogPage() {
  return (
    
    <section className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">
          PixelClean AI Tools – How Our Image Processing Platform Works
        </h1>

        <p className="text-gray-600 mb-10 text-lg">
          PixelClean provides a collection of AI-powered image processing tools
          designed to improve, restore, and enhance your images automatically.
          From removing watermarks to enhancing image quality, our platform
          uses intelligent algorithms to produce high-quality results with
          minimal effort.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-semibold mb-4">
          Tools Available on PixelClean
        </h2>

        <p className="text-gray-700 mb-6 leading-relaxed">
          PixelClean offers multiple AI tools that help users improve and edit
          images without requiring professional editing software. Each tool
          focuses on a specific task to make image processing faster and easier.
        </p>

        <ol className="list-decimal pl-6 text-gray-700 mb-10 space-y-2">
        <li><strong>Image Watermark Remover</strong>:-Removes visible watermark text or logos from images while preserving the original background.</li>
        <li><strong>PDF Watermark Remover</strong>:-Detects and removes watermark text or overlays from PDF documents.</li>
        <li><strong>Logo Watermark Remover</strong>:-Removes logo overlays from images and reconstructs the hidden background using AI processing.</li> 
        <li><strong>Image Enhancer</strong>:-Improves image clarity using sharpening, noise reduction, and resolution upscaling.</li>
        <li><strong>Background Remover</strong>:-Automatically removes image backgrounds to create clean transparent cut-outs.</li>
        <li><strong>Video Watermark Remover</strong>:-Detects watermark overlays in videos and removes them while maintaining visual quality.</li>
        </ol>

        {/* Section 2 */}
        <h2 className="text-2xl font-semibold mb-4">
          How Our AI Processing Works
        </h2>

        <p className="text-gray-700 mb-6 leading-relaxed">
          When you upload an image to PixelClean, the system processes the image
          using AI-based computer vision techniques. The algorithm analyzes
          patterns, textures, and surrounding pixels to intelligently modify
          the image depending on the selected tool.
        </p>

        <ol className="list-decimal pl-6 text-gray-700 mb-10 space-y-2">
          <li>Image is uploaded securely to the server.</li>
          <li>The AI analyzes image structure and visual elements.</li>
          <li>Selected tool logic is applied (enhancement, removal, or reconstruction).</li>
          <li>The processed image is generated and prepared for download.</li>
        </ol>

        {/* Section 3 */}
        <h2 className="text-2xl font-semibold mb-4">
          Step-by-Step Usage
        </h2>

        <ol className="list-decimal pl-6 text-gray-700 mb-10 space-y-2">
          <li>Open the PixelClean tools page.</li>
          <li>Select the tool you want to use.</li>
          <li>Upload your image file.</li>
          <li>Wait for the AI processing to complete.</li>
          <li>Download the processed image instantly.</li>
        </ol>

        {/* Section 4 */}
        <h2 className="text-2xl font-semibold mb-4">
          Why Use AI-Based Image Processing?
        </h2>

        <p className="text-gray-700 mb-10 leading-relaxed">
          Traditional editing software requires manual editing skills and
          significant time. AI-powered tools automate complex editing tasks,
          allowing anyone to improve their images quickly. PixelClean focuses
          on simplicity, speed, and accessibility so users can enhance images
          without technical knowledge or professional design tools.
        </p>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/tools"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Explore PixelClean Tools →
          </Link>
        </div>

      </div>
    </section>
  );
}
