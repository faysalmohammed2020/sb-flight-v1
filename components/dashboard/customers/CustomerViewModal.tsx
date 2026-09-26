"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FileText, Loader2, UserRound, X } from "lucide-react";

type CustomerDetails = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  nationality: string | null;
  passportNumber: string | null;
  nidNumber: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  status: string;
  createdAt: string;
  customerProfile: {
    occupation: string | null;
    companyName: string | null;
    emergencyName: string | null;
    emergencyPhone: string | null;
    emergencyRelation: string | null;
    preferredCurrency: string | null;
    preferredLanguage: string | null;
    notes: string | null;
  } | null;
  _count: { bookings: number; payments: number };
};

type CustomerImage = {
  id: string;
  folder: string;
  originalName: string | null;
  alt: string | null;
  createdAt: string;
};

type CustomerDocument = {
  id: string;
  name: string;
  type: string;
  url: string;
  status: string;
  issueDate: string | null;
  expiryDate: string | null;
};

type CustomerResponse = {
  customer: CustomerDetails;
  images: CustomerImage[];
  documents: CustomerDocument[];
};

function displayDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-BD", { year: "numeric", month: "short", day: "numeric" });
}

function safeDocumentUrl(url: string) {
  return /^https?:\/\//i.test(url) || /^\/(?!\/)/.test(url) ? url : null;
}

function Detail({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium text-[var(--text-muted)]">{label}</dt>
      <dd className="mt-1 break-words text-sm font-medium text-[var(--text-primary)]">{value === null || value === undefined || value === "" ? "—" : value}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[var(--border)] bg-white p-4 md:p-5">
      <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">{title}</h3>
      {children}
    </section>
  );
}

export default function CustomerViewModal({ customerId, onClose }: {
  customerId: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [details, setDetails] = useState<CustomerResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function loadCustomer() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/customers/${encodeURIComponent(customerId)}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Could not load customer.");
        setDetails(result as CustomerResponse);
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error ? cause.message : "Could not load customer.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void loadCustomer();
    return () => controller.abort();
  }, [customerId, retry]);

  const customer = details?.customer;
  const images = details?.images || [];
  const profileImage = images.find((image) => image.folder === "customer/profile");
  const documentImages = images.filter((image) => image.folder !== "customer/profile");
  const documents = details?.documents || [];
  const fullName = customer ? `${customer.firstName} ${customer.lastName || ""}`.trim() : "Customer Profile";

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      aria-labelledby="customer-view-title"
      className="fixed inset-0 m-auto max-h-[92vh] w-[calc(100%-2rem)] max-w-5xl overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-0 text-left shadow-2xl backdrop:bg-black/55"
    >
      <div className="flex max-h-[92vh] flex-col">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--border)] px-5 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
              {profileImage ? (
                <Image unoptimized src={`/api/images/${profileImage.id}`} alt={fullName} width={44} height={44} className="h-full w-full object-cover" />
              ) : <UserRound size={22} />}
            </div>
            <div>
              <h2 id="customer-view-title" className="text-lg font-bold text-[var(--text-primary)]">{fullName}</h2>
              <p className="text-xs text-[var(--text-muted)]">Customer ID: {customerId}</p>
            </div>
          </div>
          <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close customer profile" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-soft)]"><X size={18} /></button>
        </div>

        <div className="min-h-0 space-y-4 overflow-y-auto bg-[var(--surface-soft)] p-4 md:p-6">
          {loading && <div role="status" className="flex min-h-48 items-center justify-center gap-2 text-sm text-[var(--text-secondary)]"><Loader2 size={18} className="animate-spin" /> Loading customer...</div>}
          {error && !loading && (
            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p>{error}</p>
              <button type="button" onClick={() => setRetry((value) => value + 1)} className="mt-2 font-semibold underline">Try again</button>
            </div>
          )}
          {customer && !loading && !error && (
            <>
              <Section title="Personal Information">
                <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Detail label="Status" value={customer.status} />
                  <Detail label="Date of Birth" value={displayDate(customer.dateOfBirth)} />
                  <Detail label="Gender" value={customer.gender} />
                  <Detail label="Nationality" value={customer.nationality} />
                  <Detail label="Email" value={customer.email} />
                  <Detail label="Phone" value={customer.phone} />
                  <Detail label="Joined" value={displayDate(customer.createdAt)} />
                  <Detail label="Bookings" value={customer._count.bookings} />
                  <Detail label="Payments" value={customer._count.payments} />
                </dl>
              </Section>

              <Section title="Identity & Travel">
                <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Detail label="Passport Number" value={customer.passportNumber} />
                  <Detail label="NID Number" value={customer.nidNumber} />
                  <Detail label="Country" value={customer.country} />
                  <Detail label="City" value={customer.city} />
                  <div className="col-span-2 md:col-span-4"><Detail label="Address" value={customer.address} /></div>
                </dl>
              </Section>

              <Section title="Professional Information & Preferences">
                <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Detail label="Occupation" value={customer.customerProfile?.occupation} />
                  <Detail label="Company" value={customer.customerProfile?.companyName} />
                  <Detail label="Currency" value={customer.customerProfile?.preferredCurrency} />
                  <Detail label="Language" value={customer.customerProfile?.preferredLanguage} />
                </dl>
              </Section>

              <Section title="Emergency Contact">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Detail label="Name" value={customer.customerProfile?.emergencyName} />
                  <Detail label="Phone" value={customer.customerProfile?.emergencyPhone} />
                  <Detail label="Relationship" value={customer.customerProfile?.emergencyRelation} />
                </dl>
              </Section>

              <Section title="Documents & Images">
                {documentImages.length === 0 && documents.length === 0 ? (
                  <p className="text-sm text-[var(--text-muted)]">No documents uploaded for this customer.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {documentImages.map((image) => (
                      <div key={image.id} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-soft)]">
                        <a href={`/api/images/${image.id}`} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Open ${image.folder} image`}>
                          <Image unoptimized src={`/api/images/${image.id}`} alt={image.alt || image.originalName || image.folder} width={480} height={280} className="h-40 w-full bg-white object-contain" />
                        </a>
                        <div className="p-3">
                          <p className="text-sm font-semibold capitalize text-[var(--text-primary)]">{image.folder.replaceAll("/", " / ")}</p>
                          <p className="truncate text-xs text-[var(--text-muted)]">{image.originalName || "Image"}</p>
                          <a href={`/api/images/${image.id}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-semibold text-[var(--primary)] hover:underline">Open image</a>
                        </div>
                      </div>
                    ))}
                    {documents.map((document) => {
                      const url = safeDocumentUrl(document.url);
                      return (
                        <div key={document.id} className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                          <FileText size={24} className="mb-3 text-[var(--primary)]" />
                          <p className="text-sm font-semibold text-[var(--text-primary)]">{document.name}</p>
                          <p className="mt-1 text-xs text-[var(--text-muted)]">{document.type.replaceAll("_", " ")} · {document.status}</p>
                          <p className="mt-2 text-xs text-[var(--text-muted)]">Expires: {displayDate(document.expiryDate)}</p>
                          {url && <a href={url} target="_blank" rel="noopener noreferrer" className="mt-auto pt-3 text-xs font-semibold text-[var(--primary)] hover:underline">Open document</a>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </Section>

              {customer.customerProfile?.notes && (
                <Section title="Internal Notes"><p className="whitespace-pre-wrap text-sm text-[var(--text-secondary)]">{customer.customerProfile.notes}</p></Section>
              )}
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
