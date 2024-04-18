"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserIcon from "@/assets/icons/userW.svg";
import { isNotlogin, removeLogin } from "@/utils/loginMiddelware";
import { getCookie } from "@/utils/auth";
import React from "react";
import "@/styles/account.css";
import BackButton from "@/components/backButton/back";

export default function Account() {
  isNotlogin();
  const nav = useRouter();
  const handleLogout = () => {
    const confirm = window
      .prompt("Apakah anda yakin ingin Logout? Ya untuk logout")
      ?.toLowerCase();
    if (confirm === "ya" || confirm === "iya") {
      removeLogin();
      nav.push("/");
    }
  };

  const user = getCookie("user");
  return (
    <>
      <BackButton />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-xl mx-auto">
          <div className="bg-primaryBlue shadow rounded-lg p-6 flex flex-col items-center">
            <div className="mb-4">
              <Image
                src={UserIcon}
                alt="User Icon"
                height={150}
                width={150}
                className="rounded-full image-icon"
              />
            </div>
            <h1 className="text-2xl font-semibold text-white mb-4">
              {user ? user : "User"}
            </h1>
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
            <a href="/account/security">Ganti Password</a>
          </div>
        </div>
      </div>
    </>
  );
}
