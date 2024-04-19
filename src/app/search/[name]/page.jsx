"use client";
import { useState, useEffect } from "react";
import { GetAnimeResponse } from "@/libs/api";
import Link from "next/link";
import Image from "next/image";
import HandlePage from "@/components/card/handlepage";
import InputSearch from "@/components/search";

export default function Search({ params }) {
  const decodedUrl = decodeURIComponent(params.name);
  const [anime, setAnime] = useState([]);
  const [visiblePage, setVisiblePage] = useState();
  const [page, setPage] = useState(1);
  const animeResponse = async () => {
    const anime = await GetAnimeResponse(
      "anime",
      `q=${decodedUrl}&&page=${page}`
    );
    setAnime(anime.data);
    setVisiblePage(anime.data.pagination.last_visible_page);
    return;
  };
  console.log(visiblePage);
  useEffect(() => {
    animeResponse();
  }, [page]);
  return (
    <>
      <InputSearch />
      {anime.data ? (
        <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-6 px-4 my-2">
          {anime.data?.map((el, i) => (
            <Link
              href={`/anime/${el.mal_id}`}
              key={i}
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
      ) : (
        <div className="flex w-full h-screen justify-center items-center">
          <h1 className="text-3xl text-purple">Loading...</h1>
        </div>
      )}
      {visiblePage > 1 && (
        <HandlePage Page={page} setPage={setPage} visiblePage={visiblePage} />
      )}
    </>
  );
}
