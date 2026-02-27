export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold">PixelClean</h3>
          <p className="text-gray-400 mt-4 text-sm">
            AI-powered image editing tools built for creators.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Watermark Remover</li>
            <li>Background Remover</li>
            <li>Image Enhancer</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Seven Nodes</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>About</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} PixelClean. All rights reserved.
      </div>
    </footer>
  );
}
