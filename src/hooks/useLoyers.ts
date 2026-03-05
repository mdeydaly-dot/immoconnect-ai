import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface Loyer {
  id: string;
  user_id: string;
  bien_id: string;
  locataire_id: string | null;
  mois: string;
  montant: number;
  statut: string;
  date_paiement: string | null;
  created_at: string;
}

export const useLoyers = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["loyers", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("loyers")
        .select("*, biens(nom), locataires(nom)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as (Loyer & { biens: { nom: string } | null; locataires: { nom: string } | null })[];
    },
    enabled: !!user,
  });

  const addLoyer = useMutation({
    mutationFn: async (loyer: Omit<Loyer, "id" | "user_id" | "created_at">) => {
      const { data, error } = await supabase
        .from("loyers")
        .insert({ ...loyer, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loyers"] });
      toast({ title: "Paiement enregistré" });
    },
    onError: (e: Error) => {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    },
  });

  const updateLoyer = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Loyer> & { id: string }) => {
      const { error } = await supabase.from("loyers").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loyers"] });
      toast({ title: "Paiement mis à jour" });
    },
  });

  return { ...query, addLoyer, updateLoyer };
};
