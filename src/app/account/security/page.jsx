"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { getCookie } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { trimmedData } from "@/utils/trimmed";

export default function Security() {
  const nav = useRouter();
  const [newPass, setNewPass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const email = getCookie("email");
    const user = getCookie("user");
    const isLogin = getCookie("isLogin");
    if (email && user && isLogin) return setIsLoggedIn(true);
  }, []);
  // !isLoggedIn && nav.back();

  const handleChangePassword = async () => {
    if (trimmedData(newPass)) {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/user?email=${getCookie(
          "email"
        )}`,
        {
          passwod: newPass,
        }
      );
      console.log(response);
    }
  };

  return (
    <div>
      <input
        type=""
        placeholder="new Password"
        onChange={(e) => setNewPass(e.target.value)}
        value={newPass}
      />
      <button onClick={handleChangePassword}>Ganti</button>
    </div>
  );
}
