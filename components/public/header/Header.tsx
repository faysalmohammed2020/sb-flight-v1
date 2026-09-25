"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Plane, ChevronDown } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  logo?: string;
  mobileLogo?: string;
  siteName?: string;
}

const navigation = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "Air Ticket", href: "/air-ticket" },
  { label: "Visa", href: "/visa" },
  { label: "Blog", href: "/blog" },
];

export default function Header({
  logo = "/logo.png",
  siteName = "SB Flight",
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 lg:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt={siteName}
            width={150}
            height={70}
            className="h-auto w-[135px] object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-[14px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-3 lg:flex">

          <Link
            href="/ai-trip-planner"
            className="flex items-center gap-2 rounded-lg border border-[#239CC0] px-4 py-2.5 text-sm font-semibold text-[#087EA3] transition hover:bg-[#E8F7FB]"
          >
            <Plane size={16} />
            Plan Trip
          </Link>

          <Link
            href="/login"
            className="btn-primary px-5 py-2.5 text-sm"
          >
            Login
          </Link>

        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-[#0B2533] lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-[#EAF1F4] bg-white px-4 py-5 lg:hidden">
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-[#E8F7FB]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/ai-trip-planner"
              className="btn-secondary mt-2"
            >
              Plan My Trip
            </Link>

            <Link
              href="/login"
              className="btn-primary"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}