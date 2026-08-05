// Blog domain types. Sourced from Sanity via GROQ queries in
// sanity/lib/queries.ts — see the corresponding query for each type's shape.

export type SanityImage = {
  asset: { _ref: string };
  hotspot?: object;
  crop?: object;
  alt?: string;
};

export type Category = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string | null;
  color: string | null;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type BlogAuthorSummary = {
  name: string;
  photo: SanityImage | null;
};

export type BlogAuthor = BlogAuthorSummary & {
  slug: { current: string };
  bio: string | null;
  role: string | null;
  email: string | null;
  linkedin: string | null;
  twitter: string | null;
};

export type PortableTextBlock = {
  _type: string;
  _key: string;
  [key: string]: unknown;
};

export type BlogIndexPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string | null;
  coverImage: SanityImage | null;
  publishedAt: string | null;
  readingTime: number | null;
  featured: boolean;
  categories: Category[];
  author: BlogAuthorSummary | null;
};

export type BlogPost = BlogIndexPost & {
  body: PortableTextBlock[] | null;
  faq: FaqItem[] | null;
  keyTakeaways: string[] | null;
  summary: string | null;
  targetKeyword: string | null;
  relatedKeywords: string[] | null;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: SanityImage | null;
  canonicalUrl: string | null;
  noIndex: boolean;
  enableArticleSchema: boolean;
  enableFaqSchema: boolean;
  author: BlogAuthor | null;
  relatedPosts: BlogIndexPost[] | null;
  updatedAt: string | null;
};
