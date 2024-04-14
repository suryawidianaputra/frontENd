"use client";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { GetAnimeResponse } from "@/libs/api";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "@/libs/slider";

export default function Sliders({ Anime }) {
  const [anime, setAnime] = useState([]);
  const getAnime = async () => {
    const response = await GetAnimeResponse(
      "anime",
      `page=${Math.floor(Math.random() * 100)}`
    );
    return setAnime(response.data.data);
  };

  useEffect(() => {
    setTimeout(() => {
      getAnime();
    }, 500);
  }, []);
  return (
    <>
      {anime && (
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Anime
        </h1>
      )}
      <Slider {...settings}>
        {anime.map((el) => (
          <div key={el.mal_id} className="px-2">
            <Link href={`/anime/${el.mal_id}`}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={el.images.webp.image_url}
                    layout="fill"
                    objectFit="cover"
                    alt={el.title}
                    priority={true}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{el.title}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
}
