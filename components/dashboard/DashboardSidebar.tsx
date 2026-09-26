"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";

import { dashboardNavigation } from "./dashboard-navigation";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
};

interface DashboardSidebarProps {
  user: User;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function DashboardSidebar({
  user,
  mobileOpen,
  onMobileClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onMobileClose}
          className="
            fixed inset-0 z-[55]
            bg-black/50 backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        id="dashboard-sidebar"
        className={`
          dashboard-sidebar
          fixed inset-y-0 left-0 z-[60]
          flex w-[280px] max-w-[85vw] flex-col
          shadow-2xl
          transition-transform duration-300 ease-in-out

          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}

          lg:z-30
          lg:w-72
          lg:translate-x-0
          lg:shadow-none
        `}
      >
        {/* Logo */}
        <div
          className="
            dashboard-sidebar-logo
            relative flex h-16 shrink-0
            items-center justify-between px-4
          "
        >
          <Link
            href="/dashboard"
            onClick={onMobileClose}
            className="flex min-w-0 items-center gap-3"
          >
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl bg-[#239CC0]
                font-bold text-white shadow-sm
              "
            >
              SB
            </div>

            <div className="min-w-0">
              <div className="truncate text-lg font-bold text-white">
                SB Flight
              </div>

              <div className="truncate text-[11px] text-[#8fb7c4]">
                Travel Management
              </div>
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onMobileClose}
            className="
              ml-2 flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg text-[#8fb7c4]
              transition hover:bg-white/10
              hover:text-white lg:hidden
            "
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="
            dashboard-sidebar-scroll
            flex-1 overflow-y-auto
            px-3 py-4
          "
        >
          <div className="space-y-1">
            {dashboardNavigation.map((item) => (
              <SidebarItem
                key={item.title}
                item={item}
                pathname={pathname}
                onNavigate={onMobileClose}
              />
            ))}
          </div>
        </nav>

        {/* User Card */}
        <div className="shrink-0 border-t border-white/10 p-3">
          <div className="rounded-xl bg-white/5 px-3 py-3">
            <div className="flex items-center gap-3">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="
                    h-9 w-9 shrink-0
                    rounded-full object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-full bg-[#239CC0]
                    text-xs font-bold text-white
                  "
                >
                  {getInitials(user.name)}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {user.name || "SB User"}
                </p>

                <p
                  className="
                    truncate text-[10px]
                    uppercase tracking-wide
                    text-[#8fb7c4]
                  "
                >
                  {formatRole(user.role)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({
  item,
  pathname,
  onNavigate,
}: {
  item: (typeof dashboardNavigation)[number];
  pathname: string;
  onNavigate: () => void;
}) {
  const hasChildren =
    !!item.children && item.children.length > 0;

  const activeChild = item.children
    ?.filter(
      (child) =>
        child.href &&
        (pathname === child.href ||
          pathname.startsWith(`${child.href}/`))
    )
    .reduce<(typeof item.children)[number] | undefined>(
      (best, child) =>
        !best || child.href!.length > best.href!.length
          ? child
          : best,
      undefined
    );
  const activeChildHref = activeChild?.href;
  const isChildActive = Boolean(activeChildHref);

  const [openOverride, setOpenOverride] = useState<{
    pathname: string;
    open: boolean;
  } | null>(null);
  const open = openOverride?.pathname === pathname
    ? openOverride.open
    : isChildActive;

  const Icon = item.icon;

  if (!hasChildren) {
    const active =
      pathname === item.href ||
      (!!item.href &&
        item.href !== "/dashboard" &&
        pathname.startsWith(`${item.href}/`));

    return (
      <Link
        href={item.href!}
        onClick={onNavigate}
        className={`dashboard-sidebar-link ${
          active ? "active" : ""
        }`}
      >
        <Icon
          className="h-[18px] w-[18px] shrink-0"
          strokeWidth={1.8}
        />

        <span className="min-w-0 flex-1 truncate">
          {item.title}
        </span>
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpenOverride({ pathname, open: !open })}
        className={`
          dashboard-sidebar-link
          w-full
          ${isChildActive ? "active" : ""}
        `}
        aria-expanded={open}
      >
        <span className="flex min-w-0 flex-1 items-center gap-3">
          <Icon
            className="h-[18px] w-[18px] shrink-0"
            strokeWidth={1.8}
          />

          <span className="truncate">
            {item.title}
          </span>
        </span>

        {open ? (
          <ChevronDown className="h-4 w-4 shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0" />
        )}
      </button>

      {open && (
        <div
          className="
            dashboard-sidebar-submenu
            ml-4 mt-1 space-y-1
            border-l border-white/10
            pl-2
          "
        >
          {item.children?.map((child) => {
            const active =
              child.href === activeChildHref;

            const ChildIcon = child.icon;

            return (
              <Link
                key={child.href}
                href={child.href!}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={`
                  dashboard-sidebar-link
                  ${active ? "active" : ""}
                `}
              >
                <ChildIcon
                  className="h-4 w-4 shrink-0"
                  strokeWidth={1.8}
                />

                <span className="min-w-0 flex-1 truncate">
                  {child.title}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getInitials(name?: string | null) {
  if (!name) return "SB";

  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatRole(role?: string | null) {
  if (!role) return "USER";

  return role
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}
