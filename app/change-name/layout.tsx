export default function ChangeNameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <h1 className="text-lg font-semibold">Change Name Section</h1>
          <p className="text-sm text-gray-500">
            This header persists across navigation within this route
          </p>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
