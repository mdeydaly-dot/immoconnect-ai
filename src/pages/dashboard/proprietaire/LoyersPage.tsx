import { CreditCard, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/dashboard/StatCard";

const paiements = [
  { id: "1", bien: "T3 Paris 11e", locataire: "M. Dupont", mois: "Mars 2026", montant: 1200, statut: "payé", date: "01/03/2026" },
  { id: "2", bien: "T2 Lyon 6e", locataire: "Mme Martin", mois: "Mars 2026", montant: 800, statut: "en retard", date: "—" },
  { id: "3", bien: "Studio Marseille", locataire: "M. Leblanc", mois: "Mars 2026", montant: 550, statut: "payé", date: "02/03/2026" },
  { id: "4", bien: "T3 Paris 11e", locataire: "M. Dupont", mois: "Février 2026", montant: 1200, statut: "payé", date: "01/02/2026" },
  { id: "5", bien: "T2 Lyon 6e", locataire: "Mme Martin", mois: "Février 2026", montant: 800, statut: "payé", date: "03/02/2026" },
  { id: "6", bien: "Studio Marseille", locataire: "M. Leblanc", mois: "Février 2026", montant: 550, statut: "payé", date: "01/02/2026" },
];

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
  "payé": { icon: CheckCircle, color: "text-green-400", label: "Payé" },
  "en retard": { icon: AlertTriangle, color: "text-destructive", label: "En retard" },
  "en attente": { icon: Clock, color: "text-yellow-400", label: "En attente" },
};

const LoyersPage = () => {
  const totalMois = paiements.filter(p => p.mois === "Mars 2026").reduce((s, p) => s + p.montant, 0);
  const paye = paiements.filter(p => p.mois === "Mars 2026" && p.statut === "payé").reduce((s, p) => s + p.montant, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Suivi des Loyers</h2>
        <p className="text-muted-foreground">Encaissements et relances</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Loyers du mois" value={`${totalMois.toLocaleString()} €`} icon={CreditCard} />
        <StatCard title="Encaissés" value={`${paye.toLocaleString()} €`} icon={CheckCircle} trend={`${((paye / totalMois) * 100).toFixed(0)}%`} />
        <StatCard title="Impayés" value={`${(totalMois - paye).toLocaleString()} €`} icon={AlertTriangle} subtitle="1 retard" />
        <StatCard title="Revenu annuel" value="30 600 €" icon={TrendingUp} />
      </div>

      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Historique des paiements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paiements.map((p) => {
              const cfg = statusConfig[p.statut];
              const Icon = cfg.icon;
              return (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${cfg.color}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{p.bien}</p>
                      <p className="text-xs text-muted-foreground">{p.locataire} · {p.mois}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{p.montant} €</p>
                    <p className="text-xs text-muted-foreground">{p.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyersPage;
