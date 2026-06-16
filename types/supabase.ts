// Auto-generated types will replace this file in Phase 2 after running:
// npx supabase gen types typescript --project-id ftgfyrkjvddzziyddpjb > types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      case_studies: {
        Row: {
          id: string;
          slug: string;
          client_name: string;
          tagline: string;
          description: string;
          results: string;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          client_name: string;
          tagline: string;
          description: string;
          results: string;
          featured?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["case_studies"]["Insert"]>;
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          service_interest: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          service_interest: string;
          message: string;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["contact_submissions"]["Insert"]
        >;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type CaseStudy =
  Database["public"]["Tables"]["case_studies"]["Row"];
export type ContactSubmission =
  Database["public"]["Tables"]["contact_submissions"]["Row"];
