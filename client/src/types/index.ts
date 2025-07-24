import { Eclipse } from "lucide-react";

export type StrapiResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  status: number;
};

export interface BaseParams {
  [key: string]: string | string[] | undefined;
}

export interface RouteParams extends BaseParams {
  slug?: string;
  id?: string;
  tag?: string;
  questionId?: string;
  url?: string;
}

export type Params = Promise<RouteParams>;
export type SearchParams = Promise<BaseParams>;

export type Tag = {
  documentId: string;
  label: string;
  value: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
};


export type UserProfile = {
  documentId: string;
  name: string;
  bio: string;
  reputation: number;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  image: {
    id: number;
    documentId: string;
    url: string;
    name: string;
    alternativeText: string;
  };
};

export type StrapiUserData = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  userProfile: {
    id: number,
    documentId: string,
  }
}

export type StrapiUserProfileData = {
  id: number;
  documentId: string;
  name: string;
  githubLink: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type Image = {
  id: number;
  documentId: string;
  url: string;
  name: string;
  alternativeText: string;
};

export type Category = {
  documentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  url: string;
  image: Image;
};

export type Item = {
  documentId: string;
  name: string;
  description: string;
  longDescription: string;
  featured: boolean;
  size: "S" | "M" | "L" | "XL" | "XXL";
  price: number;
  image: Image;
  category: Category;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};