import { defineField, defineType } from "sanity";

export default defineType({
  name: "auditPage",
  title: "Audit Page",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
    }),
    defineField({
      name: "postResultsCtaHeadline",
      title: "Post-Results CTA Headline",
      type: "string",
    }),
    defineField({
      name: "postResultsCtaBody",
      title: "Post-Results CTA Body",
      type: "text",
    }),
  ],
});
