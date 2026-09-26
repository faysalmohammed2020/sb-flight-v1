import { del, put } from "@vercel/blob";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { isImageFolder, isPrivateImage, type ImageFolder } from "@/lib/images";

const localPrefix = "local://";

export function usesLocalImageStorage() {
  return process.env.NODE_ENV === "development" && process.env.IMAGE_STORAGE !== "blob";
}

export function isLocalImageUrl(url: string) {
  return url.startsWith(localPrefix);
}

function localFilePath(pathname: string) {
  const parts = pathname.split("/");
  const filename = parts.pop();
  const folder = parts.join("/");
  if (!filename || !/^[a-z0-9][a-z0-9.-]*$/.test(filename) || !isImageFolder(folder)) {
    throw new Error("Invalid local image pathname.");
  }
  return path.join(process.cwd(), ".local-images", ...parts, filename);
}

export async function saveImage(file: File, folder: ImageFolder, pathname: string) {
  if (usesLocalImageStorage()) {
    const target = localFilePath(pathname);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, Buffer.from(await file.arrayBuffer()), { flag: "wx" });
    return { url: `${localPrefix}${pathname}`, pathname };
  }

  const privateImage = isPrivateImage(folder);
  const token = privateImage ? process.env.BLOB_PRIVATE_READ_WRITE_TOKEN : process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error(`Blob ${privateImage ? "private" : "public"} store is not configured.`);
  const blob = await put(pathname, file, {
    access: privateImage ? "private" : "public",
    contentType: file.type,
    token,
  });
  return { url: blob.url, pathname: blob.pathname };
}

export async function readLocalImage(url: string) {
  if (!usesLocalImageStorage() || !isLocalImageUrl(url)) {
    throw new Error("Local image storage is unavailable.");
  }
  return readFile(localFilePath(url.slice(localPrefix.length)));
}

export async function removeImage(url: string, folder: ImageFolder) {
  if (isLocalImageUrl(url)) {
    if (!usesLocalImageStorage()) throw new Error("Local image storage is unavailable.");
    await rm(localFilePath(url.slice(localPrefix.length)), { force: true });
    return;
  }
  const token = isPrivateImage(folder) ? process.env.BLOB_PRIVATE_READ_WRITE_TOKEN : process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("Blob store is not configured.");
  await del(url, { token });
}
