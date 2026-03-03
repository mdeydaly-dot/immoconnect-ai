import { Users, Mail, Phone, CheckCircle, AlertCircle, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StatCard from "@/components/dashboard/StatCard";

const coproprietaires = [
  { id: "1", nom: "M. Bernard Duval", email: "b.duval@email.com", tel: "06 11 22 33 44", immeuble: "Résidence Les Lilas", lot: "Lot 3 - T3", tantièmes: 45, statut: "À jour" },
  { id: "2", nom: "Mme Claire Petit", email: "c.petit@email.com", tel: "06 55 66 77 88", immeuble: "Résidence Les Lilas", lot: "Lot 7 - T2", tantièmes: 32, statut: "En retard" },
  { id: "3", nom: "M. Alain Moreau", email: "a.moreau@email.com", tel: "06 99 88 77 66", immeuble: "Résidence Voltaire", lot: "Lot 12 - T4", tantièmes: 65, statut: "À jour" },
  { id: "4", nom: "SCI Les Acacias", email: "contact@sci-acacias.fr", tel: "01 23 45 67 89", immeuble: "Résidence du Parc", lot: "Lots 5,6,7", tantièmes: 120, statut: "À jour" },
  { id: "5", nom: "Mme Fatima El Amrani", email: "f.elamrani@email.com", tel: "06 33 44 55 66", immeuble: "Le Clos Saint-Martin", lot: "Lot 2 - T3", tantièmes: 50, statut: "En retard" },
];

const CoproprietairesPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Copropriétaires</h2>
      <p className="text-muted-foreground">Annuaire et suivi des copropriétaires</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Copropriétaires" value={`${coproprietaires.length}`} icon={Users} />
      <StatCard title="À jour" value={`${coproprietaires.filter(c => c.statut === "À jour").length}`} icon={CheckCircle} />
      <StatCard title="En retard" value={`${coproprietaires.filter(c => c.statut === "En retard").length}`} icon={AlertCircle} subtitle="Relances à envoyer" />
    </div>

    <div className="space-y-3">
      {coproprietaires.map((c) => (
        <Card key={c.id} className="glass-card border-border/50">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {c.nom.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-foreground">{c.nom}</h3>
                  <Badge variant={c.statut === "À jour" ? "default" : "destructive"}>{c.statut}</Badge>
                </div>
                <p className="text-sm text-primary mt-0.5 flex items-center gap-1"><Building className="h-3 w-3" />{c.immeuble} — {c.lot}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{c.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{c.tel}</span>
                  <span>Tantièmes : {c.tantièmes}/1000</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CoproprietairesPage;
