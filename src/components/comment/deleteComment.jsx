import axios from "axios";
import Image from "next/image";
import Trash from "@/assets/icons/trash.svg";

export default function DeleteComment({ mutate, id }) {
  const handleDeleteComment = async (id) => {
    const comment = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACK_END_URL}/comment/${id}`,
      {
        method: "DELETE",
      }
    );
    mutate("comment");
  };

  return (
    <Image
      src={Trash}
      width={25}
      height={25}
      alt="..."
      className="cursor-pointer mx-2"
      onClick={() => {
        handleDeleteComment(id);
      }}
    />
  );
}
