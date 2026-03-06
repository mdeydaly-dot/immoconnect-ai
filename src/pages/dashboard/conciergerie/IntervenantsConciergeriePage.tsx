import { Wrench, Star, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/dashboard/StatCard";

const intervenants = [
  { id: "1", nom: "Pierre Ménage Pro", metier: "Ménage", note: 4.8, missions: 45, tel: "06 10 20 30 40", dispo: true },
  { id: "2", nom: "Luc Plomberie", metier: "Plomberie", note: 4.5, missions: 12, tel: "06 50 60 70 80", dispo: true },
  { id: "3", nom: "Alice Déco", metier: "Décoration", note: 4.9, missions: 8, tel: "06 11 22 33 44", dispo: false },
  { id: "4", nom: "Marc Serrurerie", metier: "Serrurerie", note: 4.2, missions: 22, tel: "06 99 88 77 66", dispo: true },
];

const IntervenantsConciergeriePage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Réseau d'intervenants</h2>
      <p className="text-muted-foreground">Vos prestataires pour les interventions</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Intervenants" value={String(intervenants.length)} icon={Wrench} />
      <StatCard title="Disponibles" value={String(intervenants.filter(i => i.dispo).length)} icon={Wrench} />
      <StatCard title="Note moyenne" value="4.6" icon={Star} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {intervenants.map((i) => (
        <Card key={i.id} className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-foreground">{i.nom}</h3>
              <Badge variant={i.dispo ? "default" : "secondary"}>{i.dispo ? "Disponible" : "Indisponible"}</Badge>
            </div>
            <p className="text-sm text-primary">{i.metier}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500" />{i.note}/5 · {i.missions} missions</span>
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{i.tel}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default IntervenantsConciergeriePage;
