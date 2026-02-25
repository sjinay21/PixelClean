import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
      <h1 className="text-xl font-bold text-orange-500">PixelClean</h1>
      <div className="flex gap-6 items-center">
        <Link href="/pricing">Pricing</Link>
        <Link href="/api">API</Link>
        <Link href="/tools">Watermark remover</Link>
        <Link href="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg">
          Login
        </Link>
        <Link href="/register" className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg">
          Register
        </Link>
      </div>
    </nav>
  );
}

