"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import swr, { useSWRConfig } from "swr";
import { getCookie } from "@/utils/auth";
import { trimmedData } from "@/utils/trimmed";

export default function Input({ Id }) {
  const { mutate } = useSWRConfig();
  const [msg, setMsg] = useState("");
  const nav = useRouter();

  const hanlePostostData = async () => {
    if (getCookie("isLogin") && getCookie("user") && getCookie("email")) {
      if (trimmedData(msg)) {
        const postData = await axios.post(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}/comment`,
          {
            mal_id: Id,
            user: getCookie("user"),
            email: getCookie("email"),
            comment: msg,
          }
        );
        setMsg("");
        mutate("comment");
      } else {
        alert("masukan comment");
      }
    } else {
      return nav.push(`/account/login`);
    }
  };
  return (
    <>
      <div className="flex">
        <textarea
          name=""
          style={{ resize: "none", border: "2px solid black" }}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          id="inputComment"
        ></textarea>
        <button
          style={{ border: "2px solid black" }}
          onClick={hanlePostostData}
        >
          Submit
        </button>
      </div>
    </>
  );
}
