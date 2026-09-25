"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plane,
  Building2,
  Map,
  FileText,
  ArrowLeftRight,
  CalendarDays,
  Users,
  Search,
  Sparkles,
  ChevronDown,
} from "lucide-react";

interface HeroSectionProps {
  backgroundImage?: string;
}

export default function HeroSection({ backgroundImage }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState("Flight");
  const [tripType, setTripType] = useState("One Way");

  const tabs = [
    { name: "Flight", icon: Plane },
    { name: "Hotel", icon: Building2 },
    { name: "Tour", icon: Map },
    { name: "Visa", icon: FileText },
  ];

  return (
    <section className="relative min-h-[620px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero3.jpg"
        alt="Travel destination"
        fill
        priority
        className="object-cover scale-105"
      />

      {/* Gradient overlay — deeper, more cinematic */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1533]/70 via-[#111E68]/40 to-transparent" />

      {/* Subtle noise/texture layer */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto min-h-[620px] max-w-[1400px] px-4 pt-[70px]">
        {/* ===== HERO HEADLINE ===== */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[12px] font-medium text-white backdrop-blur-md">
            <Sparkles size={14} className="text-[#FFC800]" />
            <span>Explore the world, your way</span>
          </div>

          <h1 className="text-[36px] font-bold leading-tight text-white md:text-[52px]">
            Where will you{" "}
            <span className="relative inline-block">
              <span className="relative z-10">go next?</span>
              <span className="absolute bottom-1 left-0 z-0 h-[10px] w-full rounded-full bg-[#FFC800]/80" />
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-[520px] text-[15px] text-white/80">
            Search flights, hotels, tours and visas — all in one place.
          </p>
        </div>

        {/* ===== GLASS CARD WRAPPER ===== */}
        <div className="mx-auto max-w-[1180px]">
          {/* Floating Tabs */}
          <div className="relative z-20 mx-auto flex w-fit items-center gap-1 rounded-2xl border border-white/20 bg-white/10 p-1.5 backdrop-blur-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.name;

              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`group relative flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold transition-all duration-300 ${
                    active
                      ? "bg-white text-[#111E68] shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={active ? 2.2 : 1.8}
                    className={
                      active
                        ? "text-[#111E68]"
                        : "text-white/70 group-hover:text-white"
                    }
                  />
                  {tab.name}

                  {active && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-[#FFC800]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Card */}
          <div className="relative mt-5">
            {/* Glow behind card */}
            <div className="absolute -inset-1 rounded-[26px] bg-gradient-to-r from-[#FFC800]/30 via-transparent to-[#294E91]/30 blur-2xl" />

            <div className="relative rounded-[24px] border border-white/60 bg-white/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-8">
              {/* Trip Type Pills */}
              {activeTab === "Flight" && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  {["One Way", "Round Way", "Multi City"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setTripType(type)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                        tripType === type
                          ? "bg-[#111E68] text-white shadow-[0_4px_14px_rgba(17,30,104,0.3)]"
                          : "bg-[#F2F4F8] text-[#777D91] hover:bg-[#E6E9F0]"
                      }`}
                    >
                      <span
                        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 ${
                          tripType === type
                            ? "border-white"
                            : "border-[#C4C8D4]"
                        }`}
                      >
                        {tripType === type && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#FFC800]" />
                        )}
                      </span>
                      {type}
                    </button>
                  ))}
                </div>
              )}

              {/* Fields Grid */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_1fr_1fr_1.1fr]">
                {/* FROM */}
                <div className="group relative flex h-[80px] items-center rounded-2xl border border-[#E0E3E8] bg-white px-4 transition-all hover:border-[#294E91]/40 hover:shadow-[0_4px_20px_rgba(41,78,145,0.08)]">
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#A0A5B5]">
                      From
                    </p>
                    <p className="truncate text-[17px] font-bold text-[#111E68]">
                      Dhaka
                    </p>
                    <p className="truncate text-[10.5px] text-[#8D93A4]">
                      DAC · Hazrat Shahjalal Intl
                    </p>
                  </div>

                  {/* Swap button */}
                  <button className="absolute -right-[19px] top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#111E68] text-white shadow-[0_4px_14px_rgba(17,30,104,0.4)] transition-transform hover:rotate-180 hover:bg-[#294E91]">
                    <ArrowLeftRight size={14} />
                  </button>
                </div>

                {/* TO */}
                <div className="group flex h-[80px] items-center rounded-2xl border border-[#E0E3E8] bg-white px-4 transition-all hover:border-[#294E91]/40 hover:shadow-[0_4px_20px_rgba(41,78,145,0.08)]">
                  <div className="min-w-0 flex-1 pl-2">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#A0A5B5]">
                      To
                    </p>
                    <p className="truncate text-[17px] font-bold text-[#111E68]">
                      Cox's Bazar
                    </p>
                    <p className="truncate text-[10.5px] text-[#8D93A4]">
                      CXB · Cox's Bazar Airport
                    </p>
                  </div>
                </div>

                {/* DEPARTURE */}
                <div className="group flex h-[80px] items-center gap-3 rounded-2xl border border-[#E0E3E8] bg-white px-4 transition-all hover:border-[#294E91]/40 hover:shadow-[0_4px_20px_rgba(41,78,145,0.08)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F4F8] text-[#294E91]">
                    <CalendarDays size={18} strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#A0A5B5]">
                      Departure
                    </p>
                    <p className="text-[15px] font-bold text-[#111E68]">
                      30 Sep 26
                    </p>
                    <p className="text-[10.5px] text-[#8D93A4]">Wednesday</p>
                  </div>
                </div>

                {/* RETURN */}
                <div className="group flex h-[80px] items-center gap-3 rounded-2xl border border-dashed border-[#E0E3E8] bg-[#FAFBFC] px-4 transition-all hover:border-[#294E91]/40">
                  <div className="min-w-0">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#A0A5B5]">
                      Return
                    </p>
                    <p className="text-[13px] font-semibold text-[#111E68]">
                      Add return
                    </p>
                    <p className="text-[10.5px] text-[#8D93A4]">
                      Save up to 25%
                    </p>
                  </div>
                  <ChevronDown
                    size={16}
                    className="ml-auto text-[#A0A5B5]"
                  />
                </div>

                {/* TRAVELER */}
                <div className="group flex h-[80px] items-center gap-3 rounded-2xl border border-[#E0E3E8] bg-white px-4 transition-all hover:border-[#294E91]/40 hover:shadow-[0_4px_20px_rgba(41,78,145,0.08)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F4F8] text-[#294E91]">
                    <Users size={18} strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#A0A5B5]">
                      Traveler
                    </p>
                    <p className="text-[15px] font-bold text-[#111E68]">
                      1 Traveler
                    </p>
                    <p className="text-[10.5px] text-[#8D93A4]">Economy</p>
                  </div>
                  <ChevronDown
                    size={16}
                    className="ml-auto text-[#A0A5B5]"
                  />
                </div>
              </div>

              {/* Search Button — integrated, right-aligned */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="hidden text-[12px] text-[#8D93A4] md:block">
                  ✈️ Free cancellation on most bookings
                </p>

                <button className="group relative flex h-[54px] w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#FFC800] px-10 text-[16px] font-bold text-[#111E68] shadow-[0_8px_24px_rgba(255,200,0,0.4)] transition-all hover:shadow-[0_12px_32px_rgba(255,200,0,0.5)] md:w-auto">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Search size={19} strokeWidth={2.5} />
                  Search Flights
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}