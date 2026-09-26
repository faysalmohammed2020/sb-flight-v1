"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";

import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";

type DashboardHeaderProps = {
  user: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    role?: string | null;
    image?: string | null;
  };

  onMenuClick: () => void;
};

export default function DashboardHeader({
  user,
  onMenuClick,
}: DashboardHeaderProps) {
  const [profileOpen, setProfileOpen] =
    useState(false);

  const getInitials = () => {
    if (!user.name) return "SB";

    return user.name
      .split(" ")
      .map((name) => name.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const handleSignOut = async () => {
    setProfileOpen(false);

    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <header className="dashboard-header">
      <div
        className="
          flex h-full items-center
          justify-between gap-4
          px-4 md:px-6
        "
      >
        {/* Left */}
        <div
          className="
            flex min-w-0 flex-1
            items-center gap-3
          "
        >
          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            onClick={onMenuClick}
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              border border-[var(--border)]
              bg-white
              text-[var(--navy)]
              shadow-sm
              transition
              hover:bg-[var(--primary-light)]
              hover:text-[var(--primary)]
              lg:hidden
            "
            aria-label="Open dashboard menu"
            aria-controls="dashboard-sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop Search */}
          <div
            className="
              relative hidden w-full
              max-w-[420px] md:block
            "
          >
            <Search
              size={17}
              className="
                absolute left-3 top-1/2
                -translate-y-1/2
                text-[var(--text-muted)]
              "
            />

            <input
              type="search"
              placeholder="Search bookings, customers, tours..."
              className="
                dashboard-header-search
                h-10 w-full
                pl-10 pr-4
                text-sm
              "
            />
          </div>
        </div>

        {/* Right */}
        <div
          className="
            flex items-center
            gap-1 md:gap-2
          "
        >
          {/* Mobile Search */}
          <button
            type="button"
            className="
              dashboard-header-icon
              md:hidden
            "
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          {/* Notifications */}
          <Link
            href="/dashboard/notifications"
            className="
              dashboard-header-icon
              relative
            "
            aria-label="Notifications"
          >
            <Bell size={19} />

            <span
              className="
                dashboard-notification-badge
              "
            />
          </Link>

          {/* Settings */}
          <Link
            href="/dashboard/settings"
            className="
              dashboard-header-icon
              hidden sm:inline-flex
            "
            aria-label="Settings"
          >
            <Settings size={19} />
          </Link>

          <div
            className="
              mx-1 hidden h-7 w-px
              bg-[var(--border)]
              sm:block
            "
          />

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setProfileOpen(
                  (prev) => !prev
                )
              }
              className="
                dashboard-header-profile
              "
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              {/* Avatar */}
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={36}
                  height={36}
                  className="
                    h-9 w-9
                    rounded-full
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    dashboard-header-avatar
                  "
                >
                  {getInitials()}
                </div>
              )}

              {/* User Info */}
              <div
                className="
                  hidden min-w-0
                  text-left md:block
                "
              >
                <p
                  className="
                    max-w-[150px]
                    truncate text-sm
                    font-semibold
                    text-[var(--text-primary)]
                  "
                >
                  {user.name || "SB User"}
                </p>

                <p
                  className="
                    max-w-[150px]
                    truncate text-[10px]
                    font-medium
                    uppercase tracking-wide
                    text-[var(--text-muted)]
                  "
                >
                  {formatRole(user.role)}
                </p>
              </div>

              <ChevronDown
                size={15}
                className={`
                  hidden
                  text-[var(--text-muted)]
                  transition-transform
                  md:block
                  ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close profile menu"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                  className="
                    fixed inset-0 z-40
                    cursor-default
                    bg-transparent
                  "
                />

                <div
                  className="
                    absolute right-0
                    top-[calc(100%+10px)]
                    z-50 w-72
                    overflow-hidden
                    rounded-2xl
                    border border-[var(--border)]
                    bg-white
                    shadow-xl
                  "
                  role="menu"
                >
                  {/* User Info */}
                  <div
                    className="
                      border-b
                      border-[var(--border)]
                      bg-[var(--surface-soft)]
                      p-4
                    "
                  >
                    <div
                      className="
                        flex items-center gap-3
                      "
                    >
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={
                            user.name ||
                            "User"
                          }
                          width={44}
                          height={44}
                          className="
                            h-11 w-11
                            rounded-full
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex h-11 w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[var(--primary)]
                            text-sm font-bold
                            text-white
                          "
                        >
                          {getInitials()}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p
                          className="
                            truncate text-sm
                            font-semibold
                            text-[var(--text-primary)]
                          "
                        >
                          {user.name ||
                            "SB User"}
                        </p>

                        <p
                          className="
                            truncate text-xs
                            text-[var(--text-muted)]
                          "
                        >
                          {user.email ||
                            "No email"}
                        </p>

                        <span
                          className="
                            mt-1 inline-flex
                            rounded-full
                            bg-[var(--primary-light)]
                            px-2 py-0.5
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-wide
                            text-[var(--primary-dark)]
                          "
                        >
                          {formatRole(
                            user.role
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="p-2">
                    <Link
                      href="/dashboard/profile"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="
                        flex items-center gap-3
                        rounded-xl px-3 py-2.5
                        text-sm
                        text-[var(--text-secondary)]
                        transition
                        hover:bg-[var(--surface-soft)]
                        hover:text-[var(--primary)]
                      "
                      role="menuitem"
                    >
                      <User size={17} />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      href="/dashboard/settings"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="
                        flex items-center gap-3
                        rounded-xl px-3 py-2.5
                        text-sm
                        text-[var(--text-secondary)]
                        transition
                        hover:bg-[var(--surface-soft)]
                        hover:text-[var(--primary)]
                      "
                      role="menuitem"
                    >
                      <Settings size={17} />
                      <span>Settings</span>
                    </Link>

                    <Link
                      href="/dashboard/notifications"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="
                        flex items-center gap-3
                        rounded-xl px-3 py-2.5
                        text-sm
                        text-[var(--text-secondary)]
                        transition
                        hover:bg-[var(--surface-soft)]
                        hover:text-[var(--primary)]
                      "
                      role="menuitem"
                    >
                      <Bell size={17} />
                      <span>
                        Notifications
                      </span>
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div
                    className="
                      border-t
                      border-[var(--border)]
                      p-2
                    "
                  >
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="
                        flex w-full
                        items-center gap-3
                        rounded-xl px-3 py-2.5
                        text-sm font-medium
                        text-red-600
                        transition
                        hover:bg-red-50
                      "
                      role="menuitem"
                    >
                      <LogOut size={17} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function formatRole(role?: string | null) {
  if (!role) return "USER";

  return role
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}