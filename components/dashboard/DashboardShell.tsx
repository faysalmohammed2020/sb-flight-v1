"use client";

import { useEffect, useState } from "react";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

type User = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
};

interface DashboardShellProps {
  user: User;
  children: React.ReactNode;
}

export default function DashboardShell({
  user,
  children,
}: DashboardShellProps) {
  const [
    mobileSidebarOpen,
    setMobileSidebarOpen,
  ] = useState(false);

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <DashboardSidebar
        user={user}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() =>
          setMobileSidebarOpen(false)
        }
      />

      {/* Main Area */}
      <div className="lg:pl-72">
        {/* Header */}
        <DashboardHeader
          user={user}
          onMenuClick={() =>
            setMobileSidebarOpen(true)
          }
        />

        {/* Content */}
        <main
          className="
            min-h-[calc(100vh-64px)]
            p-4 md:p-6 lg:p-8
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}