import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "@/sanity/lib/schema";

export default defineConfig({
  name: "default",
  title: "Poole Media",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [structureTool()],
  schema,
});
