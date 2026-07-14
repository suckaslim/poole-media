import { defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({
      name: "pageHeadlinePlain",
      title: "Page Headline — Plain Text",
      type: "string",
    }),
    defineField({
      name: "pageHeadlineHighlight",
      title: "Page Headline — Gradient Highlight",
      type: "string",
    }),
    defineField({
      name: "pageSubheadline",
      title: "Page Subheadline",
      type: "text",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          name: "service",
          fields: [
            defineField({
              name: "id",
              title: "ID (maps to icon in code — do not change)",
              type: "string",
              options: {
                list: [
                  "website",
                  "agentic-seo",
                  "ai-content",
                  "site-maintenance",
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({
              name: "tagline",
              title: "Tagline (short heading)",
              type: "string",
            }),
            defineField({ name: "price", title: "Price", type: "string" }),
            defineField({
              name: "priceLabel",
              title: "Price Label",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "features",
              title: "Features (bullet list)",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({ name: "ideal", title: "Best For", type: "text" }),
            defineField({
              name: "tiers",
              title: "Pricing Tiers (optional)",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "tier",
                  fields: [
                    defineField({
                      name: "tierName",
                      title: "Tier Name",
                      type: "string",
                    }),
                    defineField({
                      name: "tierPrice",
                      title: "Tier Price",
                      type: "string",
                    }),
                    defineField({
                      name: "tierDescription",
                      title: "Tier Description",
                      type: "text",
                    }),
                  ],
                  preview: {
                    select: { title: "tierName", subtitle: "tierPrice" },
                  },
                },
              ],
            }),
            defineField({
              name: "platformNote",
              title: "Platform Note (optional)",
              type: "text",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
          },
        },
      ],
    }),
  ],
});

export const comingSoonService = defineType({
  name: "comingSoonService",
  title: "Coming Soon Service",
  type: "document",
  fields: [
    defineField({
      name: "sectionEyebrow",
      title: "Section Eyebrow",
      type: "string",
    }),
    defineField({
      name: "sectionHeadline",
      title: "Section Headline",
      type: "string",
    }),
    defineField({
      name: "sectionSubheadline",
      title: "Section Subheadline",
      type: "text",
    }),
    defineField({
      name: "serviceName",
      title: "Service Name",
      type: "string",
    }),
    defineField({
      name: "descriptionParagraphs",
      title: "Description Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "waitlistPrompt",
      title: "Waitlist Prompt",
      type: "string",
    }),
  ],
});
