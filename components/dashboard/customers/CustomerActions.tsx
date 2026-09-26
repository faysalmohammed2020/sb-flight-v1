"use client";

import {
  useState,
  type FormEvent,
} from "react";

import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Pencil,
  Trash2,
  UserRound,
  Plane,
  MapPin,
  BriefcaseBusiness,
  Phone,
  Settings2,
  FileText,
  Eye,
  X,
} from "lucide-react";

import { useRouter } from "next/navigation";
import CustomerViewModal from "./CustomerViewModal";

type CustomerData = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  image: string | null;
  dateOfBirth: Date | string | null;
  gender: string | null;
  nationality: string | null;
  passportNumber: string | null;
  nidNumber: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  status: string;

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
};

interface CustomerActionsProps {
  customer: CustomerData;
}

export default function CustomerActions({
  customer,
}: CustomerActionsProps) {
  const router = useRouter();

  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const profile = customer.customerProfile;

  const [form, setForm] = useState({
    firstName: customer.firstName || "",
    lastName: customer.lastName || "",
    email: customer.email || "",
    phone: customer.phone || "",

    dateOfBirth: customer.dateOfBirth
      ? new Date(customer.dateOfBirth)
          .toISOString()
          .split("T")[0]
      : "",

    gender: customer.gender || "",
    nationality: customer.nationality || "",
    passportNumber: customer.passportNumber || "",
    nidNumber: customer.nidNumber || "",

    address: customer.address || "",
    city: customer.city || "",
    country: customer.country || "Bangladesh",

    status: customer.status || "ACTIVE",

    occupation: profile?.occupation || "",
    companyName: profile?.companyName || "",

    emergencyName: profile?.emergencyName || "",
    emergencyPhone: profile?.emergencyPhone || "",
    emergencyRelation: profile?.emergencyRelation || "",

    preferredCurrency:
      profile?.preferredCurrency || "BDT",

    preferredLanguage:
      profile?.preferredLanguage || "en",

    notes: profile?.notes || "",
  });

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleUpdate(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `/api/customers/${customer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update customer."
        );
      }

      setMessage(
        "Customer updated successfully."
      );

      router.refresh();

      setTimeout(() => {
        setEditOpen(false);
        setMessage("");
      }, 700);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/customers/${customer.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete customer."
        );
      }

      setDeleteOpen(false);

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* =====================================================
          ACTION BUTTONS
      ===================================================== */}

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          title="View customer profile"
          aria-label={`View ${customer.firstName} ${customer.lastName || ""} profile`}
          onClick={() => setViewOpen(true)}
          className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-[var(--border)] bg-white px-2.5 text-xs font-semibold text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <Eye size={15} />
          View
        </button>
        <button
          type="button"
          title="Edit customer"
          onClick={() => {
            setError("");
            setMessage("");
            setEditOpen(true);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <Pencil size={14} />
        </button>

        <button
          type="button"
          title="Delete customer"
          onClick={() => {
            setError("");
            setDeleteOpen(true);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-white text-red-500 transition hover:border-red-300 hover:bg-red-50"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {viewOpen && (
        <CustomerViewModal customerId={customer.id} onClose={() => setViewOpen(false)} />
      )}

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {editOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] bg-white px-6 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
                  <UserRound size={19} />
                </div>

                <div className="text-left">
                  <h2 className="text-lg font-bold leading-tight text-[var(--text-primary)]">
                    Edit Customer
                  </h2>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Update customer information and profile details.
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => {
                  setEditOpen(false);
                  setError("");
                  setMessage("");
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--text-primary)]"
              >
                <X size={18} />
              </button>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleUpdate}
              className="min-h-0 overflow-y-auto"
            >
              <div className="space-y-5 p-5 md:p-6">

                {/* =================================================
                    BASIC INFORMATION
                ================================================= */}

                <SectionCard
                  icon={<UserRound size={17} />}
                  title="Basic Information"
                  description="Personal and account information"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                    <Input
                      label="First Name"
                      required
                      value={form.firstName}
                      onChange={(value) =>
                        updateField(
                          "firstName",
                          value
                        )
                      }
                    />

                    <Input
                      label="Last Name"
                      value={form.lastName}
                      onChange={(value) =>
                        updateField(
                          "lastName",
                          value
                        )
                      }
                    />

                    <Input
                      label="Phone"
                      value={form.phone}
                      onChange={(value) =>
                        updateField(
                          "phone",
                          value
                        )
                      }
                    />

                    <Input
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(value) =>
                        updateField(
                          "email",
                          value
                        )
                      }
                    />

                    <Input
                      label="Date of Birth"
                      type="date"
                      value={form.dateOfBirth}
                      onChange={(value) =>
                        updateField(
                          "dateOfBirth",
                          value
                        )
                      }
                    />

                    <Select
                      label="Gender"
                      value={form.gender}
                      onChange={(value) =>
                        updateField(
                          "gender",
                          value
                        )
                      }
                      options={[
                        ["", "Select Gender"],
                        ["MALE", "Male"],
                        ["FEMALE", "Female"],
                        ["OTHER", "Other"],
                      ]}
                    />

                    <Select
                      label="Status"
                      value={form.status}
                      onChange={(value) =>
                        updateField(
                          "status",
                          value
                        )
                      }
                      options={[
                        ["ACTIVE", "Active"],
                        ["INACTIVE", "Inactive"],
                        ["PENDING", "Pending"],
                        ["SUSPENDED", "Suspended"],
                        ["BLOCKED", "Blocked"],
                      ]}
                    />

                    <Input
                      label="Nationality"
                      value={form.nationality}
                      onChange={(value) =>
                        updateField(
                          "nationality",
                          value
                        )
                      }
                    />

                    <Input
                      label="Country"
                      value={form.country}
                      onChange={(value) =>
                        updateField(
                          "country",
                          value
                        )
                      }
                    />

                  </div>
                </SectionCard>

                {/* =================================================
                    TRAVEL INFORMATION
                ================================================= */}

                <SectionCard
                  icon={<Plane size={17} />}
                  title="Travel Information"
                  description="Passport and identification details"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <Input
                      label="Passport Number"
                      value={form.passportNumber}
                      onChange={(value) =>
                        updateField(
                          "passportNumber",
                          value
                        )
                      }
                    />

                    <Input
                      label="NID Number"
                      value={form.nidNumber}
                      onChange={(value) =>
                        updateField(
                          "nidNumber",
                          value
                        )
                      }
                    />

                  </div>
                </SectionCard>

                {/* =================================================
                    ADDRESS
                ================================================= */}

                <SectionCard
                  icon={<MapPin size={17} />}
                  title="Address"
                  description="Customer location and address"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <Input
                      label="City"
                      value={form.city}
                      onChange={(value) =>
                        updateField(
                          "city",
                          value
                        )
                      }
                    />

                    <Input
                      label="Address"
                      value={form.address}
                      onChange={(value) =>
                        updateField(
                          "address",
                          value
                        )
                      }
                    />

                  </div>
                </SectionCard>

                {/* =================================================
                    PROFESSIONAL
                ================================================= */}

                <SectionCard
                  icon={
                    <BriefcaseBusiness size={17} />
                  }
                  title="Professional Information"
                  description="Employment and company information"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <Input
                      label="Occupation"
                      value={form.occupation}
                      onChange={(value) =>
                        updateField(
                          "occupation",
                          value
                        )
                      }
                    />

                    <Input
                      label="Company Name"
                      value={form.companyName}
                      onChange={(value) =>
                        updateField(
                          "companyName",
                          value
                        )
                      }
                    />

                  </div>
                </SectionCard>

                {/* =================================================
                    EMERGENCY
                ================================================= */}

                <SectionCard
                  icon={<Phone size={17} />}
                  title="Emergency Contact"
                  description="Emergency contact information"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <Input
                      label="Name"
                      value={form.emergencyName}
                      onChange={(value) =>
                        updateField(
                          "emergencyName",
                          value
                        )
                      }
                    />

                    <Input
                      label="Phone"
                      value={form.emergencyPhone}
                      onChange={(value) =>
                        updateField(
                          "emergencyPhone",
                          value
                        )
                      }
                    />

                    <Input
                      label="Relation"
                      value={form.emergencyRelation}
                      onChange={(value) =>
                        updateField(
                          "emergencyRelation",
                          value
                        )
                      }
                    />

                  </div>
                </SectionCard>

                {/* =================================================
                    PREFERENCES
                ================================================= */}

                <SectionCard
                  icon={<Settings2 size={17} />}
                  title="Preferences"
                  description="Language and currency preferences"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <Select
                      label="Preferred Currency"
                      value={
                        form.preferredCurrency
                      }
                      onChange={(value) =>
                        updateField(
                          "preferredCurrency",
                          value
                        )
                      }
                      options={[
                        ["BDT", "BDT"],
                        ["USD", "USD"],
                        ["EUR", "EUR"],
                        ["GBP", "GBP"],
                        ["NPR", "NPR"],
                        ["THB", "THB"],
                      ]}
                    />

                    <Select
                      label="Preferred Language"
                      value={
                        form.preferredLanguage
                      }
                      onChange={(value) =>
                        updateField(
                          "preferredLanguage",
                          value
                        )
                      }
                      options={[
                        ["en", "English"],
                        ["bn", "Bangla"],
                        ["ar", "Arabic"],
                        ["ne", "Nepali"],
                      ]}
                    />

                  </div>
                </SectionCard>

                {/* =================================================
                    NOTES
                ================================================= */}

                <SectionCard
                  icon={<FileText size={17} />}
                  title="Notes"
                  description="Internal notes about this customer"
                >
                  <textarea
                    value={form.notes}
                    onChange={(event) =>
                      updateField(
                        "notes",
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder="Add customer notes..."
                    className="w-full resize-none rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                  />
                </SectionCard>

                {/* =================================================
                    MESSAGES
                ================================================= */}

                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertTriangle
                      size={17}
                      className="mt-0.5 shrink-0"
                    />

                    <span>{error}</span>
                  </div>
                )}

                {message && (
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                    <CheckCircle2 size={17} />

                    <span>{message}</span>
                  </div>
                )}

              </div>

              {/* =================================================
                  MODAL FOOTER
              ================================================= */}

              <div className="sticky bottom-0 flex shrink-0 items-center justify-between border-t border-[var(--border)] bg-white px-5 py-4 md:px-6">

                <div className="hidden items-center gap-2 text-xs text-[var(--text-muted)] sm:flex">
                  <CheckCircle2
                    size={14}
                    className="text-[var(--primary)]"
                  />

                  <span>
                    Customer information is securely stored.
                  </span>
                </div>

                <div className="ml-auto flex items-center gap-3">

                  <button
                    type="button"
                    onClick={() => {
                      setEditOpen(false);
                      setError("");
                      setMessage("");
                    }}
                    disabled={loading}
                    className="h-10 rounded-lg border border-[var(--border)] bg-white px-4 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-soft)]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading && (
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                    )}

                    {loading
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

            <div className="p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 size={22} />
              </div>

              <h2 className="mt-4 text-lg font-bold text-[var(--text-primary)]">
                Delete Customer?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Are you sure you want to delete{" "}
                <strong>
                  {customer.firstName}{" "}
                  {customer.lastName || ""}
                </strong>
                ? This action cannot be undone.
              </p>

              {error && (
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertTriangle
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{error}</span>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setDeleteOpen(false);
                    setError("");
                  }}
                  disabled={loading}
                  className="h-10 rounded-lg border border-[var(--border)] bg-white px-4 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                >
                  {loading && (
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  )}

                  {loading
                    ? "Deleting..."
                    : "Delete Customer"}
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   SECTION CARD
========================================================= */

function SectionCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">

      {/* Header — FULL WIDTH + LEFT ALIGNED */}
      <div className="w-full border-b border-[var(--border)] bg-[var(--surface-soft)]">

        <div className="flex w-full items-center justify-start gap-3 px-5 py-4 md:px-6">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
            {icon}
          </div>

          <div className="min-w-0 text-left">
            <h3 className="text-sm font-bold leading-5 text-[var(--text-primary)]">
              {title}
            </h3>

            <p className="mt-0.5 text-xs leading-5 text-[var(--text-muted)]">
              {description}
            </p>
          </div>

        </div>
      </div>

      {/* Content */}
      <div className="w-full p-5 md:p-6">
        {children}
      </div>

    </section>
  );
}

/* =========================================================
   INPUT
========================================================= */

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block w-full text-left">

      <span className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </span>

      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-10 w-full rounded-lg border border-[var(--border)] bg-white px-3 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
      />

    </label>
  );
}

/* =========================================================
   SELECT
========================================================= */

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="block w-full text-left">

      <span className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-10 w-full rounded-lg border border-[var(--border)] bg-white px-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
      >
        {options.map(
          ([optionValue, optionLabel]) => (
            <option
              key={optionValue}
              value={optionValue}
            >
              {optionLabel}
            </option>
          )
        )}
      </select>

    </label>
  );
}
