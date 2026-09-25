import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AITripPlannerCTA() {
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">

        <div className="relative overflow-hidden rounded-[28px] bg-[#0B2533] p-8 sm:p-12 lg:p-16">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#239CC0]/20 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#F4A91A]/15 blur-3xl" />

          <div className="relative max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              <Sparkles size={16} className="text-[#F4A91A]" />
              AI Powered Travel Planning
            </div>

            <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-5xl">
              Your perfect trip,
              <br />
              planned intelligently.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
              Tell us your destination, travel dates, budget and interests.
              Our AI-powered planner will help create a personalized itinerary.
            </p>

            <Link
              href="/ai-trip-planner"
              className="btn-secondary mt-8"
            >
              Start Planning
              <ArrowRight size={18} />
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}