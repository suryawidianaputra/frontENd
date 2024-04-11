"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Close from "@/assets/icons/close.svg";
import Menu from "@/assets/icons/menu.svg";
import "@/styles/navbar.css";

export default function Navbar() {
  const [icon, setIcon] = useState(Menu);
  const [count, setCount] = useState(false);
  const [translate, setTranslate] = useState(100);

  const handleChangeIcon = () => {
    setCount(!count);
    if (!count) {
      setIcon(Close);
      setTranslate(0);
    } else {
      setIcon(Menu);
      setTranslate(100);
    }
  };

  return (
    <div className="container-navbar flex w-full justify-between items-center fixed bg-primaryBlue">
      <div className="icons">
        <Image
          src={icon}
          alt="..."
          width={25}
          height={25}
          className="nav-icon"
          onClick={handleChangeIcon}
        />
      </div>
      <ul
        className="list-navbar flex w-full justify-center gap-4 bg-primaryBlue"
        style={{
          transform: `translateX(${translate}%)`,
        }}
      >
        <li>
          <Link href={`/`}>Home</Link>
        </li>
        <li>
          <Link href={`/anime`}>Anime</Link>
        </li>
        <li>
          <Link href={`/account`}>Account</Link>
        </li>
      </ul>
    </div>
  );
}
