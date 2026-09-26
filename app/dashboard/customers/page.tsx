import Link from "next/link";
import Image from "next/image";
import { Prisma, UserRole, UserStatus } from "@prisma/client";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Mail,
  Phone,
  Plus,
  Search,
  Users,
} from "lucide-react";
import CustomerActions from "@/components/dashboard/customers/CustomerActions";

import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10;

type SearchParams = Promise<{
  page?: string;
  search?: string;
  status?: string;
}>;

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();
  const allowedRoles: UserRole[] = [
    UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER,
    UserRole.STAFF, UserRole.SALES, UserRole.OPERATIONS,
    UserRole.SUPPORT_AGENT,
  ];
  if (!session?.user?.role || !allowedRoles.includes(session.user.role)) {
    notFound();
  }

  const params = await searchParams;

  const pageParam = Number(params.page || "1");
  const page =
    Number.isFinite(pageParam) && pageParam > 0
      ? Math.floor(pageParam)
      : 1;

  const search = String(params.search || "").trim();
  const statusParam = String(params.status || "").trim();

  const validStatus = Object.values(UserStatus).includes(
    statusParam as UserStatus
  );

  const where: Prisma.UserWhereInput = {
    role: "CUSTOMER",
    ...(validStatus
      ? {
          status: statusParam as UserStatus,
        }
      : {}),
    ...(search
      ? {
          OR: [
            {
              firstName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              passportNumber: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
  };

  const [customers, totalCustomers, activeCustomers] =
    await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: {
          customerProfile: true,
          _count: {
            select: {
              bookings: true,
            },
          },
        },
      }),

      prisma.user.count({
        where,
      }),

      prisma.user.count({
        where: {
          role: "CUSTOMER",
          status: "ACTIVE",
        },
      }),
    ]);

  const totalPages = Math.max(
    1,
    Math.ceil(totalCustomers / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);

  const customerIds = customers.map(
    (customer) => customer.id
  );

  const paymentTotals =
    customerIds.length > 0
      ? await prisma.payment.groupBy({
          by: ["userId"],
          where: {
            userId: {
              in: customerIds,
            },
            direction: "INCOME",
            status: "PAID",
          },
          _sum: {
            amount: true,
          },
        })
      : [];

  const paymentMap = new Map(
    paymentTotals.map((item) => [
      item.userId,
      Number(item._sum.amount || 0),
    ])
  );

  const profileImages = customerIds.length
    ? await prisma.image.findMany({
        where: {
          entityType: "CUSTOMER",
          entityId: { in: customerIds },
          folder: "customer/profile",
        },
        select: { id: true, entityId: true },
        orderBy: { createdAt: "desc" },
      })
    : [];
  const profileImageMap = new Map<string, string>();
  for (const image of profileImages) {
    if (image.entityId && !profileImageMap.has(image.entityId)) {
      profileImageMap.set(image.entityId, `/api/images/${image.id}`);
    }
  }

  const totalPagesForLinks = totalPages;

  function buildUrl(
    nextPage: number,
    nextSearch = search,
    nextStatus = statusParam
  ) {
    const query = new URLSearchParams();

    if (nextPage > 1) {
      query.set("page", String(nextPage));
    }

    if (nextSearch) {
      query.set("search", nextSearch);
    }

    if (nextStatus) {
      query.set("status", nextStatus);
    }

    const queryString = query.toString();

    return `/dashboard/customers${
      queryString ? `?${queryString}` : ""
    }`;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Link
              href="/dashboard"
              className="hover:text-[var(--primary)]"
            >
              Dashboard
            </Link>

            <span>/</span>

            <span>Customers</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
              <Users size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Customers
              </h1>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Manage all SB Flight customers and their profiles.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/dashboard/customers/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--primary-dark)]"
        >
          <Plus size={17} />
          Add Customer
        </Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total Customers"
          value={totalCustomers}
          icon={Users}
        />

        <SummaryCard
          label="Active Customers"
          value={activeCustomers}
          icon={Users}
        />

        <SummaryCard
          label="Showing"
          value={`${customers.length} / ${totalCustomers}`}
          icon={Filter}
        />
      </div>

      {/* Main table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">
        {/* Toolbar */}
        <div className="border-b border-[var(--border)] p-4 md:p-5">
          <form
            method="GET"
            className="flex flex-col gap-3 lg:flex-row lg:items-center"
          >
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                name="search"
                defaultValue={search}
                placeholder="Search by name, email, phone or passport..."
                className="h-10 w-full rounded-lg border border-[var(--border)] bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
              />
            </div>

            <select
              name="status"
              defaultValue={statusParam}
              className="h-10 rounded-lg border border-[var(--border)] bg-white px-3 text-sm text-[var(--text-secondary)] outline-none focus:border-[var(--primary)]"
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="PENDING">Pending</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="BLOCKED">Blocked</option>
            </select>

            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <Filter size={16} />
              Filter
            </button>
          </form>
        </div>

        {/* Table */}
        {customers.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface-soft)] text-left">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      Contact
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      Travel Info
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      Bookings
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      Total Spent
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      Status
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer) => {
                    const fullName =
                      `${customer.firstName} ${
                        customer.lastName || ""
                      }`.trim();

                    const totalSpent =
                      paymentMap.get(customer.id) || 0;

                    return (
                      <tr
                        key={customer.id}
                        className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-soft)]"
                      >
                        {/* Customer */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar
                              name={fullName}
                              image={profileImageMap.get(customer.id) || customer.image}
                            />

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                                {fullName}
                              </p>

                              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                                ID: {customer.id.slice(-8).toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-5 py-4">
                          <div className="space-y-1.5">
                            {customer.email && (
                              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                                <Mail size={13} />
                                <span>{customer.email}</span>
                              </div>
                            )}

                            {customer.phone && (
                              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                                <Phone size={13} />
                                <span>{customer.phone}</span>
                              </div>
                            )}

                            {!customer.email &&
                              !customer.phone && (
                                <span className="text-xs text-[var(--text-muted)]">
                                  No contact info
                                </span>
                              )}
                          </div>
                        </td>

                        {/* Travel */}
                        <td className="px-5 py-4">
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-[var(--text-primary)]">
                              {customer.nationality ||
                                "Nationality not set"}
                            </p>

                            <p className="text-[11px] text-[var(--text-muted)]">
                              {customer.passportNumber
                                ? `Passport: ${customer.passportNumber}`
                                : "Passport not added"}
                            </p>
                          </div>
                        </td>

                        {/* Bookings */}
                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-lg bg-[var(--primary-light)] px-2.5 py-1 text-xs font-semibold text-[var(--primary)]">
                            {customer._count.bookings}
                          </span>
                        </td>

                        {/* Spent */}
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-[var(--text-primary)]">
                            ৳
                            {totalSpent.toLocaleString(
                              "en-BD"
                            )}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <StatusBadge
                            status={customer.status}
                          />
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4 text-right">
                          <CustomerActions
  customer={{
    id: customer.id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    image: customer.image,
    dateOfBirth: customer.dateOfBirth,
    gender: customer.gender,
    nationality: customer.nationality,
    passportNumber: customer.passportNumber,
    nidNumber: customer.nidNumber,
    address: customer.address,
    city: customer.city,
    country: customer.country,
    status: customer.status,
    customerProfile: customer.customerProfile,
  }}
/>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-3 border-t border-[var(--border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[var(--text-muted)]">
                Showing{" "}
                <span className="font-semibold text-[var(--text-secondary)]">
                  {(currentPage - 1) * PAGE_SIZE + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-[var(--text-secondary)]">
                  {Math.min(
                    currentPage * PAGE_SIZE,
                    totalCustomers
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[var(--text-secondary)]">
                  {totalCustomers}
                </span>{" "}
                customers
              </p>

              <div className="flex items-center gap-2">
                <Link
                  href={buildUrl(
                    Math.max(1, currentPage - 1)
                  )}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] ${
                    currentPage <= 1
                      ? "pointer-events-none opacity-40"
                      : "hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  }`}
                >
                  <ChevronLeft size={15} />
                </Link>

                <div className="flex items-center gap-1">
                  {getPageNumbers(
                    currentPage,
                    totalPagesForLinks
                  ).map((pageNumber) => (
                    <Link
                      key={pageNumber}
                      href={buildUrl(pageNumber)}
                      className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold ${
                        pageNumber === currentPage
                          ? "bg-[var(--primary)] text-white"
                          : "border border-[var(--border)] bg-white text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  ))}
                </div>

                <Link
                  href={buildUrl(
                    Math.min(
                      totalPagesForLinks,
                      currentPage + 1
                    )
                  )}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] ${
                    currentPage >= totalPagesForLinks
                      ? "pointer-events-none opacity-40"
                      : "hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  }`}
                >
                  <ChevronRight size={15} />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <EmptyState
            search={search}
            status={statusParam}
          />
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon: typeof Users;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-[var(--text-secondary)]">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   AVATAR
========================================================= */

function Avatar({
  name,
  image,
}: {
  name: string;
  image?: string | null;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  if (image) {
    return (
      <Image
        unoptimized
        width={40}
        height={40}
        src={image}
        alt={name}
        className="h-10 w-10 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary-light)] text-xs font-bold text-[var(--primary)]">
      {initials || "CU"}
    </div>
  );
}

/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
  status,
}: {
  status: UserStatus;
}) {
  const styles: Record<UserStatus, string> = {
    ACTIVE:
      "bg-emerald-50 text-emerald-700",
    INACTIVE:
      "bg-gray-100 text-gray-600",
    SUSPENDED:
      "bg-amber-50 text-amber-700",
    BLOCKED:
      "bg-red-50 text-red-700",
    PENDING:
      "bg-blue-50 text-blue-700",
  };

  const labels: Record<UserStatus, string> = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    SUSPENDED: "Suspended",
    BLOCKED: "Blocked",
    PENDING: "Pending",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  search,
  status,
}: {
  search: string;
  status: string;
}) {
  const hasFilters = Boolean(search || status);

  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)]">
        <Users size={25} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
        {hasFilters
          ? "No customers found"
          : "No customers yet"}
      </h3>

      <p className="mt-1 max-w-md text-sm text-[var(--text-muted)]">
        {hasFilters
          ? "Try changing your search or filter criteria."
          : "Start by creating your first customer profile."}
      </p>

      {!hasFilters && (
        <Link
          href="/dashboard/customers/new"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--primary)] px-4 text-sm font-semibold hover:bg-[var(--primary-dark)]"
        >
          <Plus size={16} className="text-white"/>
          Add Customer
        </Link>
      )}
    </div>
  );
}

/* =========================================================
   PAGE NUMBERS
========================================================= */

function getPageNumbers(
  currentPage: number,
  totalPages: number
) {
  if (totalPages <= 5) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];
}
