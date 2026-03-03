import { BarChart3, TrendingUp, TrendingDown, Euro, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/dashboard/StatCard";

const revenus = [
  { categorie: "Loyers", montant: 30600, type: "revenu" },
  { categorie: "Locations courtes", montant: 8400, type: "revenu" },
];

const depenses = [
  { categorie: "Charges copropriété", montant: 4560, type: "depense" },
  { categorie: "Taxes foncières", montant: 5750, type: "depense" },
  { categorie: "Assurances", montant: 1200, type: "depense" },
  { categorie: "Travaux / Entretien", montant: 3200, type: "depense" },
  { categorie: "Frais de gestion", montant: 1800, type: "depense" },
];

const ComptabilitePage = () => {
  const totalRevenus = revenus.reduce((s, r) => s + r.montant, 0);
  const totalDepenses = depenses.reduce((s, d) => s + d.montant, 0);
  const benefice = totalRevenus - totalDepenses;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Comptabilité</h2>
        <p className="text-muted-foreground">Bilan financier de votre patrimoine</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Revenus annuels" value={`${totalRevenus.toLocaleString()} €`} icon={TrendingUp} />
        <StatCard title="Dépenses annuelles" value={`${totalDepenses.toLocaleString()} €`} icon={TrendingDown} />
        <StatCard title="Bénéfice net" value={`${benefice.toLocaleString()} €`} icon={Euro} trend={`${((benefice / totalRevenus) * 100).toFixed(0)}% marge`} />
        <StatCard title="Rentabilité nette" value={`${((benefice / 1075000) * 100).toFixed(2)}%`} icon={PieChart} subtitle="Sur valeur patrimoine" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-border/50">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Revenus</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {revenus.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-foreground">{r.categorie}</span>
                  <span className="text-sm font-semibold text-primary">+{r.montant.toLocaleString()} €</span>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-sm font-semibold text-foreground">Total revenus</span>
                <span className="text-sm font-bold text-primary">{totalRevenus.toLocaleString()} €</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/50">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingDown className="h-5 w-5 text-destructive" />Dépenses</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {depenses.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-foreground">{d.categorie}</span>
                  <span className="text-sm font-semibold text-destructive">-{d.montant.toLocaleString()} €</span>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <span className="text-sm font-semibold text-foreground">Total dépenses</span>
                <span className="text-sm font-bold text-destructive">{totalDepenses.toLocaleString()} €</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComptabilitePage;
