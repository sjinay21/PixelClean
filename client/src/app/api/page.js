"use client";

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-6">API Access</h1>

      <p className="mb-4">
        Integrate PixelClean tools into your application using our REST API.
      </p>

      <div className="bg-white p-6 rounded-xl shadow">
        <pre className="bg-gray-100 p-4 rounded">
POST /api/watermark
Authorization: Bearer API KEY
        </pre>
      </div>
    </div>
  );
}
