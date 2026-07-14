import { defineField, defineType } from "sanity";

export default defineType({
  name: "pricing",
  title: "Pricing Page",
  type: "document",
  fields: [
    defineField({
      name: "pageHeadline",
      title: "Page Headline",
      type: "string",
    }),
    defineField({
      name: "pageSubheadline",
      title: "Page Subheadline",
      type: "text",
    }),
    defineField({
      name: "bundlesHeadline",
      title: "Bundles Section Headline",
      type: "string",
    }),
    defineField({
      name: "bundlesSubheadline",
      title: "Bundles Section Subheadline",
      type: "text",
    }),
    defineField({
      name: "bundles",
      title: "Bundles",
      type: "array",
      of: [
        {
          type: "object",
          name: "bundle",
          fields: [
            defineField({
              name: "bundleName",
              title: "Bundle Name",
              type: "string",
            }),
            defineField({ name: "tagline", title: "Tagline", type: "string" }),
            defineField({
              name: "includes",
              title: "Includes",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "monthlyTotal",
              title: "Monthly Total",
              type: "string",
            }),
            defineField({ name: "note", title: "Note", type: "string" }),
          ],
          preview: {
            select: { title: "bundleName", subtitle: "monthlyTotal" },
          },
        },
      ],
    }),
    defineField({
      name: "faqHeadline",
      title: "FAQ Section Headline",
      type: "string",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          name: "faq",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text" }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
    defineField({
      name: "bottomCtaHeadline",
      title: "Bottom CTA Headline",
      type: "string",
    }),
    defineField({
      name: "bottomCtaBody",
      title: "Bottom CTA Body",
      type: "text",
    }),
  ],
});
