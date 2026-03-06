import { Users, Home, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import StatCard from "@/components/dashboard/StatCard";

const proprietaires = [
  { id: "1", nom: "Jean Dupont", biens: 3, email: "jean@exemple.com", tel: "06 12 34 56 78" },
  { id: "2", nom: "Marie Martin", biens: 2, email: "marie@exemple.com", tel: "06 98 76 54 32" },
  { id: "3", nom: "Paul Durand", biens: 1, email: "paul@exemple.com", tel: "06 11 22 33 44" },
  { id: "4", nom: "Claire Leroy", biens: 4, email: "claire@exemple.com", tel: "06 55 66 77 88" },
];

const ProprietairesConciergeriePage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Propriétaires partenaires</h2>
      <p className="text-muted-foreground">Vos propriétaires et leurs biens</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Propriétaires" value={String(proprietaires.length)} icon={Users} />
      <StatCard title="Biens gérés" value="10" icon={Home} />
      <StatCard title="Nouveaux ce mois" value="1" icon={Users} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {proprietaires.map((p) => (
        <Card key={p.id} className="glass-card border-border/50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground">{p.nom}</h3>
            <p className="text-sm text-primary">{p.biens} bien(s) en gestion</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{p.email}</span>
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{p.tel}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default ProprietairesConciergeriePage;
