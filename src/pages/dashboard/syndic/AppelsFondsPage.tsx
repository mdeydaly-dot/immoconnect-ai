import { CreditCard, CheckCircle, AlertTriangle, Clock, Building, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/dashboard/StatCard";

const appels = [
  { id: "1", immeuble: "Résidence Les Lilas", trimestre: "T1 2026", montant: 12600, recouvre: 10332, echeance: "31/03/2026", nb: 20, paye: 16 },
  { id: "2", immeuble: "Résidence Voltaire", trimestre: "T1 2026", montant: 20400, recouvre: 18564, echeance: "31/03/2026", nb: 30, paye: 27 },
  { id: "3", immeuble: "Le Clos Saint-Martin", trimestre: "T1 2026", montant: 8700, recouvre: 8265, echeance: "31/03/2026", nb: 16, paye: 15 },
  { id: "4", immeuble: "Résidence du Parc", trimestre: "T1 2026", montant: 22500, recouvre: 17100, echeance: "31/03/2026", nb: 38, paye: 29 },
];

const AppelsFondsPage = () => {
  const totalAppel = appels.reduce((s, a) => s + a.montant, 0);
  const totalRecouvre = appels.reduce((s, a) => s + a.recouvre, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Appels de Fonds</h2>
          <p className="text-muted-foreground">Suivi des appels de charges trimestriels</p>
        </div>
        <Button><Send className="h-4 w-4 mr-2" />Nouvel appel</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total appelé (T1)" value={`${(totalAppel / 1000).toFixed(1)}k TND`} icon={CreditCard} />
        <StatCard title="Recouvré" value={`${(totalRecouvre / 1000).toFixed(1)}k TND`} icon={CheckCircle} trend={`${((totalRecouvre / totalAppel) * 100).toFixed(0)}%`} />
        <StatCard title="Impayés" value={`${((totalAppel - totalRecouvre) / 1000).toFixed(1)}k TND`} icon={AlertTriangle} />
        <StatCard title="Échéance" value="31/03/2026" icon={Clock} subtitle="T1 2026" />
      </div>

      <div className="space-y-4">
        {appels.map((a) => {
          const pct = (a.recouvre / a.montant) * 100;
          return (
            <Card key={a.id} className="glass-card border-border/50">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary" />{a.immeuble}
                    </h3>
                    <p className="text-xs text-muted-foreground">{a.trimestre} · Échéance : {a.echeance}</p>
                  </div>
                  <Badge variant={pct >= 90 ? "default" : pct >= 75 ? "secondary" : "destructive"}>
                    {pct.toFixed(0)}% recouvré
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-sm mb-3">
                  <div><p className="text-muted-foreground text-xs">Appelé</p><p className="font-semibold text-foreground">{a.montant.toLocaleString()} TND</p></div>
                  <div><p className="text-muted-foreground text-xs">Recouvré</p><p className="font-semibold text-primary">{a.recouvre.toLocaleString()} TND</p></div>
                  <div><p className="text-muted-foreground text-xs">Restant</p><p className="font-semibold text-destructive">{(a.montant - a.recouvre).toLocaleString()} TND</p></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{a.paye}/{a.nb} copropriétaires ont payé</span>
                    <span className="text-foreground">{pct.toFixed(0)}%</span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AppelsFondsPage;
