"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GetAnimeResponse } from "@/libs/api.js";
import Link from "next/link";
import useSwr from "swr";
import HandlePage from "./handlepage";
import "@/styles/card.css";

export default function Card({ Edit, Limit, Header, Res }) {
  const [anime, setAnime] = useState([]);
  const [page, setPage] = useState(1);

  const animeResponse = async () => {
    const anime = await GetAnimeResponse(
      Res ? "anime" : "top/anime",
      `${Limit && "limit=8"}&&page=${page}`
    );
    setAnime(anime.data);
  };
  useEffect(() => {
    animeResponse();
  }, [page]);

  return (
    <>
      <div style={{ height: "50px" }}></div>
      <h1 className="text-2xl text-center">{Header}</h1>
      <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 px-4">
        {anime.data?.map((el) => (
          <Link href={`/anime/${el.mal_id}`} key={el.mal_id}>
            <div className="card m-2 ">
              <div className="img overflow-hidden">
                <Image
                  src={el.images.webp.image_url}
                  width={200}
                  height={200}
                  alt=""
                  className="w-full object-cover hover:scale-105 transition-all"
                />
              </div>
              <p className="text-justify">{el.title}</p>
            </div>
          </Link>
        ))}
      </div>
      {Edit && <HandlePage Page={page} setPage={setPage} />}
    </>
  );
}
