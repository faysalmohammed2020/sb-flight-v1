import { UserRole } from "@prisma/client";

export const imageFolders = [
  "customer/profile", "customer/gallery", "passport", "nid",
  "tour/hero", "tour/gallery", "package/hero", "package/gallery",
  "homepage/hero", "homepage/banner", "homepage/section",
  "blog/cover", "blog/gallery", "banner", "visa", "ticket", "others",
] as const;

export type ImageFolder = (typeof imageFolders)[number];

export function isImageFolder(value: string): value is ImageFolder {
  return imageFolders.includes(value as ImageFolder);
}

export function isPrivateImage(folder: ImageFolder) {
  return folder === "passport" || folder === "nid" || folder === "visa" || folder === "ticket";
}

export function canManageImages(role: UserRole | undefined) {
  return !!role && role !== UserRole.CUSTOMER;
}

export function canAccessPrivateImages(role: UserRole | undefined) {
  return role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN ||
    role === UserRole.MANAGER || role === UserRole.STAFF ||
    role === UserRole.OPERATIONS || role === UserRole.VISA_AGENT ||
    role === UserRole.TICKET_AGENT || role === UserRole.SUPPORT_AGENT;
}

export function imageSlug(name: string) {
  const base = name.replace(/\.[^.]+$/, "").normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "").slice(0, 70);
  return base || "image";
}
