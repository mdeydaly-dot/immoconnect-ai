import { BarChart3, TrendingUp, TrendingDown, Euro, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/dashboard/StatCard";

const comptesParImmeuble = [
  {
    immeuble: "Résidence Les Lilas",
    recettes: [{ label: "Charges courantes", montant: 50400 }, { label: "Fonds travaux", montant: 12000 }],
    depenses: [{ label: "Entretien courant", montant: 18200 }, { label: "Assurance", montant: 4800 }, { label: "Eau / Énergie", montant: 15600 }, { label: "Travaux exceptionnels", montant: 8500 }],
    tresorerie: 15300,
  },
  {
    immeuble: "Résidence Voltaire",
    recettes: [{ label: "Charges courantes", montant: 81600 }, { label: "Fonds travaux", montant: 18000 }],
    depenses: [{ label: "Entretien courant", montant: 28400 }, { label: "Assurance", montant: 7200 }, { label: "Eau / Énergie", montant: 24000 }, { label: "Ascenseur", montant: 9600 }],
    tresorerie: 30400,
  },
];

const ComptabiliteSyndicPage = () => {
  const totalRecettes = comptesParImmeuble.reduce((s, c) => s + c.recettes.reduce((r, e) => r + e.montant, 0), 0);
  const totalDepenses = comptesParImmeuble.reduce((s, c) => s + c.depenses.reduce((d, e) => d + e.montant, 0), 0);
  const totalTresorerie = comptesParImmeuble.reduce((s, c) => s + c.tresorerie, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Comptabilité Syndic</h2>
        <p className="text-muted-foreground">Suivi financier par copropriété</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Recettes totales" value={`${(totalRecettes / 1000).toFixed(0)}k TND`} icon={TrendingUp} />
        <StatCard title="Dépenses totales" value={`${(totalDepenses / 1000).toFixed(0)}k TND`} icon={TrendingDown} />
        <StatCard title="Solde" value={`${((totalRecettes - totalDepenses) / 1000).toFixed(0)}k TND`} icon={Euro} />
        <StatCard title="Trésorerie" value={`${(totalTresorerie / 1000).toFixed(1)}k TND`} icon={BarChart3} subtitle="Tous immeubles" />
      </div>

      <div className="space-y-6">
        {comptesParImmeuble.map((compte, idx) => {
          const rec = compte.recettes.reduce((s, e) => s + e.montant, 0);
          const dep = compte.depenses.reduce((s, e) => s + e.montant, 0);
          return (
            <Card key={idx} className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Building className="h-5 w-5 text-primary" />{compte.immeuble}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1"><TrendingUp className="h-4 w-4 text-primary" />Recettes</h4>
                    <div className="space-y-2">
                      {compte.recettes.map((r, i) => (
                        <div key={i} className="flex justify-between p-2 rounded bg-muted/30 text-sm">
                          <span className="text-muted-foreground">{r.label}</span>
                          <span className="text-primary font-medium">+{r.montant.toLocaleString()} TND</span>
                        </div>
                      ))}
                      <div className="flex justify-between p-2 rounded bg-primary/10 border border-primary/20 text-sm font-semibold">
                        <span className="text-foreground">Total</span>
                        <span className="text-primary">{rec.toLocaleString()} TND</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1"><TrendingDown className="h-4 w-4 text-destructive" />Dépenses</h4>
                    <div className="space-y-2">
                      {compte.depenses.map((d, i) => (
                        <div key={i} className="flex justify-between p-2 rounded bg-muted/30 text-sm">
                          <span className="text-muted-foreground">{d.label}</span>
                          <span className="text-destructive font-medium">-{d.montant.toLocaleString()} TND</span>
                        </div>
                      ))}
                      <div className="flex justify-between p-2 rounded bg-destructive/10 border border-destructive/20 text-sm font-semibold">
                        <span className="text-foreground">Total</span>
                        <span className="text-destructive">{dep.toLocaleString()} TND</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-muted/30 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Trésorerie disponible</span>
                  <span className="text-lg font-bold text-primary">{compte.tresorerie.toLocaleString()} TND</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ComptabiliteSyndicPage;
