import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface Locataire {
  id: string;
  user_id: string;
  bien_id: string | null;
  nom: string;
  email: string;
  telephone: string;
  date_debut_bail: string | null;
  date_fin_bail: string | null;
  loyer: number;
  depot_garantie: number;
  statut: string;
  created_at: string;
  updated_at: string;
}

export const useLocataires = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["locataires", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locataires")
        .select("*, biens(nom)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as (Locataire & { biens: { nom: string } | null })[];
    },
    enabled: !!user,
  });

  const addLocataire = useMutation({
    mutationFn: async (loc: Omit<Locataire, "id" | "user_id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("locataires")
        .insert({ ...loc, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locataires"] });
      toast({ title: "Locataire ajouté" });
    },
    onError: (e: Error) => {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    },
  });

  const deleteLocataire = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("locataires").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locataires"] });
      toast({ title: "Locataire supprimé" });
    },
  });

  return { ...query, addLocataire, deleteLocataire };
};
