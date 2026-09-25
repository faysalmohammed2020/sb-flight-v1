import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

interface Tour {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  coverImage?: string | null;
  durationDays: number;
  durationNights: number;
  sellingPrice?: any;
  currency: string;
}

interface Props {
  tours: Tour[];
  title?: string;
  subtitle?: string;
}

export default function FeaturedTours({
  tours,
  title = "Explore Our Popular Tours",
  subtitle = "Discover carefully designed journeys for unforgettable travel experiences.",
}: Props) {
  return (
    <section className="section bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <div className="brand-divider mb-4" />

            <h2 className="section-title text-3xl sm:text-4xl">
              {title}
            </h2>

            <p className="section-subtitle mt-3">
              {subtitle}
            </p>
          </div>

          <Link
            href="/tours"
            className="group flex items-center gap-2 font-semibold text-[#087EA3]"
          >
            View All Tours
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </Link>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {tours.map((tour) => (
            <Link
              href={`/tours/${tour.slug}`}
              key={tour.id}
              className="tour-card"
            >

              <div className="tour-image relative aspect-[16/10]">

                <Image
                  src={tour.coverImage || "/images/tour-placeholder.jpg"}
                  alt={tour.name}
                  fill
                  className="object-cover"
                />

                <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#087EA3] shadow">
                  {tour.durationDays} Days / {tour.durationNights} Nights
                </div>

              </div>

              <div className="p-5">

                <div className="mb-3 flex items-center gap-2 text-xs text-[#7C9199]">
                  <CalendarDays size={14} />
                  {tour.durationDays} Days Journey
                </div>

                <h3 className="text-xl font-bold text-[#0B2533]">
                  {tour.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#526A74]">
                  {tour.shortDescription}
                </p>

                <div className="mt-5 flex items-end justify-between border-t border-[#EAF1F4] pt-4">

                  <div>
                    <span className="text-xs text-[#7C9199]">
                      Starting from
                    </span>

                    <p className="price text-xl">
                      ৳{Number(tour.sellingPrice || 0).toLocaleString()}
                    </p>
                  </div>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F7FB] text-[#239CC0]">
                    <ArrowRight size={18} />
                  </span>

                </div>

              </div>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}