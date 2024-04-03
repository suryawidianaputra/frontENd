import Image from "next/image";
import { GetAnimeResponse } from "@/libs/api.js";
import "@/styles/detailAnime.css";
import Input from "@/components/comment/input";
import Comment from "@/components/comment/comment.jsx";

export default async function AnimeDetail({ params: { id } }) {
  const anime = await GetAnimeResponse(`anime/${id}`);
  const data = anime.data.data;

  return (
    <>
      <div>
        <Image
          src={data.images.webp.image_url}
          width={200}
          height={200}
          alt=""
        />
        <h1>{anime.data.data.title}</h1>
        <p> Sinopsis: {data.synopsis}</p>
      </div>
      <Input Id={id} />
      <Comment Id={id} />
    </>
  );
}
