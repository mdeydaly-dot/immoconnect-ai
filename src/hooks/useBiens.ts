import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface Bien {
  id: string;
  user_id: string;
  nom: string;
  adresse: string;
  type: string;
  surface: number;
  loyer_mensuel: number;
  charges: number;
  taxe_fonciere: number;
  prix_achat: number;
  travaux: number;
  statut: string;
  created_at: string;
  updated_at: string;
}

export type BienInsert = Omit<Bien, "id" | "created_at" | "updated_at">;

export const useBiens = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["biens", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("biens")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Bien[];
    },
    enabled: !!user,
  });

  const addBien = useMutation({
    mutationFn: async (bien: Omit<BienInsert, "user_id">) => {
      const { data, error } = await supabase
        .from("biens")
        .insert({ ...bien, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["biens"] });
      toast({ title: "Bien ajouté avec succès" });
    },
    onError: (e: Error) => {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    },
  });

  const updateBien = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Bien> & { id: string }) => {
      const { error } = await supabase.from("biens").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["biens"] });
      toast({ title: "Bien mis à jour" });
    },
  });

  const deleteBien = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("biens").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["biens"] });
      toast({ title: "Bien supprimé" });
    },
  });

  return { ...query, addBien, updateBien, deleteBien };
};
