import { CalendarDays, Home, Users, FileText, CreditCard, CheckCircle } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const reservations = [
  { id: "1", bien: "Studio Marais", client: "Martin L.", arrivee: "08/03/2026", depart: "12/03/2026", statut: "confirmée" },
  { id: "2", bien: "Appt Bastille", client: "Sophie K.", arrivee: "10/03/2026", depart: "15/03/2026", statut: "en cours" },
  { id: "3", bien: "Loft Oberkampf", client: "James W.", arrivee: "15/03/2026", depart: "20/03/2026", statut: "à préparer" },
  { id: "4", bien: "Studio République", client: "Maria G.", arrivee: "18/03/2026", depart: "22/03/2026", statut: "confirmée" },
];

const ConciergerieDashboard = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Tableau de bord Conciergerie</h2>
      <p className="text-muted-foreground">Gestion des locations courte durée</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="Biens gérés" value="12" icon={Home} />
      <StatCard title="Réservations actives" value="8" icon={CalendarDays} />
      <StatCard title="Taux d'occupation" value="87%" icon={CheckCircle} subtitle="Ce mois" />
      <StatCard title="CA mensuel" value="4 850 TND" icon={CreditCard} />
    </div>

    <Card className="glass-card border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Prochaines réservations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reservations.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="font-medium text-foreground">{r.bien}</p>
                <p className="text-sm text-muted-foreground">{r.client} · {r.arrivee} → {r.depart}</p>
              </div>
              <Badge variant={r.statut === "en cours" ? "default" : r.statut === "confirmée" ? "secondary" : "destructive"}>
                {r.statut}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ConciergerieDashboard;
