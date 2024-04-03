"use client";
import axios from "axios";
import swr, { useSWRConfig } from "swr";

export default function Comment({ Id }) {
  const { mutate } = useSWRConfig();
  const email = localStorage.getItem("email");
  const handleGetComment = async () => {
    const comment = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_END_URL}/comment/${Id}`
    );
    return comment.data;
  };
  const { data } = swr("comment", handleGetComment);

  return (
    <div>
      <br />
      <br />
      <h1 className="text-2xl">Comment</h1>
      {data?.data.length === 0 ? (
        <h1>Tidak ada comment</h1>
      ) : (
        data?.data.map((el, index) => (
          <div key={index}>
            <h1 className="text-xl">{el.user}</h1>
            <p>{el.id}</p>
            <p>{el.comment}</p>
            {el.email === email && (
              <button
                className="bg-red-600 p-4 text-white"
                onClick={async () => {
                  const comment = await fetch(
                    `${process.env.NEXT_PUBLIC_BACK_END_URL}/comment/${el.id}`,
                    {
                      method: "DELETE",
                    }
                  );
                  mutate("comment");
                }}
              >
                Deelete
              </button>
            )}
          </div>
        ))
      )}
      <h1></h1>
    </div>
  );
}
