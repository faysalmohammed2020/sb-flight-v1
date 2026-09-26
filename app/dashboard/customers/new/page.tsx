import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import CustomerForm from "../CustomerForm";

export default function NewCustomerPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 hover:text-[var(--primary)]"
        >
          <Home size={13} />
          Dashboard
        </Link>

        <ChevronRight size={13} />

        <Link
          href="/dashboard/customers"
          className="hover:text-[var(--primary)]"
        >
          Customers
        </Link>

        <ChevronRight size={13} />

        <span className="text-[var(--text-secondary)]">
          Add Customer
        </span>
      </div>

      <CustomerForm />
    </div>
  );
}