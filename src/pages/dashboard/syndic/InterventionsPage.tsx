import { Hammer, AlertTriangle, CheckCircle, Clock, Plus, Building, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/dashboard/StatCard";

const interventions = [
  { id: "1", titre: "Fuite toiture - Lot 12", immeuble: "Résidence Les Lilas", urgence: "haute", statut: "en cours", intervenant: "Plomberie Martin", dateCreation: "25/02/2026", devis: "1 800 €" },
  { id: "2", titre: "Panne ascenseur", immeuble: "Résidence Voltaire", urgence: "haute", statut: "planifiée", intervenant: "Ascenseurs Pro", dateCreation: "01/03/2026", devis: "3 200 €" },
  { id: "3", titre: "Remplacement interphone", immeuble: "Le Clos Saint-Martin", urgence: "moyenne", statut: "devis reçu", intervenant: "Elec Services", dateCreation: "20/02/2026", devis: "4 500 €" },
  { id: "4", titre: "Ravalement façade sud", immeuble: "Résidence du Parc", urgence: "basse", statut: "en attente vote AG", intervenant: "—", dateCreation: "15/01/2026", devis: "45 000 €" },
  { id: "5", titre: "Nettoyage parking", immeuble: "Résidence Voltaire", urgence: "basse", statut: "terminée", intervenant: "Clean Pro", dateCreation: "10/02/2026", devis: "600 €" },
];

const urgenceColors: Record<string, string> = {
  haute: "bg-destructive/20 text-destructive",
  moyenne: "bg-yellow-500/20 text-yellow-400",
  basse: "bg-muted text-muted-foreground",
};

const statutColors: Record<string, string> = {
  "en cours": "bg-blue-500/20 text-blue-400",
  "planifiée": "bg-primary/20 text-primary",
  "devis reçu": "bg-yellow-500/20 text-yellow-400",
  "en attente vote AG": "bg-muted text-muted-foreground",
  "terminée": "bg-green-500/20 text-green-400",
};

const InterventionsPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Interventions</h2>
        <p className="text-muted-foreground">Suivi des travaux et maintenance</p>
      </div>
      <Button><Plus className="h-4 w-4 mr-2" />Nouvelle intervention</Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="En cours" value={`${interventions.filter(i => i.statut === "en cours").length}`} icon={Hammer} />
      <StatCard title="Urgentes" value={`${interventions.filter(i => i.urgence === "haute").length}`} icon={AlertTriangle} />
      <StatCard title="Terminées" value={`${interventions.filter(i => i.statut === "terminée").length}`} icon={CheckCircle} subtitle="Ce mois" />
      <StatCard title="Budget engagé" value="10 100 TND" icon={Clock} subtitle="Hors ravalement" />
    </div>

    <div className="space-y-3">
      {interventions.map((inter) => (
        <Card key={inter.id} className="glass-card border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-semibold text-foreground">{inter.titre}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${urgenceColors[inter.urgence]}`}>{inter.urgence}</span>
                </div>
                <p className="text-sm text-primary flex items-center gap-1"><Building className="h-3 w-3" />{inter.immeuble}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" />{inter.intervenant}</span>
                  <span>Créée le {inter.dateCreation}</span>
                  <span>Devis : {inter.devis}</span>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${statutColors[inter.statut]}`}>{inter.statut}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default InterventionsPage;
