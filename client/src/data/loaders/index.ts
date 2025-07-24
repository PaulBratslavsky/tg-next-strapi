import qs from "qs";

import { getStrapiURL } from "@/lib/utils";
import { StrapiResponse, Category, Item } from "@/types";

import { fetchData } from "../fetch-data";

const baseUrl = getStrapiURL();

export async function getAllCategories(
  currentPage: number = 1
): Promise<StrapiResponse<Category[]>> {
  const PAGE_SIZE = 3;

  const query = qs.stringify({
    sort: ["createdAt:desc"],
    populate: {
      image: {
        fields: ["url", "name", "alternativeText"],
      },
    },
    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },
  });
  const url = new URL("/api/categories", baseUrl);
  url.search = query;
  return fetchData(url.href);
}

export async function   getAllItems(
  currentPage: number = 1,
  query: string = "",
  category: string = ""
): Promise<StrapiResponse<Item[]>> {
  const PAGE_SIZE = 3;

  const queryString = qs.stringify({
    sort: ["createdAt:desc"],
    filters: {
      name: { $containsi: query },
      ...(category && { category: { url: { $eq: category } } }),
    },
    populate: {
      image: {
        fields: ["url", "name", "alternativeText"],
      },
      category: {
        fields: ["name", "url"],
        populate: {
          image: {
            fields: ["url", "name", "alternativeText"],
          },
        },
      },
    },
    fields: ["name", "description", "longDescription", "featured", "size", "price", "createdAt", "updatedAt", "publishedAt"],
    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },
  });
  const url = new URL("/api/items", baseUrl);
  url.search = queryString || "";
  return fetchData(url.href);
}