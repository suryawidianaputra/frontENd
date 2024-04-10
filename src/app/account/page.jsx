"use client";
import { getCookie } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function Account() {
  const nav = useRouter();
  if (
    getCookie("isLogin") === "false" &&
    !(getCookie("user") && getCookie("email"))
  )
    return nav.push("/account/login");
  return (
    <div>
      <h1>account page</h1>
    </div>
  );
}
