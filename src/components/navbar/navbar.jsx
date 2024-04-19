"use client";
import Link from "next/link";
import Image from "next/image";
import $ from "jquery";
import menu from "@/assets/icons/menu.svg";
import close from "@/assets/icons/close.svg";
import { getCookie } from "@/utils/auth";
import "@/styles/navbar.css";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Open = () =>
    $(".container-navbar").css({ transform: "translateX(0%)" });
  const Close = () =>
    $(".container-navbar").css({ transform: "translateX(-100%)" });

  useEffect(() => {
    const email = getCookie("email");
    const user = getCookie("user");
    const isLogin = getCookie("isLogin");
    if (email && user && isLogin) {
      setIsLoggedIn(true);
    }
  }, []);

  const Login = () => {
    isLoggedIn && (
      <li>
        <Link href="/account/login">
          <p>Login</p>
        </Link>
      </li>
    );
  };

  return (
    <>
      <div className="nav w-full bg-red-500">
        <Image
          src={menu}
          width={30}
          height={30}
          alt={``}
          className="fixed cursor-pointer left-2 top-2"
          onClick={Open}
          style={{ zIndex: 999 }}
        />
      </div>
      <div
        className="container-navbar fixed bg-primaryBlue"
        style={{ zIndex: 999 }}
      >
        <div className="items-center flex justify-center p-2">
          <Image
            src={close}
            width={30}
            height={30}
            alt={``}
            className="absolute left-2 cursor-pointer"
            onClick={Close}
          />
          <h1 className="text-center md:text-lg sm:text-sm">Anime</h1>
        </div>
        <ul className="h-screen flex flex-col items-center justify-evenly">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/anime">Anime</a>
          </li>
          <li>
            <a href="/search">Search</a>
          </li>
          {isLoggedIn ? (
            <li>
              <a href="/account">{"Account"}</a>
            </li>
          ) : (
            <li>
              <a href="/account/login">Login</a>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
