"use client";
import axios from "axios";
import { useState } from "react";
import swr, { useSWRConfig } from "swr";

export default function Input({ Id }) {
  const { mutate } = useSWRConfig();
  const [msg, setMsg] = useState("");
  const user = localStorage.getItem("user");
  const email = localStorage.getItem("email");
  const isLogin = localStorage.getItem("il");
  const id = Id;

  const hanlePostostData = async () => {
    if (msg.length !== "") {
      const postData = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/comment`,
        {
          mal_id: id,
          user: user,
          email: email,
          comment: msg,
        }
      );
      setMsg("");
      mutate("comment");
    } else {
      alert("masukan comment");
    }
  };

  localStorage.setItem("il", "true");
  localStorage.setItem("user", "Widiana");
  localStorage.setItem("email", "widiana@gmail.com");

  return (
    <>
      <div>
        {isLogin === "true" && (
          <>
            <textarea
              name=""
              style={{ resize: "none", border: "2px solid black" }}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            ></textarea>
            <button
              style={{ border: "2px solid black" }}
              onClick={hanlePostostData}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </>
  );
}
