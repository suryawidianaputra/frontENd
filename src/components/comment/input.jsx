"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { getCookie } from "@/utils/auth";
import { trimmedData } from "@/utils/trimmed";

export default function Input({ Id }) {
  const { mutate } = useSWRConfig();
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handlePostData = async () => {
    if (getCookie("isLogin") && getCookie("user") && getCookie("email")) {
      if (trimmedData(msg)) {
        await axios.post(`${process.env.NEXT_PUBLIC_BACK_END_URL}/comment`, {
          mal_id: Id,
          user: getCookie("user"),
          email: getCookie("email"),
          comment: msg,
        });
        setMsg("");
        mutate("comment");
      } else {
        alert("Masukkan komentar");
      }
    } else {
      router.push(`/account/login`);
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-lg">
      <textarea
        className="form-textarea mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 resize-none"
        rows="3"
        placeholder="Tulis komentar anda..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        id="inputComment"
      ></textarea>
      <button
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handlePostData}
      >
        Submit
      </button>
    </div>
  );
}
