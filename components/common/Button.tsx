"use client";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Button = () => {
  const userName = useSelector((state: RootState) => state.auth.name);
  const router = useRouter();

  return (
    <div>
      <div>Name : {userName}</div>
      <button onClick={() => router.push("/change-name")}>Change name</button>
    </div>
  );
};

export default Button;
