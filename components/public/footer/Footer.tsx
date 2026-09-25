import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "AI Trip Planner", href: "/ai-trip-planner" },
  { label: "Air Ticket", href: "/air-ticket" },
  { label: "Visa", href: "/visa" },
];

const supportLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B2533] text-white">
      {/* Newsletter CTA */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 rounded-3xl bg-white/5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#F4A91A]">
                Stay Updated
              </p>

              <h3 className="text-2xl font-bold md:text-3xl">
                Get travel inspiration in your inbox
              </h3>

              <p className="mt-2 max-w-xl text-sm text-white/65">
                Get exclusive tour offers, travel tips and the latest SB Flight
                updates.
              </p>
            </div>

            <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 flex-1 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#239CC0]"
              />

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#F4A91A] px-6 text-sm font-semibold text-[#0B2533] transition hover:bg-[#D98D00]"
              >
                Subscribe
                <ArrowRight size={17} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="SB Flight"
                width={150}
                height={55}
                className="h-auto w-[150px] object-contain"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Your trusted travel partner for air tickets, international tours,
              tourist visas and personalized travel experiences.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              <SocialIcon href="#" label="Facebook">
                <FaFacebookF size={17} />
              </SocialIcon>

              <SocialIcon href="#" label="Instagram">
                <FaInstagram size={18} />
              </SocialIcon>

              <SocialIcon href="#" label="YouTube">
                <FaYoutube size={18} />
              </SocialIcon>

              <SocialIcon href="#" label="LinkedIn">
                <FaLinkedinIn size={17} />
              </SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition hover:text-[#239CC0]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h4>

            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition hover:text-[#239CC0]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>

            <div className="space-y-5">
              <ContactItem
                icon={<MapPin size={18} />}
                text="Uttara, Dhaka, Bangladesh"
              />

              <ContactItem
                icon={<Phone size={18} />}
                text="01521-572739"
                href="tel:+8801521572739"
              />

              <ContactItem
                icon={<Phone size={18} />}
                text="01347-457553"
                href="tel:+8801347457553"
              />

              <ContactItem
                icon={<Mail size={18} />}
                text="info@sbflight.com"
                href="mailto:info@sbflight.com"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-white/50 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} SB Flight. All rights reserved.</p>

          <div className="flex gap-5">
            <Link
              href="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>

            <Link href="/refund-policy" className="transition hover:text-white">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60 transition hover:bg-[#239CC0] hover:text-white"
    >
      {children}
    </a>
  );
}

function ContactItem({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-[#239CC0]">{icon}</span>
      <span className="text-sm leading-6 text-white/60">{text}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block transition hover:text-white">
        {content}
      </a>
    );
  }

  return content;
}
