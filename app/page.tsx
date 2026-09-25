import Header from "@/components/public/header/Header";
import HeroSection from "@/components/public/hero/HeroSection";
import FeaturedTours from "@/components/public/tours/FeaturedTours";
import TravelServices from "@/components/public/services/TravelServices";
import WhyChooseUs from "@/components/public/WhyChooseUs/WhyChooseUs";
import AITripPlannerCTA from "@/components/public/ai-trip-planner/AITripPlannerCTA";
import Footer from "@/components/public/footer/Footer";

export default async function HomePage() {

  /*
   * Later these will come from CMS / Prisma.
   */

  const hero = {
    badge: "Discover. Explore. Experience.",
    title: "Your Journey Starts",
    highlightedTitle: "With SB Flight",
    description:
      "Explore unforgettable destinations, curated tours, flight tickets and visa assistance — all from one trusted travel partner.",
    backgroundImage: "/images/home/hero.jpg",
    primaryButtonText: "Explore Tours",
    primaryButtonLink: "/tours",
    secondaryButtonText: "Plan My Trip",
    secondaryButtonLink: "/ai-trip-planner",
  };

  const tours = [
    {
      id: "1",
      name: "Exclusive Nepal Tour",
      slug: "exclusive-nepal-tour",
      shortDescription:
        "Discover Kathmandu, Pokhara and the breathtaking beauty of Nepal.",
      coverImage: "/images/tours/nepal.jpg",
      durationDays: 6,
      durationNights: 5,
      sellingPrice: 69500,
      currency: "BDT",
    },
    {
      id: "2",
      name: "Mustang Valley Adventure",
      slug: "mustang-valley",
      shortDescription:
        "Experience the dramatic landscapes and hidden beauty of Mustang.",
      coverImage: "/images/tours/mustang.jpg",
      durationDays: 7,
      durationNights: 6,
      sellingPrice: 70000,
      currency: "BDT",
    },
    {
      id: "3",
      name: "Thailand Escape",
      slug: "thailand-escape",
      shortDescription:
        "Enjoy beaches, city life and unforgettable Thai experiences.",
      coverImage: "/images/tours/thailand.jpg",
      durationDays: 5,
      durationNights: 4,
      sellingPrice: 55000,
      currency: "BDT",
    },
  ];

  return (
    <>
      <Header />

      <main>

        <HeroSection {...hero} />

        <FeaturedTours tours={tours} />

        <TravelServices />

        <WhyChooseUs />

        <AITripPlannerCTA />
        <Footer/>



      </main>
    </>
  );
}