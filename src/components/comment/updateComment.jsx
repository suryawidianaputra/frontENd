import axios from "axios";
import Image from "next/image";
import Pencil from "@/assets/icons/pencil.svg";

export default function UpdateComment({ mutate, id, msg }) {
  const handleUpdateComment = async () => {
    alert("akan update coy");
  };
  return (
    <Image
      src={Pencil}
      width={20}
      height={20}
      alt=""
      className="cursor-pointer"
      onClick={handleUpdateComment}
    />
  );
}
