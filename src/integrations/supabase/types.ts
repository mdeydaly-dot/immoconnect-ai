export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      biens: {
        Row: {
          adresse: string
          charges: number
          created_at: string
          id: string
          loyer_mensuel: number
          nom: string
          prix_achat: number
          statut: string
          surface: number
          taxe_fonciere: number
          travaux: number
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          adresse?: string
          charges?: number
          created_at?: string
          id?: string
          loyer_mensuel?: number
          nom: string
          prix_achat?: number
          statut?: string
          surface?: number
          taxe_fonciere?: number
          travaux?: number
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          adresse?: string
          charges?: number
          created_at?: string
          id?: string
          loyer_mensuel?: number
          nom?: string
          prix_achat?: number
          statut?: string
          surface?: number
          taxe_fonciere?: number
          travaux?: number
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      declarations_fiscales: {
        Row: {
          created_at: string
          date_echeance: string | null
          date_generation: string | null
          donnees: Json | null
          frequence: string
          id: string
          immeuble_id: string | null
          montant_retenues: number
          montant_tib: number
          montant_total: number
          periode: string
          statut: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_echeance?: string | null
          date_generation?: string | null
          donnees?: Json | null
          frequence?: string
          id?: string
          immeuble_id?: string | null
          montant_retenues?: number
          montant_tib?: number
          montant_total?: number
          periode?: string
          statut?: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_echeance?: string | null
          date_generation?: string | null
          donnees?: Json | null
          frequence?: string
          id?: string
          immeuble_id?: string | null
          montant_retenues?: number
          montant_tib?: number
          montant_total?: number
          periode?: string
          statut?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "declarations_fiscales_immeuble_id_fkey"
            columns: ["immeuble_id"]
            isOneToOne: false
            referencedRelation: "immeubles_syndic"
            referencedColumns: ["id"]
          },
        ]
      }
      immeubles_syndic: {
        Row: {
          adresse: string
          created_at: string
          id: string
          nb_lots: number
          nom: string
          prix_ref_m2: number
          superficie_communes: number
          updated_at: string
          user_id: string
          ville: string
        }
        Insert: {
          adresse?: string
          created_at?: string
          id?: string
          nb_lots?: number
          nom: string
          prix_ref_m2?: number
          superficie_communes?: number
          updated_at?: string
          user_id: string
          ville?: string
        }
        Update: {
          adresse?: string
          created_at?: string
          id?: string
          nb_lots?: number
          nom?: string
          prix_ref_m2?: number
          superficie_communes?: number
          updated_at?: string
          user_id?: string
          ville?: string
        }
        Relationships: []
      }
      locataires: {
        Row: {
          bien_id: string | null
          created_at: string
          date_debut_bail: string | null
          date_fin_bail: string | null
          depot_garantie: number
          email: string | null
          id: string
          loyer: number
          nom: string
          statut: string
          telephone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bien_id?: string | null
          created_at?: string
          date_debut_bail?: string | null
          date_fin_bail?: string | null
          depot_garantie?: number
          email?: string | null
          id?: string
          loyer?: number
          nom: string
          statut?: string
          telephone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bien_id?: string | null
          created_at?: string
          date_debut_bail?: string | null
          date_fin_bail?: string | null
          depot_garantie?: number
          email?: string | null
          id?: string
          loyer?: number
          nom?: string
          statut?: string
          telephone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "locataires_bien_id_fkey"
            columns: ["bien_id"]
            isOneToOne: false
            referencedRelation: "biens"
            referencedColumns: ["id"]
          },
        ]
      }
      lots_copropriete: {
        Row: {
          created_at: string
          id: string
          immeuble_id: string
          numero: string
          proprietaire_email: string | null
          proprietaire_nom: string
          proprietaire_telephone: string | null
          superficie: number
          tantiemes: number
        }
        Insert: {
          created_at?: string
          id?: string
          immeuble_id: string
          numero: string
          proprietaire_email?: string | null
          proprietaire_nom?: string
          proprietaire_telephone?: string | null
          superficie?: number
          tantiemes?: number
        }
        Update: {
          created_at?: string
          id?: string
          immeuble_id?: string
          numero?: string
          proprietaire_email?: string | null
          proprietaire_nom?: string
          proprietaire_telephone?: string | null
          superficie?: number
          tantiemes?: number
        }
        Relationships: [
          {
            foreignKeyName: "lots_copropriete_immeuble_id_fkey"
            columns: ["immeuble_id"]
            isOneToOne: false
            referencedRelation: "immeubles_syndic"
            referencedColumns: ["id"]
          },
        ]
      }
      loyers: {
        Row: {
          bien_id: string
          created_at: string
          date_paiement: string | null
          id: string
          locataire_id: string | null
          mois: string
          montant: number
          statut: string
          user_id: string
        }
        Insert: {
          bien_id: string
          created_at?: string
          date_paiement?: string | null
          id?: string
          locataire_id?: string | null
          mois: string
          montant?: number
          statut?: string
          user_id: string
        }
        Update: {
          bien_id?: string
          created_at?: string
          date_paiement?: string | null
          id?: string
          locataire_id?: string | null
          mois?: string
          montant?: number
          statut?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyers_bien_id_fkey"
            columns: ["bien_id"]
            isOneToOne: false
            referencedRelation: "biens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyers_locataire_id_fkey"
            columns: ["locataire_id"]
            isOneToOne: false
            referencedRelation: "locataires"
            referencedColumns: ["id"]
          },
        ]
      }
      prestataires: {
        Row: {
          adresse: string | null
          created_at: string
          email: string | null
          id: string
          nom: string
          rne: string | null
          telephone: string | null
          type_prestation: string
          user_id: string
        }
        Insert: {
          adresse?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nom: string
          rne?: string | null
          telephone?: string | null
          type_prestation?: string
          user_id: string
        }
        Update: {
          adresse?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nom?: string
          rne?: string | null
          telephone?: string | null
          type_prestation?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transactions_fiscales: {
        Row: {
          created_at: string
          date_paiement: string
          description: string
          id: string
          immeuble_id: string
          mois: string
          montant_ht: number
          montant_retenue: number
          prestataire_id: string | null
          taux_retenue: number
          trimestre: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_paiement?: string
          description?: string
          id?: string
          immeuble_id: string
          mois?: string
          montant_ht?: number
          montant_retenue?: number
          prestataire_id?: string | null
          taux_retenue?: number
          trimestre?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_paiement?: string
          description?: string
          id?: string
          immeuble_id?: string
          mois?: string
          montant_ht?: number
          montant_retenue?: number
          prestataire_id?: string | null
          taux_retenue?: number
          trimestre?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_fiscales_immeuble_id_fkey"
            columns: ["immeuble_id"]
            isOneToOne: false
            referencedRelation: "immeubles_syndic"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_fiscales_prestataire_id_fkey"
            columns: ["prestataire_id"]
            isOneToOne: false
            referencedRelation: "prestataires"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "agent"
        | "syndic"
        | "proprietaire"
        | "locataire"
        | "intervenant"
        | "conciergerie"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "agent",
        "syndic",
        "proprietaire",
        "locataire",
        "intervenant",
        "conciergerie",
      ],
    },
  },
} as const
