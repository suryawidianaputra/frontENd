"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ Color }) {
  const nav = useRouter();
  return (
    <div>
      <button
        onClick={() => nav.back()}
        className={`absolute top-0 left-0 ${
          Color ? "bg-white" : "bg-primaryBlue"
        }  ${
          Color ? null : "text-white"
        } m-3 px-2 py-2 rounded hover:text-red-500`}
      >
        Kembali
      </button>
    </div>
  );
}
