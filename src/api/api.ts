import axios from "axios";
import type { Collection } from "../types/photos.ts";

axios.defaults.baseURL = `https://api.unsplash.com`;

export const fetchData = async (
  searchValue: string,
  currentPage: number
): Promise<Collection> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiInstance = axios.get("/search/photos", {
    params: {
      query: searchValue,
      page: currentPage,
      per_page: 12,
    },
    headers: {
      Authorization: `Client-ID ${apiKey}`,
    },
  });
  return apiInstance;
};
