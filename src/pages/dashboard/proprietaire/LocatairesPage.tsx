import { Users, Mail, Phone, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const locataires = [
  { id: "1", nom: "M. Jean Dupont", email: "jean.dupont@email.com", tel: "06 12 34 56 78", bien: "T3 Paris 11e", loyer: 1200, bail: "01/03/2024 - 28/02/2027", statut: "À jour", garantie: 2400 },
  { id: "2", nom: "Mme Sophie Martin", email: "sophie.martin@email.com", tel: "06 98 76 54 32", bien: "T2 Lyon 6e", loyer: 800, bail: "15/06/2023 - 14/06/2026", statut: "En retard", garantie: 1600 },
  { id: "3", nom: "M. Pierre Leblanc", email: "pierre.leblanc@email.com", tel: "06 55 44 33 22", bien: "Studio Marseille", loyer: 550, bail: "01/09/2025 - 31/08/2028", statut: "À jour", garantie: 1100 },
];

const LocatairesPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Locataires</h2>
      <p className="text-muted-foreground">Gérez vos locataires et leurs contrats</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="glass-card rounded-xl p-5">
        <p className="text-sm text-muted-foreground">Total locataires</p>
        <p className="text-2xl font-bold text-foreground">{locataires.length}</p>
      </div>
      <div className="glass-card rounded-xl p-5">
        <p className="text-sm text-muted-foreground">Paiements à jour</p>
        <p className="text-2xl font-bold text-primary">{locataires.filter(l => l.statut === "À jour").length}/{locataires.length}</p>
      </div>
      <div className="glass-card rounded-xl p-5">
        <p className="text-sm text-muted-foreground">Garanties détenues</p>
        <p className="text-2xl font-bold text-foreground">{locataires.reduce((s, l) => s + l.garantie, 0).toLocaleString()} €</p>
      </div>
    </div>

    <div className="space-y-4">
      {locataires.map((loc) => (
        <Card key={loc.id} className="glass-card border-border/50">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {loc.nom.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-foreground">{loc.nom}</h3>
                  <Badge variant={loc.statut === "À jour" ? "default" : "destructive"} className="flex items-center gap-1">
                    {loc.statut === "À jour" ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                    {loc.statut}
                  </Badge>
                </div>
                <p className="text-sm text-primary mt-0.5">{loc.bien} — {loc.loyer} €/mois</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{loc.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{loc.tel}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Bail : {loc.bail} · Dépôt : {loc.garantie} €</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default LocatairesPage;
