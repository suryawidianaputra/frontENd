"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fontainer-navbar flex w-full justify-between fixed">
      {/* <div className="logo"></div> */}
      <ul className="list-navbar flex w-full justify-center gap-4">
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
