import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "aeo", title: "AEO / AI Search" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96, isUnique: () => true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
      group: "content",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "content",
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      group: "content",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "150–300 characters recommended",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      group: "content",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "object",
          name: "codeBlock",
          title: "Code Block",
          fields: [
            defineField({
              name: "language",
              title: "Language",
              type: "string",
              initialValue: "text",
            }),
            defineField({
              name: "code",
              title: "Code",
              type: "text",
            }),
          ],
          preview: {
            select: { title: "language", subtitle: "code" },
          },
        }),
        defineArrayMember({
          type: "object",
          name: "callout",
          title: "Callout",
          fields: [
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Info", value: "info" },
                  { title: "Warning", value: "warning" },
                  { title: "Tip", value: "tip" },
                ],
              },
              initialValue: "info",
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "text",
            }),
          ],
          preview: {
            select: { title: "type", subtitle: "content" },
          },
        }),
        defineArrayMember({
          type: "object",
          name: "imageBlock",
          title: "Image",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "caption", media: "image" },
          },
        }),
        defineArrayMember({
          type: "object",
          name: "youtubeEmbed",
          title: "YouTube Embed",
          fields: [
            defineField({
              name: "url",
              title: "YouTube URL",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "url" },
          },
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      group: "content",
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      group: "content",
    }),

    // AEO / AI search optimization fields
    defineField({
      name: "summary",
      title: "AI Summary",
      description:
        "Short 1-2 sentence AI-friendly summary of the post. Used in JSON-LD and as context for AI search engines.",
      type: "text",
      group: "aeo",
    }),
    defineField({
      name: "keyTakeaways",
      title: "Key Takeaways",
      description: "Bullet points summarizing the post.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "aeo",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      group: "aeo",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text" }),
          ],
          preview: {
            select: { title: "question" },
          },
        }),
      ],
    }),
    defineField({
      name: "targetKeyword",
      title: "Target Keyword",
      description: "Primary keyword this post targets",
      type: "string",
      group: "aeo",
    }),
    defineField({
      name: "relatedKeywords",
      title: "Related Keywords",
      description: "Secondary/LSI keywords",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "aeo",
    }),

    // Related content
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
      group: "content",
    }),

    // SEO fields
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      description: "Fallback: title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      description: "Fallback: excerpt",
      type: "text",
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "OG Image",
      description: "Fallback: cover image",
      type: "image",
      options: { hotspot: true },
      group: "seo",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      description: "For syndicated content",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
      group: "seo",
    }),

    // JSON-LD flags
    defineField({
      name: "enableArticleSchema",
      title: "Enable Article Schema",
      type: "boolean",
      initialValue: true,
      group: "seo",
    }),
    defineField({
      name: "enableFaqSchema",
      title: "Enable FAQ Schema",
      description: "Auto-enabled if the FAQ array has items",
      type: "boolean",
      initialValue: false,
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt", media: "coverImage" },
  },
});
