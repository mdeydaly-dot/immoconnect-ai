
-- Biens immobiliers table
CREATE TABLE public.biens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nom TEXT NOT NULL,
  adresse TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'Appartement',
  surface NUMERIC NOT NULL DEFAULT 0,
  loyer_mensuel NUMERIC NOT NULL DEFAULT 0,
  charges NUMERIC NOT NULL DEFAULT 0,
  taxe_fonciere NUMERIC NOT NULL DEFAULT 0,
  prix_achat NUMERIC NOT NULL DEFAULT 0,
  travaux NUMERIC NOT NULL DEFAULT 0,
  statut TEXT NOT NULL DEFAULT 'vacant',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.biens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own biens" ON public.biens FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own biens" ON public.biens FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own biens" ON public.biens FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own biens" ON public.biens FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Locataires table
CREATE TABLE public.locataires (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  bien_id UUID REFERENCES public.biens(id) ON DELETE SET NULL,
  nom TEXT NOT NULL,
  email TEXT DEFAULT '',
  telephone TEXT DEFAULT '',
  date_debut_bail TIMESTAMPTZ,
  date_fin_bail TIMESTAMPTZ,
  loyer NUMERIC NOT NULL DEFAULT 0,
  depot_garantie NUMERIC NOT NULL DEFAULT 0,
  statut TEXT NOT NULL DEFAULT 'actif',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.locataires ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own locataires" ON public.locataires FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own locataires" ON public.locataires FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own locataires" ON public.locataires FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own locataires" ON public.locataires FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Loyers / paiements table
CREATE TABLE public.loyers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  bien_id UUID REFERENCES public.biens(id) ON DELETE CASCADE NOT NULL,
  locataire_id UUID REFERENCES public.locataires(id) ON DELETE SET NULL,
  mois TEXT NOT NULL,
  montant NUMERIC NOT NULL DEFAULT 0,
  statut TEXT NOT NULL DEFAULT 'en attente',
  date_paiement TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.loyers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own loyers" ON public.loyers FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own loyers" ON public.loyers FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own loyers" ON public.loyers FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own loyers" ON public.loyers FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_biens_updated_at BEFORE UPDATE ON public.biens FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_locataires_updated_at BEFORE UPDATE ON public.locataires FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
