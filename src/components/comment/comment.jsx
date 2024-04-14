"use client";
import axios from "axios";
import Image from "next/image";
import User from "@/assets/icons/user.svg";
import useSWR, { useSWRConfig } from "swr";
import DeleteComment from "./deleteComment";
import { getCookie } from "@/utils/auth";

export default function Comment({ Id }) {
  const { mutate } = useSWRConfig();
  const handleGetComment = async () => {
    const comment = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_END_URL}/comment/${Id}`
    );
    return comment.data;
  };
  const { data } = useSWR("comment", handleGetComment);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Komentar</h1>
      {data?.data.length === 0 ? (
        <p className="text-gray-600">Tidak ada komentar.</p>
      ) : (
        <div className="space-y-4">
          {data?.data.map((el, index) => (
            <div key={index} className="flex gap-4">
              <Image
                src={User}
                width={50}
                height={50}
                alt="User icon"
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-md font-semibold text-gray-900">
                    {el.user}
                  </h2>
                  {el.email === getCookie("email") && (
                    <DeleteComment mutate={mutate} id={el.id} />
                  )}
                </div>
                <p className="text-gray-600 mt-1">{el.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
