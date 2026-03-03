import { BedDouble, CalendarDays, Star, Users, Euro, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/dashboard/StatCard";

const reservations = [
  { id: "1", bien: "Studio Marseille", voyageur: "Alice W.", arrivee: "05/03/2026", depart: "08/03/2026", montant: 280, statut: "confirmée", plateforme: "Airbnb" },
  { id: "2", bien: "Studio Marseille", voyageur: "Bob K.", arrivee: "10/03/2026", depart: "14/03/2026", montant: 420, statut: "en attente", plateforme: "Booking" },
  { id: "3", bien: "Studio Marseille", voyageur: "Claire D.", arrivee: "18/03/2026", depart: "20/03/2026", montant: 180, statut: "confirmée", plateforme: "Airbnb" },
  { id: "4", bien: "Studio Marseille", voyageur: "David M.", arrivee: "25/03/2026", depart: "30/03/2026", montant: 500, statut: "confirmée", plateforme: "Direct" },
];

const taches = [
  { id: "1", tache: "Ménage - Départ Alice W.", date: "08/03/2026", statut: "planifié" },
  { id: "2", tache: "Check-in Bob K.", date: "10/03/2026", statut: "planifié" },
  { id: "3", tache: "Remplacement draps", date: "08/03/2026", statut: "planifié" },
];

const ConciergeriePage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Conciergerie & Locations Courtes</h2>
      <p className="text-muted-foreground">Gestion des réservations et services</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="Réservations ce mois" value="12" icon={CalendarDays} />
      <StatCard title="Taux d'occupation" value="78%" icon={BedDouble} subtitle="24/31 nuits" />
      <StatCard title="Revenus du mois" value="1 380 €" icon={Euro} trend="+12% vs mois dernier" />
      <StatCard title="Note moyenne" value="4.8/5" icon={Star} subtitle="32 avis" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-card border-border/50">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" />Prochaines réservations</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reservations.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.voyageur}</p>
                  <p className="text-xs text-muted-foreground">{r.arrivee} → {r.depart} · {r.plateforme}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{r.montant} €</p>
                  <Badge variant={r.statut === "confirmée" ? "default" : "secondary"} className="text-xs">{r.statut}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-border/50">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Clock className="h-5 w-5 text-primary" />Tâches conciergerie</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {taches.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.tache}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">{t.statut}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default ConciergeriePage;
