"use client";

import { useRef, useState } from "react";
import type { ImageFolder } from "@/lib/images";

type UploadedImage = { id: string; folder: string; originalName: string | null };

export default function ImageUpload({ folder, name, label }: {
  folder: ImageFolder;
  name: string;
  label: string;
}) {
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setBusy(true);
    setError("");
    const data = new FormData();
    data.append("file", file);
    data.append("folder", folder);
    try {
      const response = await fetch("/api/upload", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed.");
      setImage(result.image);
      if (image) {
        void fetch("/api/upload", {
          method: "DELETE", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: image.id }),
        });
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!image) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/upload", {
        method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: image.id }),
      });
      if (!response.ok) throw new Error("Could not remove image.");
      setImage(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not remove image.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div data-uploading={busy}>
      <label htmlFor={`${name}-file`} className="mb-2 block text-sm font-medium text-[var(--text-primary)]">{label}</label>
      <input type="hidden" name={name} value={image?.id || ""} />
      <input
        ref={inputRef}
        id={`${name}-file`}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        disabled={busy}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
          event.target.value = "";
        }}
        className="block w-full rounded-lg border border-[var(--border)] bg-white p-2 text-sm text-[var(--text-secondary)] file:mr-3 file:rounded-md file:border-0 file:bg-[var(--primary-light)] file:px-3 file:py-1.5 file:text-[var(--primary)]"
      />
      <p className="mt-1 text-xs text-[var(--text-muted)]">JPEG, PNG or WebP, maximum 4 MB.{folder === "passport" || folder === "nid" ? " Stored privately." : ""}</p>
      {busy && <p role="status" className="mt-2 text-sm text-[var(--primary)]">Uploading...</p>}
      {image && <p className="mt-2 text-sm text-green-700">Uploaded: {image.originalName} <a href={`/api/images/${image.id}`} target="_blank" rel="noopener noreferrer" className="underline">View</a> <button type="button" disabled={busy} onClick={() => void remove()} className="ml-2 underline">Remove</button></p>}
      {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}
