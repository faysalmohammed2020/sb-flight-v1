import {
  ShieldCheck,
  Headphones,
  BadgeCheck,
  WalletCards,
} from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Trusted Travel Support",
    description:
      "Professional assistance throughout your travel planning and booking process.",
  },
  {
    icon: WalletCards,
    title: "Competitive Pricing",
    description:
      "We focus on transparent and competitive travel pricing.",
  },
  {
    icon: BadgeCheck,
    title: "Curated Experiences",
    description:
      "Carefully designed tour packages based on real travel requirements.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Get assistance before, during and after your booking.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section bg-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 lg:grid-cols-2 lg:px-6">

        <div>
          <div className="brand-divider mb-4" />

          <h2 className="section-title text-3xl sm:text-4xl">
            Travel With Confidence
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-[#526A74]">
            At SB Flight, our goal is to make travel planning simpler,
            more transparent and more convenient for every traveler.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            {items.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#EAF1F4] p-5"
                >
                  <Icon
                    size={26}
                    className="text-[#239CC0]"
                  />

                  <h3 className="mt-4 font-bold text-[#0B2533]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#526A74]">
                    {item.description}
                  </p>
                </div>
              );
            })}

          </div>
        </div>

        <div className="relative min-h-[450px] overflow-hidden rounded-3xl bg-[#0B2533]">

          <div className="absolute inset-0 bg-gradient-to-br from-[#239CC0]/30 to-[#F4A91A]/20" />

          <div className="relative flex h-full items-center p-10">

            <div>
              <span className="rounded-full bg-[#F4A91A] px-4 py-2 text-xs font-bold text-[#0B2533]">
                SB FLIGHT
              </span>

              <h3 className="mt-6 text-4xl font-extrabold text-white">
                Your Journey.
                <br />
                Our Expertise.
              </h3>

              <p className="mt-5 max-w-md leading-7 text-white/70">
                From discovering destinations to planning your itinerary,
                we're building a smarter way to travel.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}