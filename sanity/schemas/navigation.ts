import { defineField, defineType } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation & Footer",
  type: "document",
  fields: [
    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
    }),
    defineField({
      name: "footerCopyright",
      title: "Footer Copyright (use literal {year} as a placeholder)",
      type: "string",
      description:
        'The literal text "{year}" will be replaced with the current year at render time, e.g. "© {year} Poole Media. All rights reserved."',
    }),
  ],
});
