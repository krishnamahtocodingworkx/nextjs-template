import Button from "@/components/common/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Home Page</h1>
      <Button />
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Routing Examples</h2>
        <p className="text-sm text-gray-600 mb-4">
          Navigate to the change-name route to see examples of:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
          <li>page.tsx - Main route component</li>
          <li>layout.tsx - Persistent layout wrapper</li>
          <li>loading.tsx - Loading state UI</li>
          <li>error.tsx - Error boundary</li>
          <li>not-found.tsx - 404 handling</li>
          <li>template.tsx - Re-rendering wrapper</li>
        </ul>
        <Link
          href="/change-name"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Go to Change Name Route →
        </Link>
      </div>
    </div>
  );
}
