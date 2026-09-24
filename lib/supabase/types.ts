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
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          short_description: string;
          category: string;
          religion_or_cultural_use: string | null;
          occasion: string | null;
          materials: string[];
          base_material: string;
          image_url: string;
          gallery_images: string[];
          featured: boolean;
          active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          short_description: string;
          category: string;
          religion_or_cultural_use?: string | null;
          occasion?: string | null;
          materials: string[];
          base_material: string;
          image_url: string;
          gallery_images?: string[];
          featured?: boolean;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          short_description?: string;
          category?: string;
          religion_or_cultural_use?: string | null;
          occasion?: string | null;
          materials?: string[];
          base_material?: string;
          image_url?: string;
          gallery_images?: string[];
          featured?: boolean;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      quote_requests: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          company_name: string;
          email: string;
          phone: string;
          country: string;
          product_id: string | null;
          product_name: string;
          quantity: string;
          intended_use: string;
          delivery_date: string | null;
          target_market: string | null;
          customization_requirements: string | null;
          packaging_requirements: string | null;
          message: string;
          status: 'new' | 'contacted' | 'quoted' | 'closed';
        };
        Insert: {
          id?: string;
          created_at?: string;
          full_name: string;
          company_name: string;
          email: string;
          phone: string;
          country: string;
          product_id?: string | null;
          product_name: string;
          quantity: string;
          intended_use: string;
          delivery_date?: string | null;
          target_market?: string | null;
          customization_requirements?: string | null;
          packaging_requirements?: string | null;
          message: string;
          status?: 'new' | 'contacted' | 'quoted' | 'closed';
        };
        Update: {
          id?: string;
          created_at?: string;
          full_name?: string;
          company_name?: string;
          email?: string;
          phone?: string;
          country?: string;
          product_id?: string | null;
          product_name?: string;
          quantity?: string;
          intended_use?: string;
          delivery_date?: string | null;
          target_market?: string | null;
          customization_requirements?: string | null;
          packaging_requirements?: string | null;
          message?: string;
          status?: 'new' | 'contacted' | 'quoted' | 'closed';
        };
      };
    };
  };
}

export type Product = Database['public']['Tables']['products']['Row'];
export type QuoteRequest = Database['public']['Tables']['quote_requests']['Row'];
export type QuoteRequestInsert = Database['public']['Tables']['quote_requests']['Insert'];
