import { Building, Users, Hammer, MapPin, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/dashboard/StatCard";

const immeubles = [
  { id: "1", nom: "Résidence Les Jasmins", adresse: "12 rue des Jasmins, La Marsa", lots: 24, coproprietaires: 20, charges: "4 200 TND/mois", tauxRecouvrement: 82, interventionsEnCours: 2 },
  { id: "2", nom: "Résidence Ennasr", adresse: "45 av. Hédi Nouira, Ennasr", lots: 36, coproprietaires: 30, charges: "6 800 TND/mois", tauxRecouvrement: 91, interventionsEnCours: 1 },
  { id: "3", nom: "Immeuble Lac 2", adresse: "8 rue du Lac Léman, Lac 2", lots: 18, coproprietaires: 16, charges: "2 900 TND/mois", tauxRecouvrement: 95, interventionsEnCours: 0 },
  { id: "4", nom: "Résidence Carthage", adresse: "3 rue Hannibal, Carthage", lots: 42, coproprietaires: 38, charges: "7 500 TND/mois", tauxRecouvrement: 76, interventionsEnCours: 3 },
];

const ImmeublesPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Immeubles</h2>
        <p className="text-muted-foreground">Gestion de vos copropriétés</p>
      </div>
      <Button><Plus className="h-4 w-4 mr-2" />Ajouter un immeuble</Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="Immeubles gérés" value={`${immeubles.length}`} icon={Building} />
      <StatCard title="Total lots" value={`${immeubles.reduce((s, i) => s + i.lots, 0)}`} icon={Building} />
      <StatCard title="Copropriétaires" value={`${immeubles.reduce((s, i) => s + i.coproprietaires, 0)}`} icon={Users} />
      <StatCard title="Interventions en cours" value={`${immeubles.reduce((s, i) => s + i.interventionsEnCours, 0)}`} icon={Hammer} subtitle="dont 2 urgentes" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {immeubles.map((imm) => (
        <Card key={imm.id} className="glass-card border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{imm.nom}</CardTitle>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" />{imm.adresse}</p>
              </div>
              {imm.interventionsEnCours > 0 && (
                <Badge variant="destructive">{imm.interventionsEnCours} intervention{imm.interventionsEnCours > 1 ? "s" : ""}</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 text-center mb-3">
              <div><p className="text-xs text-muted-foreground">Lots</p><p className="font-semibold text-foreground">{imm.lots}</p></div>
              <div><p className="text-xs text-muted-foreground">Copropriétaires</p><p className="font-semibold text-foreground">{imm.coproprietaires}</p></div>
              <div><p className="text-xs text-muted-foreground">Charges</p><p className="font-semibold text-foreground">{imm.charges}</p></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Recouvrement charges</span>
                <span className={imm.tauxRecouvrement >= 90 ? "text-primary" : imm.tauxRecouvrement >= 80 ? "text-yellow-400" : "text-destructive"}>{imm.tauxRecouvrement}%</span>
              </div>
              <Progress value={imm.tauxRecouvrement} className="h-1.5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default ImmeublesPage;
