"use client";

import { useEffect, useState } from "react";

export default function ChangeNameTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Trigger animation on mount/navigation
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-opacity duration-300 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
