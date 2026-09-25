import Link from "next/link";
import {
  Plane,
  Map,
  FileCheck2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Air Ticket",
    description:
      "Domestic and international flight ticket assistance with competitive fares.",
    href: "/air-ticket",
  },
  {
    icon: Map,
    title: "Tour Packages",
    description:
      "Curated group, private and customized international travel experiences.",
    href: "/tours",
  },
  {
    icon: FileCheck2,
    title: "Tourist Visa",
    description:
      "Professional visa processing support with document guidance.",
    href: "/visa",
  },
  {
    icon: Sparkles,
    title: "AI Trip Planner",
    description:
      "Create a personalized travel itinerary based on your destination, budget and interests.",
    href: "/ai-trip-planner",
  },
];

export default function TravelServices() {
  return (
    <section className="section bg-[#F7FAFC]">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">

        <div className="mx-auto mb-12 max-w-2xl text-center">

          <div className="brand-divider mx-auto mb-4" />

          <h2 className="section-title text-3xl sm:text-4xl">
            Everything You Need to Travel
          </h2>

          <p className="mt-4 text-[#526A74]">
            From flight tickets to complete tour planning, SB Flight helps
            you manage your journey from one place.
          </p>

        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-[#DCE8ED] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#B9E2ED] hover:shadow-lg"
              >

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#E8F7FB] text-[#239CC0] transition group-hover:bg-[#239CC0] group-hover:text-white">
                  <Icon size={27} />
                </div>

                <h3 className="text-lg font-bold text-[#0B2533]">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#526A74]">
                  {service.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#087EA3]">
                  Explore
                  <ArrowUpRight size={16} />
                </div>

              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}