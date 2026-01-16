import Link from "next/link";

export default function ChangeNameNotFound() {
  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">
        Change Name Resource Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        The resource you&apos;re looking for in the change name section
        doesn&apos;t exist.
      </p>
      <div className="flex gap-2 justify-center">
        <Link
          href="/change-name"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Go to Change Name
        </Link>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
