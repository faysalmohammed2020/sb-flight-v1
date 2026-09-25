import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  Plane,
  Plus,
  Receipt,
  Ticket,
  TrendingUp,
  Users,
  Wallet,
  AlertCircle,
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";

const stats = [
  {
    title: "Total Bookings",
    value: "128",
    change: "+12.5%",
    trend: "up",
    icon: CalendarDays,
    description: "vs last month",
  },
  {
    title: "Confirmed Bookings",
    value: "96",
    change: "+8.2%",
    trend: "up",
    icon: CheckCircle2,
    description: "vs last month",
  },
  {
    title: "Pending Bookings",
    value: "22",
    change: "-4.8%",
    trend: "down",
    icon: Clock3,
    description: "vs last month",
  },
  {
    title: "Total Revenue",
    value: "৳12.40L",
    change: "+18.4%",
    trend: "up",
    icon: TrendingUp,
    description: "vs last month",
  },
];

const bookings = [
  {
    id: "SB-1024",
    customer: "Rahim Ahmed",
    destination: "Nepal",
    travelDate: "28 Sep 2026",
    travelers: 4,
    amount: "৳2,80,000",
    status: "Confirmed",
  },
  {
    id: "SB-1025",
    customer: "Nusrat Jahan",
    destination: "Thailand",
    travelDate: "02 Oct 2026",
    travelers: 2,
    amount: "৳1,45,000",
    status: "Pending",
  },
  {
    id: "SB-1026",
    customer: "Tanvir Hasan",
    destination: "Singapore",
    travelDate: "08 Oct 2026",
    travelers: 3,
    amount: "৳2,10,000",
    status: "Confirmed",
  },
  {
    id: "SB-1027",
    customer: "Sadia Islam",
    destination: "Maldives",
    travelDate: "12 Oct 2026",
    travelers: 2,
    amount: "৳1,85,000",
    status: "Payment Due",
  },
  {
    id: "SB-1028",
    customer: "Arif Hossain",
    destination: "Bhutan",
    travelDate: "18 Oct 2026",
    travelers: 5,
    amount: "৳3,25,000",
    status: "Confirmed",
  },
];

const activities = [
  {
    title: "Booking SB-1028 confirmed",
    description: "Arif Hossain · Bhutan Tour",
    time: "12 min ago",
    type: "booking",
  },
  {
    title: "Payment received",
    description: "৳50,000 from Sadia Islam",
    time: "35 min ago",
    type: "payment",
  },
  {
    title: "New customer registered",
    description: "Nusrat Jahan",
    time: "1 hour ago",
    type: "customer",
  },
  {
    title: "Visa document uploaded",
    description: "Tanvir Hasan · Singapore",
    time: "2 hours ago",
    type: "visa",
  },
  {
    title: "New B2B agent added",
    description: "Skyline Travels",
    time: "3 hours ago",
    type: "agent",
  },
];

const tasks = [
  {
    title: "Follow up with Rahim Ahmed",
    type: "Customer Follow-up",
    time: "10:30 AM",
    priority: "High",
  },
  {
    title: "Verify Nepal visa documents",
    type: "Visa Application",
    time: "11:30 AM",
    priority: "High",
  },
  {
    title: "Payment reminder – SB-1027",
    type: "Payment",
    time: "01:00 PM",
    priority: "Medium",
  },
  {
    title: "Send Thailand quotation",
    type: "Quotation",
    time: "03:00 PM",
    priority: "Medium",
  },
];

const destinations = [
  {
    name: "Nepal",
    bookings: 42,
    revenue: "৳4.25L",
    percentage: 34,
  },
  {
    name: "Thailand",
    bookings: 31,
    revenue: "৳3.10L",
    percentage: 25,
  },
  {
    name: "Singapore",
    bookings: 18,
    revenue: "৳2.20L",
    percentage: 18,
  },
  {
    name: "Maldives",
    bookings: 15,
    revenue: "৳1.85L",
    percentage: 15,
  },
];

const quickActions = [
  {
    title: "New Booking",
    description: "Create a new booking",
    href: "/dashboard/bookings/new",
    icon: CalendarDays,
  },
  {
    title: "Add Customer",
    description: "Create customer profile",
    href: "/dashboard/customers/new",
    icon: Users,
  },
  {
    title: "Ticket Request",
    description: "Create ticket request",
    href: "/dashboard/tickets/new",
    icon: Ticket,
  },
  {
    title: "Visa Application",
    description: "Start visa application",
    href: "/dashboard/visa/new",
    icon: FileText,
  },
  {
    title: "Create Tour",
    description: "Add a new tour package",
    href: "/dashboard/tours/new",
    icon: MapPin,
  },
  {
    title: "Create Invoice",
    description: "Generate new invoice",
    href: "/dashboard/accounting/invoices/new",
    icon: Receipt,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <span>Dashboard</span>
            <span>/</span>
            <span>Overview</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] md:text-3xl">
            Good Morning, Faysal 👋
          </h1>

          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Here&apos;s what&apos;s happening with SB Flight today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/tours/new"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <Plus size={17} />
            Create Tour
          </Link>

          <Link
            href="/dashboard/bookings/new"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--primary)] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--primary-dark)]"
          >
            <Plus size={17} />
            New Booking
          </Link>
        </div>
      </div>

      {/* =====================================================
          STAT CARDS
      ====================================================== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                  <Icon size={21} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    stat.trend === "up"
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}

                  {stat.change}
                </span>

                <span className="text-xs text-[var(--text-muted)]">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          REVENUE + BOOKING OVERVIEW
      ====================================================== */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
        {/* Revenue Overview */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-[var(--text-primary)]">
                Revenue Overview
              </h2>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Revenue performance for the last 7 months
              </p>
            </div>

            <select className="h-9 rounded-lg border border-[var(--border)] bg-white px-3 text-xs font-medium text-[var(--text-secondary)] outline-none focus:border-[var(--primary)]">
              <option>Last 7 months</option>
              <option>Last 30 days</option>
              <option>This year</option>
            </select>
          </div>

          {/* Chart Placeholder */}
          <div className="mt-6">
            <div className="flex h-[280px] items-end gap-3 border-b border-l border-[var(--border)] px-3 pb-0 pt-6 sm:gap-5">
              {[48, 62, 54, 76, 66, 88, 96].map((height, index) => (
                <div
                  key={index}
                  className="group flex h-full flex-1 flex-col justify-end"
                >
                  <div
                    className="relative w-full rounded-t-lg bg-[var(--primary)] opacity-90 transition group-hover:opacity-100"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded bg-[var(--navy)] px-2 py-1 text-[10px] text-white group-hover:block">
                      ৳{[2.1, 2.7, 2.4, 3.4, 3.0, 4.1, 4.8][index]}L
                    </div>
                  </div>

                  <span className="mt-3 text-center text-[10px] text-[var(--text-muted)]">
                    {
                      [
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                      ][index]
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-5 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
              <span className="text-[var(--text-secondary)]">
                Revenue
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--secondary)]" />
              <span className="text-[var(--text-secondary)]">
                Bookings
              </span>
            </div>
          </div>
        </div>

        {/* Booking Overview */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
          <div>
            <h2 className="font-semibold text-[var(--text-primary)]">
              Booking Overview
            </h2>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Current booking status
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[22px] border-[var(--primary)]">
              <div className="absolute inset-[-22px] rounded-full border-[22px] border-transparent border-r-[var(--secondary)] border-t-[var(--secondary)]" />

              <div className="text-center">
                <p className="text-3xl font-bold text-[var(--text-primary)]">
                  128
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  Total Bookings
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <BookingStatus
              label="Confirmed"
              value="96"
              percentage="75%"
              className="bg-[var(--primary)]"
            />

            <BookingStatus
              label="Pending"
              value="19"
              percentage="15%"
              className="bg-[var(--secondary)]"
            />

            <BookingStatus
              label="Cancelled"
              value="13"
              percentage="10%"
              className="bg-red-400"
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          UPCOMING DEPARTURES
      ====================================================== */}
      <div className="rounded-2xl border border-[var(--border)] bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-[var(--border)] p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-[var(--text-primary)]">
              Upcoming Departures
            </h2>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Upcoming customer travel schedules
            </p>
          </div>

          <Link
            href="/dashboard/bookings"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-soft)] text-left">
                <th className="px-5 py-3 text-xs font-semibold text-[var(--text-muted)]">
                  Booking
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-[var(--text-muted)]">
                  Customer
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-[var(--text-muted)]">
                  Destination
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-[var(--text-muted)]">
                  Travel Date
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-[var(--text-muted)]">
                  Travelers
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-[var(--text-muted)]">
                  Amount
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-[var(--text-muted)]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-soft)]"
                >
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-[var(--primary)]">
                      {booking.id}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {booking.customer}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <MapPin size={14} />
                      {booking.destination}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                    {booking.travelDate}
                  </td>

                  <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                    {booking.travelers} Pax
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-[var(--text-primary)]">
                    {booking.amount}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================
          PAYMENT + POPULAR DESTINATIONS
      ====================================================== */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Payment Summary */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-[var(--text-primary)]">
                Payment Summary
              </h2>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Current financial position
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--secondary-light)] text-[var(--secondary-dark)]">
              <Wallet size={20} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <FinanceCard
              title="Received"
              amount="৳8.65L"
              icon={CreditCard}
              className="text-emerald-600"
            />

            <FinanceCard
              title="Pending"
              amount="৳2.40L"
              icon={Clock3}
              className="text-[var(--secondary-dark)]"
            />

            <FinanceCard
              title="Overdue"
              amount="৳1.35L"
              icon={AlertCircle}
              className="text-red-500"
            />
          </div>

          <div className="mt-6 rounded-xl bg-[var(--surface-soft)] p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--text-secondary)]">
                Collection progress
              </span>

              <span className="font-semibold text-[var(--text-primary)]">
                72%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--border)]">
              <div className="h-full w-[72%] rounded-full bg-[var(--primary)]" />
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-[var(--text-primary)]">
                Popular Destinations
              </h2>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Top destinations by bookings
              </p>
            </div>

            <Plane
              size={20}
              className="text-[var(--primary)]"
            />
          </div>

          <div className="mt-5 space-y-4">
            {destinations.map((destination) => (
              <div key={destination.name}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {destination.name}
                    </p>

                    <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                      {destination.bookings} bookings ·{" "}
                      {destination.revenue}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-[var(--text-secondary)]">
                    {destination.percentage}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--surface-soft)]">
                  <div
                    className="h-full rounded-full bg-[var(--primary)]"
                    style={{
                      width: `${destination.percentage * 2.8}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          CRM PIPELINE
      ====================================================== */}
      <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-[var(--text-primary)]">
              Sales Pipeline
            </h2>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Track your leads and sales conversion
            </p>
          </div>

          <Link
            href="/dashboard/crm"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)]"
          >
            Open CRM
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <PipelineCard
            title="New Leads"
            value="48"
            amount="৳7.8L"
            icon={Users}
          />

          <PipelineCard
            title="Contacted"
            value="34"
            amount="৳5.6L"
            icon={BriefcaseBusiness}
          />

          <PipelineCard
            title="Quotation"
            value="21"
            amount="৳4.1L"
            icon={FileText}
          />

          <PipelineCard
            title="Follow-up"
            value="14"
            amount="৳2.8L"
            icon={Clock3}
          />

          <PipelineCard
            title="Converted"
            value="11"
            amount="৳2.2L"
            icon={CheckCircle2}
          />
        </div>
      </div>

      {/* =====================================================
          TASKS + RECENT ACTIVITY
      ====================================================== */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Tasks */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-[var(--text-primary)]">
                Today&apos;s Tasks
              </h2>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Follow-ups and pending work
              </p>
            </div>

            <Link
              href="/dashboard/crm/tasks"
              className="text-xs font-semibold text-[var(--primary)]"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {tasks.map((task) => (
              <div
                key={task.title}
                className="flex items-center gap-3 rounded-xl border border-[var(--border)] p-3 transition hover:bg-[var(--surface-soft)]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                  <Clock3 size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                    {task.title}
                  </p>

                  <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                    {task.type} · {task.time}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
                    task.priority === "High"
                      ? "bg-red-50 text-red-600"
                      : "bg-[var(--secondary-light)] text-[var(--secondary-dark)]"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-[var(--text-primary)]">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Latest system activities
              </p>
            </div>

            <Link
              href="/dashboard/activity"
              className="text-xs font-semibold text-[var(--primary)]"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {activities.map((activity, index) => (
              <div
                key={activity.title}
                className="flex gap-3"
              >
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
                    {activity.type === "payment" ? (
                      <CreditCard size={16} />
                    ) : activity.type === "customer" ? (
                      <Users size={16} />
                    ) : activity.type === "visa" ? (
                      <FileText size={16} />
                    ) : activity.type === "agent" ? (
                      <BriefcaseBusiness size={16} />
                    ) : (
                      <CheckCircle2 size={16} />
                    )}
                  </div>

                  {index !== activities.length - 1 && (
                    <span className="absolute left-1/2 top-9 h-7 w-px -translate-x-1/2 bg-[var(--border)]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {activity.title}
                  </p>

                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                    {activity.description}
                  </p>

                  <p className="mt-1 text-[10px] text-[var(--text-muted)]">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}
      <div>
        <div className="mb-4">
          <h2 className="font-semibold text-[var(--text-primary)]">
            Quick Actions
          </h2>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Frequently used actions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] transition group-hover:bg-[var(--primary)] group-hover:text-white">
                  <Icon size={19} />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
                  {action.title}
                </h3>

                <p className="mt-1 text-[11px] leading-4 text-[var(--text-muted)]">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function BookingStatus({
  label,
  value,
  percentage,
  className,
}: {
  label: string;
  value: string;
  percentage: string;
  className: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${className}`}
          />

          <span className="text-[var(--text-secondary)]">
            {label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--text-primary)]">
            {value}
          </span>

          <span className="text-[var(--text-muted)]">
            {percentage}
          </span>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-soft)]">
        <div
          className={`h-full rounded-full ${className}`}
          style={{ width: percentage }}
        />
      </div>
    </div>
  );
}

function FinanceCard({
  title,
  amount,
  icon: Icon,
  className,
}: {
  title: string;
  amount: string;
  icon: typeof Wallet;
  className: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] p-4">
      <div className={`flex items-center gap-2 ${className}`}>
        <Icon size={15} />

        <span className="text-xs font-medium">
          {title}
        </span>
      </div>

      <p className="mt-2 text-lg font-bold text-[var(--text-primary)]">
        {amount}
      </p>
    </div>
  );
}

function PipelineCard({
  title,
  value,
  amount,
  icon: Icon,
}: {
  title: string;
  value: string;
  amount: string;
  icon: typeof Users;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--text-secondary)]">
          {title}
        </span>

        <Icon
          size={16}
          className="text-[var(--primary)]"
        />
      </div>

      <p className="mt-3 text-xl font-bold text-[var(--text-primary)]">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-[var(--text-muted)]">
        Pipeline value {amount}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Confirmed: "bg-emerald-50 text-emerald-700",
    Pending: "bg-[var(--secondary-light)] text-[var(--secondary-dark)]",
    "Payment Due": "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}