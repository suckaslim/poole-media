export const homepageQuery = `*[_type == "homepage"][0]{
  heroHeadlineLine1,
  heroHeadlineLine2,
  heroSubheadline,
  heroCtaPrimary,
  heroCtaSecondary,
  statsItems[]{value, label},
  whatWeDoHeadlinePlain,
  whatWeDoHeadlineHighlight,
  whatWeDoSubheadline
}`;

export type HomepageData = {
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroSubheadline: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  statsItems: Array<{ value: string; label: string }>;
  whatWeDoHeadlinePlain: string;
  whatWeDoHeadlineHighlight: string;
  whatWeDoSubheadline: string;
};

export const servicesPageQuery = `*[_type == "servicesPage"][0]{
  pageHeadlinePlain,
  pageHeadlineHighlight,
  pageSubheadline,
  services[]{id, name, tagline, price, priceLabel, description, features, ideal}
}`;

export type ServicesPageService = {
  id: "website" | "agentic-seo" | "ai-content" | "site-maintenance";
  name: string;
  tagline: string;
  price: string;
  priceLabel: string;
  description: string;
  features: string[];
  ideal: string;
};

export type ServicesPageData = {
  pageHeadlinePlain: string;
  pageHeadlineHighlight: string;
  pageSubheadline: string;
  services: ServicesPageService[];
};

export const comingSoonServiceQuery = `*[_type == "comingSoonService"][0]{
  sectionEyebrow,
  sectionHeadline,
  sectionSubheadline,
  serviceName,
  descriptionParagraphs,
  waitlistPrompt
}`;

export type ComingSoonServiceData = {
  sectionEyebrow: string;
  sectionHeadline: string;
  sectionSubheadline: string;
  serviceName: string;
  descriptionParagraphs: string[];
  waitlistPrompt: string;
};

const caseStudyProjection = `{
  _id,
  _createdAt,
  clientName,
  "slug": slug.current,
  tagline,
  description,
  results,
  image,
  featured
}`;

export const caseStudiesQuery = `*[_type == "caseStudy"] | order(_createdAt desc)${caseStudyProjection}`;

export const featuredCaseStudiesQuery = `*[_type == "caseStudy" && featured == true] | order(_createdAt asc)${caseStudyProjection}`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0]${caseStudyProjection}`;

export const caseStudySlugsQuery = `*[_type == "caseStudy"]{"slug": slug.current}`;

export type SanityImage = {
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
};

export type CaseStudy = {
  _id: string;
  _createdAt: string;
  clientName: string;
  slug: string;
  tagline: string;
  description: string;
  results: string;
  image: SanityImage | null;
  featured: boolean;
};

export const navigationQuery = `*[_type == "navigation"][0]{
  footerDescription,
  footerCopyright
}`;

export type NavigationData = {
  footerDescription: string;
  footerCopyright: string;
};
