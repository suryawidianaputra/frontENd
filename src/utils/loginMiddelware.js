import { getCookie, setCookie, removeCookie } from "@/utils/auth";
import { useRouter } from "next/navigation";

export const isLogin = () => {
  const nav = useRouter();
  if (getCookie("isLogin") && getCookie("user") && getCookie("email"))
    return nav.back();
  else return nav.push("/account/login");
};

export const isNotlogin = () => {
  const nav = useRouter();
  if (!(getCookie("isLogin") && getCookie("user") && getCookie("email")))
    return nav.push("/");
};

export const setLogin = (user, email) => {
  setCookie("isLogin", "true");
  setCookie("user", user);
  setCookie("email", email);
};

export const removeLogin = () => {
  removeCookie("isLogin");
  removeCookie("user");
  removeCookie("email");
};
