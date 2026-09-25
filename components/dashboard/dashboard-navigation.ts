import type { LucideIcon } from "lucide-react";

import {
  Activity,
  AirVent,
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Calculator,
  ChartNoAxesCombined,
  ClipboardCheck,
  ClipboardList,
  Contact,
  CreditCard,
  FileBarChart,
  FileCheck2,
  FileText,
  Globe2,
  Headphones,
  Hotel,
  LayoutDashboard,
  LifeBuoy,
  Megaphone,
  MessageSquare,
  NotebookTabs,
  Package,
  Plane,
  Receipt,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Ticket,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
  Landmark,
  Bot,
} from "lucide-react";

export type DashboardNavItem = {
  title: string;
  href?: string;
  icon: LucideIcon;
  children?: DashboardNavItem[];
};

export const dashboardNavigation: DashboardNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  // BOOKINGS
  {
    title: "Bookings",
    icon: CalendarDays,
    children: [
      {
        title: "All Bookings",
        href: "/dashboard/bookings",
        icon: ClipboardList,
      },
      {
        title: "New Booking",
        href: "/dashboard/bookings/new",
        icon: ClipboardCheck,
      },
      {
        title: "Booking Calendar",
        href: "/dashboard/bookings/calendar",
        icon: CalendarDays,
      },
      {
        title: "Booking Status",
        href: "/dashboard/bookings/status",
        icon: Activity,
      },
      {
        title: "Travelers",
        href: "/dashboard/bookings/travelers",
        icon: Users,
      },
      {
        title: "Booking Documents",
        href: "/dashboard/bookings/documents",
        icon: FileText,
      },
      {
        title: "Booking History",
        href: "/dashboard/bookings/history",
        icon: NotebookTabs,
      },
    ],
  },

  // CUSTOMERS
  {
    title: "Customers",
    icon: Users,
    children: [
      {
        title: "All Customers",
        href: "/dashboard/customers",
        icon: Users,
      },
      {
        title: "Add Customer",
        href: "/dashboard/customers/new",
        icon: Contact,
      },
      {
        title: "Customer Profiles",
        href: "/dashboard/customers/profiles",
        icon: UserCog,
      },
      {
        title: "Customer Documents",
        href: "/dashboard/customers/documents",
        icon: FileText,
      },
      {
        title: "Customer Reviews",
        href: "/dashboard/customers/reviews",
        icon: MessageSquare,
      },
    ],
  },

  // AIR TICKETS
  {
    title: "Air Tickets",
    icon: Plane,
    children: [
      {
        title: "Ticket Requests",
        href: "/dashboard/tickets/requests",
        icon: ClipboardList,
      },
      {
        title: "Ticket Quotations",
        href: "/dashboard/tickets/quotations",
        icon: Receipt,
      },
      {
        title: "Air Tickets",
        href: "/dashboard/tickets",
        icon: Ticket,
      },
      {
        title: "Passengers",
        href: "/dashboard/tickets/passengers",
        icon: Users,
      },
    ],
  },

  // TOURS
  {
    title: "Tours",
    icon: Globe2,
    children: [
      {
        title: "All Tours",
        href: "/dashboard/tours",
        icon: Globe2,
      },
      {
        title: "Create Tour",
        href: "/dashboard/tours/new",
        icon: Package,
      },
      {
        title: "Tour Categories",
        href: "/dashboard/tours/categories",
        icon: BookOpen,
      },
      {
        title: "Countries",
        href: "/dashboard/tours/countries",
        icon: Globe2,
      },
      {
        title: "Destinations",
        href: "/dashboard/tours/destinations",
        icon: Landmark,
      },
      {
        title: "Attractions",
        href: "/dashboard/tours/attractions",
        icon: Building2,
      },
      {
        title: "Tour Dates",
        href: "/dashboard/tours/dates",
        icon: CalendarDays,
      },
      {
        title: "Itineraries",
        href: "/dashboard/tours/itineraries",
        icon: NotebookTabs,
      },
      {
        title: "Activities",
        href: "/dashboard/tours/activities",
        icon: Activity,
      },
      {
        title: "Tour Components",
        href: "/dashboard/tours/components",
        icon: Package,
      },
      {
        title: "Tour Costs",
        href: "/dashboard/tours/costs",
        icon: Calculator,
      },
      {
        title: "Tour Quotations",
        href: "/dashboard/tours/quotations",
        icon: Receipt,
      },
    ],
  },

  // VISA
  {
    title: "Visa",
    icon: FileCheck2,
    children: [
      {
        title: "Applications",
        href: "/dashboard/visa",
        icon: FileCheck2,
      },
      {
        title: "New Application",
        href: "/dashboard/visa/new",
        icon: FileText,
      },
      {
        title: "Visa Types",
        href: "/dashboard/visa/types",
        icon: BookOpen,
      },
      {
        title: "Checklists",
        href: "/dashboard/visa/checklists",
        icon: ClipboardCheck,
      },
      {
        title: "Visa Documents",
        href: "/dashboard/visa/documents",
        icon: FileText,
      },
      {
        title: "Visa Status",
        href: "/dashboard/visa/status",
        icon: Activity,
      },
    ],
  },

  // B2B
  {
    title: "B2B Agents",
    icon: BriefcaseBusiness,
    children: [
      {
        title: "All Agents",
        href: "/dashboard/b2b",
        icon: Users,
      },
      {
        title: "Add Agent",
        href: "/dashboard/b2b/new",
        icon: UserCog,
      },
      {
        title: "Agent Bookings",
        href: "/dashboard/b2b/bookings",
        icon: ClipboardList,
      },
      {
        title: "Agent Quotations",
        href: "/dashboard/b2b/quotations",
        icon: Receipt,
      },
      {
        title: "Agent Wallets",
        href: "/dashboard/b2b/wallets",
        icon: Wallet,
      },
      {
        title: "Agent Commissions",
        href: "/dashboard/b2b/commissions",
        icon: TrendingUp,
      },
    ],
  },

  // SUPPLIERS
  {
    title: "Suppliers",
    icon: Building2,
    children: [
      {
        title: "All Suppliers",
        href: "/dashboard/suppliers",
        icon: Building2,
      },
      {
        title: "Supplier Contracts",
        href: "/dashboard/suppliers/contracts",
        icon: FileText,
      },
      {
        title: "Supplier Bookings",
        href: "/dashboard/suppliers/bookings",
        icon: ClipboardList,
      },
      {
        title: "Supplier Invoices",
        href: "/dashboard/suppliers/invoices",
        icon: Receipt,
      },
      {
        title: "Supplier Payments",
        href: "/dashboard/suppliers/payments",
        icon: CreditCard,
      },
    ],
  },

  // HOTELS
  {
    title: "Hotels",
    icon: Hotel,
    children: [
      {
        title: "Hotels",
        href: "/dashboard/hotels",
        icon: Hotel,
      },
      {
        title: "Hotel Rooms",
        href: "/dashboard/hotels/rooms",
        icon: Building2,
      },
    ],
  },

  // TRANSPORT
  {
    title: "Transport",
    icon: AirVent,
    children: [
      {
        title: "Transport Services",
        href: "/dashboard/transport",
        icon: AirVent,
      },
      {
        title: "Guides",
        href: "/dashboard/transport/guides",
        icon: Users,
      },
    ],
  },

  // CRM
  {
    title: "CRM",
    icon: Contact,
    children: [
      {
        title: "Leads",
        href: "/dashboard/crm/leads",
        icon: Contact,
      },
      {
        title: "Lead Follow-ups",
        href: "/dashboard/crm/follow-ups",
        icon: MessageSquare,
      },
      {
        title: "Tasks",
        href: "/dashboard/crm/tasks",
        icon: ClipboardList,
      },
      {
        title: "Sales Pipeline",
        href: "/dashboard/crm/pipeline",
        icon: TrendingUp,
      },
      {
        title: "Referrals",
        href: "/dashboard/crm/referrals",
        icon: Users,
      },
    ],
  },

  // FINANCE
  {
    title: "Finance",
    icon: Wallet,
    children: [
      {
        title: "Payments",
        href: "/dashboard/finance/payments",
        icon: CreditCard,
      },
      {
        title: "Invoices",
        href: "/dashboard/finance/invoices",
        icon: Receipt,
      },
      {
        title: "Expenses",
        href: "/dashboard/finance/expenses",
        icon: Calculator,
      },
      {
        title: "Commissions",
        href: "/dashboard/finance/commissions",
        icon: TrendingUp,
      },
      {
        title: "Coupons",
        href: "/dashboard/finance/coupons",
        icon: Ticket,
      },
      {
        title: "Coupon Usage",
        href: "/dashboard/finance/coupon-usage",
        icon: ShoppingBag,
      },
      {
        title: "Wallets",
        href: "/dashboard/finance/wallets",
        icon: Wallet,
      },
      {
        title: "Wallet Transactions",
        href: "/dashboard/finance/wallet-transactions",
        icon: Receipt,
      },
      {
        title: "Withdrawals",
        href: "/dashboard/finance/withdrawals",
        icon: CreditCard,
      },
    ],
  },

  // ACCOUNTING
  {
    title: "Accounting",
    icon: Calculator,
    children: [
      {
        title: "Ledger Accounts",
        href: "/dashboard/accounting/ledger",
        icon: Landmark,
      },
      {
        title: "Journal Entries",
        href: "/dashboard/accounting/journal-entries",
        icon: NotebookTabs,
      },
      {
        title: "Journal Lines",
        href: "/dashboard/accounting/journal-lines",
        icon: FileText,
      },
      {
        title: "Financial Reports",
        href: "/dashboard/accounting/reports",
        icon: FileBarChart,
      },
    ],
  },

  // USERS
  {
    title: "Users & Staff",
    icon: UserCog,
    children: [
      {
        title: "All Users",
        href: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Employees",
        href: "/dashboard/users/employees",
        icon: UserCog,
      },
      {
        title: "Branches",
        href: "/dashboard/users/branches",
        icon: Building2,
      },
      {
        title: "Roles & Permissions",
        href: "/dashboard/users/roles",
        icon: ShieldCheck,
      },
    ],
  },

  // SUPPORT
  {
    title: "Support",
    icon: LifeBuoy,
    children: [
      {
        title: "Support Tickets",
        href: "/dashboard/support",
        icon: LifeBuoy,
      },
      {
        title: "Support Messages",
        href: "/dashboard/support/messages",
        icon: MessageSquare,
      },
      {
        title: "Notifications",
        href: "/dashboard/notifications",
        icon: Bell,
      },
    ],
  },

  // AI
  {
    title: "AI Travel",
    icon: Bot,
    children: [
      {
        title: "AI Trips",
        href: "/dashboard/ai/trips",
        icon: Bot,
      },
      {
        title: "AI Itineraries",
        href: "/dashboard/ai/itineraries",
        icon: NotebookTabs,
      },
    ],
  },

  // CONTENT
  {
    title: "Content & CMS",
    icon: BookOpen,
    children: [
      {
        title: "Blog Posts",
        href: "/dashboard/content/blog",
        icon: FileText,
      },
      {
        title: "Blog Categories",
        href: "/dashboard/content/blog/categories",
        icon: BookOpen,
      },
      {
        title: "CMS Pages",
        href: "/dashboard/content/pages",
        icon: FileText,
      },
      {
        title: "Banners",
        href: "/dashboard/content/banners",
        icon: Megaphone,
      },
      {
        title: "FAQs",
        href: "/dashboard/content/faqs",
        icon: MessageSquare,
      },
    ],
  },

  // WEBSITE
  {
    title: "Website",
    icon: Globe2,
    children: [
      {
        title: "Homepage",
        href: "/dashboard/website/homepage",
        icon: LayoutDashboard,
      },
      {
        title: "Website Settings",
        href: "/dashboard/website/settings",
        icon: Settings,
      },
      {
        title: "System Settings",
        href: "/dashboard/website/system-settings",
        icon: Settings,
      },
      {
        title: "Contact Messages",
        href: "/dashboard/website/messages",
        icon: MessageSquare,
      },
    ],
  },

  // REPORTS
  {
    title: "Reports",
    icon: BarChart3,
    children: [
      {
        title: "Sales Reports",
        href: "/dashboard/reports/sales",
        icon: TrendingUp,
      },
      {
        title: "Booking Reports",
        href: "/dashboard/reports/bookings",
        icon: FileBarChart,
      },
      {
        title: "Tour Reports",
        href: "/dashboard/reports/tours",
        icon: Globe2,
      },
      {
        title: "Ticket Reports",
        href: "/dashboard/reports/tickets",
        icon: Plane,
      },
      {
        title: "Visa Reports",
        href: "/dashboard/reports/visa",
        icon: FileCheck2,
      },
      {
        title: "Financial Reports",
        href: "/dashboard/reports/financial",
        icon: ChartNoAxesCombined,
      },
    ],
  },

  // SECURITY
  {
    title: "Security",
    icon: ShieldCheck,
    children: [
      {
        title: "Audit Logs",
        href: "/dashboard/security/audit-logs",
        icon: ShieldCheck,
      },
    ],
  },
];