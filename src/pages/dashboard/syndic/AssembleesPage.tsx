import { CalendarDays, Users, FileText, Clock, Plus, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/dashboard/StatCard";

const assemblees = [
  { id: "1", immeuble: "Résidence Les Lilas", type: "AG Ordinaire", date: "15/03/2026", heure: "18h30", lieu: "Salle municipale", statut: "planifiée", convoqués: 20, confirmés: 14 },
  { id: "2", immeuble: "Résidence Voltaire", type: "AG Extraordinaire", date: "22/03/2026", heure: "19h00", lieu: "Hall de la résidence", statut: "planifiée", convoqués: 30, confirmés: 8 },
  { id: "3", immeuble: "Le Clos Saint-Martin", type: "AG Ordinaire", date: "10/02/2026", heure: "18h00", lieu: "Salle des fêtes", statut: "terminée", convoqués: 16, confirmés: 16 },
  { id: "4", immeuble: "Résidence du Parc", type: "AG Ordinaire", date: "28/04/2026", heure: "19h00", lieu: "À définir", statut: "à convoquer", convoqués: 38, confirmés: 0 },
];

const ordresJour = [
  "Approbation des comptes 2025",
  "Vote du budget prévisionnel 2026",
  "Travaux de ravalement façade",
  "Remplacement chaudière collective",
  "Changement de syndic",
];

const AssembleesPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Assemblées Générales</h2>
        <p className="text-muted-foreground">Planification et suivi des AG</p>
      </div>
      <Button><Plus className="h-4 w-4 mr-2" />Planifier une AG</Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="AG planifiées" value="2" icon={CalendarDays} />
      <StatCard title="AG ce trimestre" value="3" icon={Clock} />
      <StatCard title="Taux participation" value="87%" icon={Users} subtitle="Dernière AG" />
      <StatCard title="Résolutions votées" value="12" icon={CheckCircle} subtitle="Ce trimestre" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {assemblees.map((ag) => (
          <Card key={ag.id} className="glass-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{ag.type}</h3>
                  <p className="text-sm text-primary">{ag.immeuble}</p>
                </div>
                <Badge variant={ag.statut === "terminée" ? "default" : ag.statut === "planifiée" ? "secondary" : "destructive"}>
                  {ag.statut}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{ag.date} à {ag.heure}</span>
                <span>{ag.lieu}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{ag.confirmés}/{ag.convoqués} confirmés</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card border-border/50">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Ordre du jour type</CardTitle></CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {ordresJour.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary font-semibold">{i + 1}.</span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default AssembleesPage;
