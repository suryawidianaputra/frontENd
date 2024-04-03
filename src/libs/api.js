import axios from "axios";

export const GetAnimeResponse = async (resources, query) => {
  const response = axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}${resources}?${query}`
  );
  return response;
};
