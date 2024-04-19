"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setLogin } from "@/utils/loginMiddelware";
import { validateEmail } from "@/utils/emailValidate";
import { useState } from "react";
import { getCookie } from "@/utils/auth";
import { trimmedData } from "@/utils/trimmed";

export default function Login() {
  const nav = useRouter();
  if (getCookie("isLogin") && getCookie("user") && getCookie("email"))
    return nav.back();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState({
    email: false,
    password: false,
  });

  const handleLogin = async () => {
    if (getCookie("isLogin") && getCookie("user") && getCookie("email"))
      return nav.back();
    let error = { email: false, password: false };
    if (!trimmedData(email) || !validateEmail(email)) error.email = true;
    if (!validateEmail(email)) error.email = true;
    if (!trimmedData(pass)) error.password = true;
    setErr(error);

    if (!(error.email && error.password)) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/user?email=${email}&&password=${pass}`
      );
      console.log(res);
      if (res.data.isLogin) {
        setLogin(res.data.data.user, email);
        setEmail("");
        setPass("");
        nav.push("/");
        return;
      }
      if (!res.data.isLogin) return (error.email = true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* username */}
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
              onChange={(e) => setEmail(e.target.value)}
            />
            {err.email && (
              <p className="text-red-500 text-xs italic">Gmail invalid.</p>
            )}
          </div>
          {/* password */}
          <div className="password mb-6 relative">
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
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {err.password && (
              <p className="text-red-500 text-xs italic">
                Password tidak boleh kosong.
              </p>
            )}
            <a href="/account/register" className="hover:underline text-xs p-0">
              create a account
            </a>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
