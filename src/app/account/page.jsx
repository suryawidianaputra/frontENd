"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserIcon from "@/assets/icons/userW.svg";
import LogoutIcon from "@/assets/icons/logout.svg";
import { isNotlogin, removeLogin } from "@/utils/loginMiddelware";
import { getCookie } from "@/utils/auth";
import "@/styles/account.css";

export default function Account() {
  isNotlogin();
  const nav = useRouter();
  const handleLogout = () => {
    const confirm = prompt(
      "Apakah anda yakin ingin Logout? Ya untuk logout"
    ).toLowerCase();
    if (confirm === "ya" || confirm === "iya") {
      removeLogin();
      nav.push("/");
    }
  };

  const user = getCookie("user");
  return (
    <>
      <div className="head flex w-full items-center justify-center flex-col bg-primaryBlue">
        <Image
          src={UserIcon}
          alt="..."
          height={150}
          width={150}
          className="image-icon rounded-full"
        />
        <h1 className="p-2 md:text-2xl sm:text-xl text-white text-lg">
          {user ? user : "User"}
        </h1>
      </div>
      <div className="flex items-center">
        <Image
          src={LogoutIcon}
          alt="..."
          height={40}
          width={40}
          onClick={handleLogout}
        />
        <p onClick={handleLogout}>Logout</p>
      </div>
    </>
  );
}
