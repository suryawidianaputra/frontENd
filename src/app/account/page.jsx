"use client";
import { isNotlogin } from "@/utils/loginMiddelware";

export default function Account() {
  isNotlogin();
  return (
    <div>
      <h1>account page</h1>
    </div>
  );
}
