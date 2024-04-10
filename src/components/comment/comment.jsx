"use client";
import axios from "axios";
import Image from "next/image";
import User from "@/assets/icons/user.svg";
import swr, { useSWRConfig } from "swr";
import DeleteComment from "./deleteComment";
import { getCookie } from "@/utils/auth";
import "@/styles/comment.css";

export default function Comment({ Id }) {
  const { mutate } = useSWRConfig();
  const handleGetComment = async () => {
    const comment = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_END_URL}/comment/${Id}`
    );
    return comment.data;
  };
  const { data } = swr("comment", handleGetComment);

  return (
    <div>
      <h1 className="text-2xl p-2">Comment</h1>
      {data?.data.length === 0 ? (
        <h1>Tidak ada comment</h1>
      ) : (
        <div className="container-comment grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
          {data?.data.map((el, index) => (
            <div key={index} className="comment p-2 w-full break-words">
              <div className="flex items-center">
                <Image
                  src={User}
                  width={50}
                  height={50}
                  alt="..."
                  className="user-icon"
                />
                <h1 className="text-2xl font-bold px-2">{el.user}</h1>
                {el.email === getCookie("email") && (
                  <DeleteComment mutate={mutate} id={el.id} />
                )}
              </div>
              <br />
              <p>{el.comment}</p>{" "}
            </div>
          ))}
        </div>
      )}
      <h1></h1>
    </div>
  );
}
