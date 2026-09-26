import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { removeImage, saveImage, usesLocalImageStorage } from "@/lib/image-storage";
import { canAccessPrivateImages, canManageImages, imageSlug, isImageFolder, isPrivateImage } from "@/lib/images";

export const runtime = "nodejs";

const formats: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function matchesImageSignature(bytes: Uint8Array, mime: string) {
  if (mime === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (mime === "image/png") return [137, 80, 78, 71, 13, 10, 26, 10].every((n, i) => bytes[i] === n);
  if (mime === "image/webp") return String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  return false;
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Authentication required." }, { status: 401 });
  if (!canManageImages(session.user.role)) return Response.json({ error: "Forbidden." }, { status: 403 });

  const form = await request.formData();
  const file = form.get("file");
  const folder = form.get("folder");
  if (typeof folder !== "string" || !isImageFolder(folder) || !(file instanceof File)) {
    return Response.json({ error: "Invalid image or folder." }, { status: 400 });
  }
  if (!formats[file.type] || file.size === 0 || file.size > 4 * 1024 * 1024 ||
      !matchesImageSignature(new Uint8Array(await file.slice(0, 12).arrayBuffer()), file.type)) {
    return Response.json({ error: "Choose a JPEG, PNG, or WebP image up to 4 MB." }, { status: 400 });
  }

  const privateImage = isPrivateImage(folder);
  if (privateImage && !canAccessPrivateImages(session.user.role)) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }
  const token = privateImage ? process.env.BLOB_PRIVATE_READ_WRITE_TOKEN : process.env.BLOB_READ_WRITE_TOKEN;
  if (!usesLocalImageStorage() && !token) {
    return Response.json({ error: `Blob ${privateImage ? "private" : "public"} store is not configured.` }, { status: 503 });
  }

  const pathname = `${folder}/${imageSlug(file.name)}-${crypto.randomUUID().slice(0, 8)}.${formats[file.type]}`;
  try {
    const stored = await saveImage(file, folder, pathname);
    try {
      const image = await prisma.image.create({
        data: {
          url: stored.url, pathname: stored.pathname,
          filename: stored.pathname.split("/").at(-1)!,
          originalName: file.name, mimeType: file.type,
          size: file.size, folder, uploadedById: session.user.id,
        },
        select: { id: true, folder: true, originalName: true },
      });
      return Response.json({ image }, { status: 201 });
    } catch (error) {
      await removeImage(stored.url, folder).catch(console.error);
      throw error;
    }
  } catch (error) {
    console.error("IMAGE_UPLOAD_ERROR:", error);
    return Response.json({ error: "Image upload failed. Please try again." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Authentication required." }, { status: 401 });
  if (!canManageImages(session.user.role)) return Response.json({ error: "Forbidden." }, { status: 403 });
  let id: unknown;
  try { ({ id } = await request.json()); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  if (typeof id !== "string") return Response.json({ error: "Invalid image ID." }, { status: 400 });
  const image = await prisma.image.findFirst({
    where: { id, uploadedById: session.user.id, entityType: null, entityId: null },
  });
  if (!image || !isImageFolder(image.folder)) return Response.json({ error: "Image not found." }, { status: 404 });
  try {
    const removed = await prisma.image.deleteMany({
      where: { id: image.id, uploadedById: session.user.id, entityType: null, entityId: null },
    });
    if (removed.count !== 1) return Response.json({ error: "Image is already in use." }, { status: 409 });
    try { await removeImage(image.url, image.folder); }
    catch (error) { console.error("IMAGE_BLOB_CLEANUP_ERROR:", error); }
    return Response.json({ success: true });
  } catch (error) {
    console.error("IMAGE_DELETE_ERROR:", error);
    return Response.json({ error: "Could not remove image." }, { status: 500 });
  }
}
