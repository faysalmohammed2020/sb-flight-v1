import { get } from "@vercel/blob";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isLocalImageUrl, readLocalImage } from "@/lib/image-storage";
import { canAccessPrivateImages, canManageImages, isImageFolder, isPrivateImage } from "@/lib/images";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return new Response("Authentication required.", { status: 401 });
  if (!canManageImages(session.user.role)) return new Response("Forbidden.", { status: 403 });

  const { id } = await params;
  const image = await prisma.image.findUnique({ where: { id } });
  if (!image || !isImageFolder(image.folder) ||
      (image.entityType === null && image.uploadedById !== session.user.id)) {
    return new Response("Not found.", { status: 404 });
  }
  if (isPrivateImage(image.folder) && !canAccessPrivateImages(session.user.role)) {
    return new Response("Forbidden.", { status: 403 });
  }

  if (isLocalImageUrl(image.url)) {
    try {
      const bytes = await readLocalImage(image.url);
      return new Response(bytes, {
        headers: {
          "Content-Type": image.mimeType || "application/octet-stream",
          "Content-Disposition": "inline",
          "Cache-Control": "private, no-store",
          "X-Content-Type-Options": "nosniff",
        },
      });
    } catch (error) {
      console.error("LOCAL_IMAGE_READ_ERROR:", error);
      return new Response("Image not found.", { status: 404 });
    }
  }
  if (!isPrivateImage(image.folder)) {
    return Response.redirect(image.url);
  }
  const token = process.env.BLOB_PRIVATE_READ_WRITE_TOKEN;
  if (!token) return new Response("Private Blob store is not configured.", { status: 503 });

  try {
    const result = await get(image.url, { access: "private", token });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return new Response("Not found.", { status: 404 });
    }
    return new Response(result.stream, {
      headers: {
        "Content-Type": image.mimeType || "application/octet-stream",
        "Content-Disposition": "inline",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("IMAGE_READ_ERROR:", error);
    return new Response("Could not read image.", { status: 500 });
  }
}
