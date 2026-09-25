import type { Tour, Destination, Review, BlogPost } from "@prisma/client";

export interface HomeHeroData {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  backgroundImage: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

export interface HomeSection {
  id: string;
  key: string;
  title: string;
  subtitle?: string;
  isEnabled: boolean;
  sortOrder: number;
}

export interface HomePageData {
  hero: HomeHeroData;
  sections: HomeSection[];
  featuredTours: Tour[];
  destinations: Destination[];
  reviews: Review[];
  blogPosts: BlogPost[];
}