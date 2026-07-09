import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadlineLine1",
      title: "Hero Headline — Line 1",
      type: "string",
    }),
    defineField({
      name: "heroHeadlineLine2",
      title: "Hero Headline — Line 2 (gradient)",
      type: "string",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
    }),
    defineField({
      name: "heroCtaPrimary",
      title: "Hero Primary CTA Label",
      type: "string",
    }),
    defineField({
      name: "heroCtaSecondary",
      title: "Hero Secondary CTA Label",
      type: "string",
    }),
    defineField({
      name: "statsItems",
      title: "Trust Bar Stats",
      type: "array",
      of: [
        {
          type: "object",
          name: "statItem",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "whatWeDoHeadlinePlain",
      title: "What We Do Headline — Plain Text",
      type: "string",
    }),
    defineField({
      name: "whatWeDoHeadlineHighlight",
      title: "What We Do Headline — Gradient Highlight",
      type: "string",
    }),
    defineField({
      name: "whatWeDoSubheadline",
      title: "What We Do Subheadline",
      type: "text",
    }),
  ],
});
