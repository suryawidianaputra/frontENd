import Image from "next/image";
import { GetAnimeResponse } from "@/libs/api.js";
import "@/styles/detailAnime.css"; // Pastikan untuk mengganti atau menghapus jika tidak diperlukanment/input";
import Comment from "@/components/comment/comment.jsx";
import BackButton from "@/components/backButton/back";
import Input from "@/components/comment/input";

export default async function AnimeDetail({ params: { id } }) {
  const anime = await GetAnimeResponse(`anime/${id}`);
  const data = anime.data.data;

  return (
    <>
      <BackButton Color={true} />
      <div className="bg-primaryBlue min-h-screen p-5">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-center md:flex-row flex-col items-center">
            <div className="w-full md:w-1/3">
              <Image
                src={data.images.webp.image_url}
                width={200}
                height={200}
                alt={data.title}
                className="object-cover p-3"
              />
            </div>
            <div className="w-full md:w-2/3 p-4">
              <h1 className="text-gray-900 font-bold text-2xl">{data.title}</h1>
              <p className="mt-2 text-gray-600">{data.synopsis}</p>
              <div className="flex justify-between mt-3 item-center">
                <h2 className="text-gray-700 font-bold text-xl">Detail</h2>
                <div>
                  <p className="text-gray-600">
                    <strong>Episodes:</strong> {data.episodes}
                  </p>
                  <p className="text-gray-600">
                    <strong>Score:</strong> {data.score}
                  </p>
                  <p className="text-gray-600">
                    <strong>Rating:</strong> {data.rating}
                  </p>
                  <p className="text-gray-600">
                    <strong>Rank:</strong> {data.rank}
                  </p>
                  <p className="text-gray-600">
                    <strong>Tahun:</strong> {data.year}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 mt-2 bg-gray-50">
            <h2 className="text-gray-900 font-bold text-xl">Comments</h2>
            <Input Id={id} />
            <Comment Id={id} />
          </div>
        </div>
      </div>
    </>
  );
}
