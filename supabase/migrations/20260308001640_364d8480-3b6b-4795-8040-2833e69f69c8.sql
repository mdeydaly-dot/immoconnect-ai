
-- Immeubles gérés par le syndic
CREATE TABLE public.immeubles_syndic (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  nom TEXT NOT NULL,
  adresse TEXT NOT NULL DEFAULT '',
  ville TEXT NOT NULL DEFAULT 'Tunis',
  superficie_communes NUMERIC NOT NULL DEFAULT 0,
  nb_lots INTEGER NOT NULL DEFAULT 0,
  prix_ref_m2 NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Lots de copropriété
CREATE TABLE public.lots_copropriete (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  immeuble_id UUID REFERENCES public.immeubles_syndic(id) ON DELETE CASCADE NOT NULL,
  numero TEXT NOT NULL,
  proprietaire_nom TEXT NOT NULL DEFAULT '',
  proprietaire_email TEXT DEFAULT '',
  proprietaire_telephone TEXT DEFAULT '',
  tantiemes INTEGER NOT NULL DEFAULT 0,
  superficie NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Prestataires / fournisseurs avec identifiant fiscal
CREATE TABLE public.prestataires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  nom TEXT NOT NULL,
  rne TEXT DEFAULT '',
  adresse TEXT DEFAULT '',
  telephone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  type_prestation TEXT NOT NULL DEFAULT 'travaux',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Transactions fiscales (honoraires payés aux prestataires)
CREATE TABLE public.transactions_fiscales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  immeuble_id UUID REFERENCES public.immeubles_syndic(id) ON DELETE CASCADE NOT NULL,
  prestataire_id UUID REFERENCES public.prestataires(id) ON DELETE SET NULL,
  description TEXT NOT NULL DEFAULT '',
  montant_ht NUMERIC NOT NULL DEFAULT 0,
  taux_retenue NUMERIC NOT NULL DEFAULT 15.5,
  montant_retenue NUMERIC NOT NULL DEFAULT 0,
  date_paiement DATE NOT NULL DEFAULT CURRENT_DATE,
  mois TEXT NOT NULL DEFAULT '',
  trimestre TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Déclarations fiscales générées
CREATE TABLE public.declarations_fiscales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  immeuble_id UUID REFERENCES public.immeubles_syndic(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'retenue_source',
  periode TEXT NOT NULL DEFAULT '',
  frequence TEXT NOT NULL DEFAULT 'mensuel',
  montant_total NUMERIC NOT NULL DEFAULT 0,
  montant_retenues NUMERIC NOT NULL DEFAULT 0,
  montant_tib NUMERIC NOT NULL DEFAULT 0,
  statut TEXT NOT NULL DEFAULT 'brouillon',
  date_generation TIMESTAMPTZ DEFAULT now(),
  date_echeance DATE,
  donnees JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.immeubles_syndic ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lots_copropriete ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prestataires ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions_fiscales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.declarations_fiscales ENABLE ROW LEVEL SECURITY;

-- Immeubles policies
CREATE POLICY "Users manage own immeubles" ON public.immeubles_syndic FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Lots: accessible via immeuble owner
CREATE POLICY "Users manage lots of own immeubles" ON public.lots_copropriete FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.immeubles_syndic WHERE id = lots_copropriete.immeuble_id AND user_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.immeubles_syndic WHERE id = lots_copropriete.immeuble_id AND user_id = auth.uid()));

-- Prestataires policies
CREATE POLICY "Users manage own prestataires" ON public.prestataires FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Transactions policies
CREATE POLICY "Users manage own transactions" ON public.transactions_fiscales FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Declarations policies
CREATE POLICY "Users manage own declarations" ON public.declarations_fiscales FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Updated_at triggers
CREATE TRIGGER update_immeubles_syndic_updated_at BEFORE UPDATE ON public.immeubles_syndic FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_declarations_fiscales_updated_at BEFORE UPDATE ON public.declarations_fiscales FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
