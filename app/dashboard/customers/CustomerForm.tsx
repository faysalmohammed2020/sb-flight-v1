"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Save,
  UserPlus,
} from "lucide-react";

import {
  createCustomer,
  type CustomerFormState,
} from "./actions";

const initialState: CustomerFormState = {};

export default function CustomerForm() {
  const [state, formAction, pending] = useActionState(
    createCustomer,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (!state.error) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [state.error]);

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={(event) => {
        if (formRef.current?.querySelector('[data-uploading="true"]')) {
          event.preventDefault();
          setUploadError("Please wait for image uploads to finish.");
        } else {
          setUploadError("");
        }
      }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customers"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[var(--text-secondary)] shadow-sm transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <UserPlus
                size={19}
                className="text-[var(--primary)]"
              />

              <h1 className="text-xl font-bold text-[var(--text-primary)] md:text-2xl">
                Add Customer
              </h1>
            </div>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Create a new customer profile for SB Flight.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <Loader2
              size={17}
              className="animate-spin"
            />
          ) : (
            <Save size={17} />
          )}

          {pending ? "Creating..." : "Create Customer"}
        </button>
      </div>

      {/* Error */}
      {uploadError && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{uploadError}</div>}
      {state.error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <span className="font-semibold">
            Error:
          </span>

          <span>{state.error}</span>
        </div>
      )}

      {/* Personal Information */}
      <Section
        title="Personal Information"
        description="Basic information about the customer."
      >
        <div className="mb-5"><ImageUpload folder="customer/profile" name="profileImageId" label="Profile Image" /></div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field
            label="First Name"
            name="firstName"
            required
            placeholder="Enter first name"
          />

          <Field
            label="Last Name"
            name="lastName"
            placeholder="Enter last name"
          />

          <Field
            label="Email Address"
            name="email"
            type="email"
            placeholder="customer@example.com"
          />

          <Field
            label="Phone Number"
            name="phone"
            placeholder="+880 1XXXXXXXXX"
          />

          <Field
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
          />

          <SelectField
            label="Gender"
            name="gender"
            options={[
              {
                label: "Select gender",
                value: "",
              },
              {
                label: "Male",
                value: "MALE",
              },
              {
                label: "Female",
                value: "FEMALE",
              },
              {
                label: "Other",
                value: "OTHER",
              },
            ]}
          />

          <Field
            label="Nationality"
            name="nationality"
            placeholder="Bangladeshi"
            defaultValue="Bangladeshi"
          />

          <SelectField
            label="Status"
            name="status"
            options={[
              {
                label: "Active",
                value: "ACTIVE",
              },
              {
                label: "Inactive",
                value: "INACTIVE",
              },
              {
                label: "Pending",
                value: "PENDING",
              },
              {
                label: "Suspended",
                value: "SUSPENDED",
              },
              {
                label: "Blocked",
                value: "BLOCKED",
              },
            ]}
          />
        </div>
      </Section>

      {/* Passport / Identity */}
      <Section
        title="Identity & Travel Information"
        description="Passport and national identification details."
      >
        <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <ImageUpload folder="passport" name="passportImageId" label="Passport Image" />
          <ImageUpload folder="nid" name="nidImageId" label="NID Image" />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field
            label="Passport Number"
            name="passportNumber"
            placeholder="Enter passport number"
          />

          <Field
            label="NID Number"
            name="nidNumber"
            placeholder="Enter NID number"
          />

          <Field
            label="Country"
            name="country"
            defaultValue="Bangladesh"
            placeholder="Bangladesh"
          />

          <Field
            label="City"
            name="city"
            placeholder="Dhaka"
          />

          <div className="md:col-span-2">
            <TextAreaField
              label="Address"
              name="address"
              placeholder="Enter full address"
              rows={3}
            />
          </div>
        </div>
      </Section>

      {/* Professional */}
      <Section
        title="Professional Information"
        description="Optional employment and company details."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field
            label="Occupation"
            name="occupation"
            placeholder="Software Engineer"
          />

          <Field
            label="Company Name"
            name="companyName"
            placeholder="Company name"
          />
        </div>
      </Section>

      {/* Preferences */}
      <Section
        title="Customer Preferences"
        description="Language and currency preferences."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <SelectField
            label="Preferred Currency"
            name="preferredCurrency"
            options={[
              {
                label: "BDT — Bangladeshi Taka",
                value: "BDT",
              },
              {
                label: "USD — US Dollar",
                value: "USD",
              },
              {
                label: "EUR — Euro",
                value: "EUR",
              },
              {
                label: "GBP — British Pound",
                value: "GBP",
              },
              {
                label: "NPR — Nepalese Rupee",
                value: "NPR",
              },
              {
                label: "THB — Thai Baht",
                value: "THB",
              },
              {
                label: "SGD — Singapore Dollar",
                value: "SGD",
              },
            ]}
          />

          <SelectField
            label="Preferred Language"
            name="preferredLanguage"
            options={[
              {
                label: "English",
                value: "en",
              },
              {
                label: "বাংলা",
                value: "bn",
              },
              {
                label: "Arabic",
                value: "ar",
              },
              {
                label: "Nepali",
                value: "ne",
              },
            ]}
          />
        </div>
      </Section>

      {/* Emergency */}
      <Section
        title="Emergency Contact"
        description="Emergency contact information for the customer."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field
            label="Contact Name"
            name="emergencyName"
            placeholder="Emergency contact name"
          />

          <Field
            label="Contact Phone"
            name="emergencyPhone"
            placeholder="+880 1XXXXXXXXX"
          />

          <Field
            label="Relationship"
            name="emergencyRelation"
            placeholder="Spouse, Father, Brother..."
          />
        </div>
      </Section>

      {/* Notes */}
      <Section
        title="Additional Notes"
        description="Internal notes about this customer."
      >
        <TextAreaField
          label="Notes"
          name="notes"
          placeholder="Add any additional information..."
          rows={5}
        />
      </Section>

      {/* Bottom actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-5 sm:flex-row sm:justify-end">
        <Link
          href="/dashboard/customers"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-[var(--border)] bg-white px-5 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <Loader2
              size={17}
              className="animate-spin"
            />
          ) : (
            <CheckCircle2 size={17} />
          )}

          {pending
            ? "Creating Customer..."
            : "Create Customer"}
        </button>
      </div>
    </form>
  );
}

/* =========================================================
   SECTION
========================================================= */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-white shadow-sm">
      <div className="border-b border-[var(--border)] px-5 py-4 md:px-6">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">
          {title}
        </h2>

        <p className="mt-1 text-xs text-[var(--text-muted)]">
          {description}
        </p>
      </div>

      <div className="p-5 md:p-6">
        {children}
      </div>
    </section>
  );
}

/* =========================================================
   INPUT
========================================================= */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-[var(--border)] bg-white px-3.5 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
      />
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        className="h-11 w-full rounded-lg border border-[var(--border)] bg-white px-3.5 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   TEXTAREA
========================================================= */

function TextAreaField({
  label,
  name,
  placeholder,
  rows,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border border-[var(--border)] bg-white px-3.5 py-3 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
      />
    </div>
  );
}
