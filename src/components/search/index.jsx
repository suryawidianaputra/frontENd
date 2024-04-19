"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function InputSearch() {
  const nav = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => nav.push(`/search/${searchTerm}`);

  return (
    <div className="flex items-center max-w-md mx-auto bg-white rounded-lg border border-gray-200 my-2">
      <input
        type="text"
        className="flex-grow p-4 rounded-l-lg focus:outline-none"
        placeholder="Cari..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
      >
        Cari
      </button>
    </div>
  );
}
