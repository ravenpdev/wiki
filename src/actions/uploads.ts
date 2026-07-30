"use server";

import { put } from "@vercel/blob";
import { auth } from "@clerk/nextjs/server";

export type UploadedFile = {
  url: string;
  size: number;
  type: string;
  filename?: string;
};

export async function uploadFile(formData: FormData): Promise<UploadedFile> {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  // Basic validation constants
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const ALLOWED = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const files = formData.getAll("files").filter(Boolean) as File[];
  const file = files[0];

  if (!file) {
    throw new Error("No file provided");
  }

  if (!ALLOWED.includes(file.type)) {
    throw new Error("Invalid file type");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File too large");
  }

  try {
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return {
      url: blob.url,
      size: file.size,
      type: file.type,
      filename: blob.pathname ?? file.name,
    };
  } catch (e) {
    console.error("Vercel Blobl upload error", e);
    throw new Error("Upload fail");
  }

  // return {
  //   url: "/uploads/mock-image.jpg",
  //   size: file.size,
  //   type: file.type,
  //   filename: file.name,
  // };
}
