import { getCookie, setCookie, removeCookie } from "@/utils/auth";
import { useRouter } from "next/navigation";

export const loginMiddelware = (enpoint) => {
  const nav = useRouter();
  if (!getCookie("isLogin") && getCookie("user") && getCookie("email"))
    return nav.push(`/account/${enpoint ? "register" : "login"}`);
  else return nav.back();
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
