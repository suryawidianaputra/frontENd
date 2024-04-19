"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GetAnimeResponse } from "@/libs/api.js";
import Link from "next/link";
import HandlePage from "./handlepage";
import "@/styles/card.css";
import Slider from "./slidder";

export default function Card({ Edit, Limit, Header, Res }) {
  const [anime, setAnime] = useState([]);
  const [page, setPage] = useState(1);
  const [slid, setSlid] = useState(false);
  // const [visiblePage, setVisiblePage] = useState(
  //   anime.pagination.last_visible_page
  // );
  setTimeout(() => {
    setSlid(true);
  }, 1000);

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
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 p-2">
        {Header}
      </h1>
      <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-6 px-4">
        {anime.data?.map((el) => (
          <Link
            href={`/anime/${el.mal_id}`}
            key={el.mal_id}
            className="block transform transition duration-500 hover:scale-105"
          >
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={el.images.webp.image_url}
                  layout="fill"
                  objectFit="cover"
                  alt={el.title}
                  priority={true}
                  className="hover:opacity-75 transition-opacity duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{el.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {anime.data && Edit && <HandlePage Page={page} setPage={setPage} />}
      {slid && <Slider Anime={anime} />}
    </>
  );
}
