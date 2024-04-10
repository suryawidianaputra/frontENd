"use client";
import axios from "axios";
import { useState } from "react";
import { loginMiddelware, setLogin } from "@/utils/loginMiddelware";
import { validateEmail } from "@/utils/emailValidate";
import { trimmedData } from "@/utils/trimmed";
import { useRouter } from "next/navigation";

import { getCookie, setCookie, removeCookie } from "@/utils/auth";

export default function Register() {
  console.log(getCookie("isLogin" + getCookie("email") + getCookie("user")));
  const nav = useRouter();
  loginMiddelware("register");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    let error = { username: false, email: false, password: false };
    if (!trimmedData(username)) error.username = true;
    if (!trimmedData(email) || !validateEmail(email)) error.email = true;
    if (!trimmedData(password)) error.password = true;
    setErr(error);

    if (!(error.username && error.email && error.password)) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/user`,
        { user: username, email, password }
      );
      if (res.data.isLogin) {
        setLogin(username, email);
        setUsername("");
        setEmail("");
        setPassword("");
        nav.push("/");
        return;
      }
      if (!res.data.isLogin) return (error.email = true);
    } else return console.log("error");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Username */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {err.username && (
              <p className="text-red-500 text-xs italic">
                Username tidak boleh kosong.
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {err.email && (
              <p className="text-red-500 text-xs italic">
                Email tidak valid atau kosong.
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {err.password && (
              <p className="text-red-500 text-xs italic">
                Password tidak boleh kosong.
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
