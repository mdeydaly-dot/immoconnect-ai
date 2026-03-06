import { FileText, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/dashboard/StatCard";

const contrats = [
  { id: "1", proprietaire: "Jean Dupont", bien: "Studio Marais", debut: "01/01/2026", fin: "31/12/2026", commission: "20%", statut: "actif" },
  { id: "2", proprietaire: "Marie Martin", bien: "Appt Bastille", debut: "15/02/2026", fin: "14/02/2027", commission: "18%", statut: "actif" },
  { id: "3", proprietaire: "Paul Durand", bien: "Loft Oberkampf", debut: "01/03/2026", fin: "28/02/2027", commission: "22%", statut: "en attente" },
];

const ContratsConciergeriePage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Contrats de gestion</h2>
        <p className="text-muted-foreground">Vos contrats avec les propriétaires</p>
      </div>
      <Button><Plus className="h-4 w-4 mr-2" />Nouveau contrat</Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Contrats actifs" value="8" icon={FileText} />
      <StatCard title="Commission moyenne" value="20%" icon={FileText} />
      <StatCard title="En attente" value="2" icon={FileText} />
    </div>

    <div className="space-y-3">
      {contrats.map((c) => (
        <Card key={c.id} className="glass-card border-border/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">{c.proprietaire}</p>
              <p className="text-sm text-muted-foreground">{c.bien} · Commission: {c.commission}</p>
              <p className="text-xs text-muted-foreground">{c.debut} → {c.fin}</p>
            </div>
            <Badge variant={c.statut === "actif" ? "default" : "secondary"}>{c.statut}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default ContratsConciergeriePage;
