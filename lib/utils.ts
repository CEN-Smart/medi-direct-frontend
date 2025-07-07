import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
export const appSecret = process.env.NEXT_PUBLIC_APP_SECRET;

export const tokenKey = "token";

export const fileUploadKey = "files";

export const user = "user";
