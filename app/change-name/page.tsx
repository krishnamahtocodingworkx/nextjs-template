"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/slices/auth/authSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

export default function ChangeNamePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userName = useSelector((state: RootState) => state.auth.name);
  const [inputName, setInputName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      dispatch(login(inputName.trim()));
      setInputName("");
      router.push("/");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Change Name</h1>
      <p className="mb-4 text-gray-600">
        Current name:{" "}
        <span className="font-semibold">{userName || "Not set"}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Enter new name:
          </label>
          <input
            id="name"
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Update Name
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
