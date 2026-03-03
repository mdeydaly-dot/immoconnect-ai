import { useState } from "react";
import { Home, Plus, TrendingUp, MapPin, Percent, Euro, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Bien {
  id: string;
  nom: string;
  adresse: string;
  type: string;
  surface: number;
  loyerMensuel: number;
  charges: number;
  taxeFonciere: number;
  prixAchat: number;
  travaux: number;
  statut: "loué" | "vacant" | "en travaux";
  locataire?: string;
  rendementBrut: number;
  rendementNet: number;
  tauxOccupation: number;
}

const mockBiens: Bien[] = [
  {
    id: "1", nom: "T3 Paris 11e", adresse: "42 rue de la Roquette, 75011 Paris",
    type: "Appartement T3", surface: 65, loyerMensuel: 1200, charges: 180,
    taxeFonciere: 1800, prixAchat: 350000, travaux: 15000, statut: "loué",
    locataire: "M. Dupont", rendementBrut: 4.11, rendementNet: 3.12, tauxOccupation: 100,
  },
  {
    id: "2", nom: "T2 Lyon 6e", adresse: "15 avenue Foch, 69006 Lyon",
    type: "Appartement T2", surface: 45, loyerMensuel: 800, charges: 120,
    taxeFonciere: 1100, prixAchat: 220000, travaux: 8000, statut: "loué",
    locataire: "Mme Martin", rendementBrut: 4.36, rendementNet: 3.28, tauxOccupation: 92,
  },
  {
    id: "3", nom: "Studio Marseille", adresse: "8 bd Longchamp, 13001 Marseille",
    type: "Studio", surface: 28, loyerMensuel: 550, charges: 80,
    taxeFonciere: 650, prixAchat: 120000, travaux: 5000, statut: "loué",
    locataire: "M. Leblanc", rendementBrut: 5.5, rendementNet: 4.18, tauxOccupation: 100,
  },
  {
    id: "4", nom: "T4 Bordeaux", adresse: "22 rue Sainte-Catherine, 33000 Bordeaux",
    type: "Appartement T4", surface: 85, loyerMensuel: 0, charges: 200,
    taxeFonciere: 2200, prixAchat: 380000, travaux: 25000, statut: "vacant",
    rendementBrut: 0, rendementNet: -0.63, tauxOccupation: 0,
  },
];

const BiensPage = () => {
  const [biens] = useState<Bien[]>(mockBiens);
  const [selectedBien, setSelectedBien] = useState<Bien | null>(null);

  const totalInvesti = biens.reduce((s, b) => s + b.prixAchat + b.travaux, 0);
  const loyerTotal = biens.reduce((s, b) => s + b.loyerMensuel, 0);
  const rendementMoyen = biens.filter(b => b.rendementNet > 0).reduce((s, b) => s + b.rendementNet, 0) / biens.filter(b => b.rendementNet > 0).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Mes Biens</h2>
          <p className="text-muted-foreground">Gérez votre patrimoine immobilier</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Ajouter un bien</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Ajouter un bien immobilier</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Nom du bien</Label><Input placeholder="Ex: T3 Paris 11e" /></div>
                <div>
                  <Label>Type</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="t2">T2</SelectItem>
                      <SelectItem value="t3">T3</SelectItem>
                      <SelectItem value="t4">T4</SelectItem>
                      <SelectItem value="maison">Maison</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Adresse</Label><Input placeholder="Adresse complète" /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Surface (m²)</Label><Input type="number" placeholder="65" /></div>
                <div><Label>Prix d'achat (€)</Label><Input type="number" placeholder="350000" /></div>
                <div><Label>Travaux (€)</Label><Input type="number" placeholder="15000" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Loyer mensuel (€)</Label><Input type="number" placeholder="1200" /></div>
                <div><Label>Charges (€/mois)</Label><Input type="number" placeholder="180" /></div>
                <div><Label>Taxe foncière (€/an)</Label><Input type="number" placeholder="1800" /></div>
              </div>
            </div>
            <DialogFooter><Button>Enregistrer</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPIs patrimoine */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Patrimoine total</p>
          <p className="text-2xl font-bold text-foreground">{(totalInvesti / 1000).toFixed(0)}k €</p>
          <p className="text-xs text-muted-foreground">{biens.length} biens</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Revenus mensuels</p>
          <p className="text-2xl font-bold text-foreground">{loyerTotal.toLocaleString()} €</p>
          <p className="text-xs text-muted-foreground">{loyerTotal * 12} €/an</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Rendement net moyen</p>
          <p className="text-2xl font-bold text-primary">{rendementMoyen.toFixed(2)}%</p>
          <p className="text-xs text-muted-foreground">Après charges et taxes</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Taux d'occupation</p>
          <p className="text-2xl font-bold text-foreground">{((biens.filter(b => b.statut === "loué").length / biens.length) * 100).toFixed(0)}%</p>
          <p className="text-xs text-muted-foreground">{biens.filter(b => b.statut === "loué").length}/{biens.length} biens loués</p>
        </div>
      </div>

      {/* Liste des biens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {biens.map((bien) => (
          <Card key={bien.id} className="glass-card border-border/50 cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelectedBien(bien)}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{bien.nom}</CardTitle>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />{bien.adresse}
                  </p>
                </div>
                <Badge variant={bien.statut === "loué" ? "default" : bien.statut === "vacant" ? "destructive" : "secondary"}>
                  {bien.statut}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Loyer</p>
                  <p className="font-semibold text-foreground">{bien.loyerMensuel > 0 ? `${bien.loyerMensuel} €` : "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Rend. brut</p>
                  <p className="font-semibold text-foreground">{bien.rendementBrut > 0 ? `${bien.rendementBrut}%` : "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Rend. net</p>
                  <p className={`font-semibold ${bien.rendementNet > 0 ? "text-primary" : "text-destructive"}`}>
                    {bien.rendementNet !== 0 ? `${bien.rendementNet}%` : "—"}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Occupation</span>
                  <span className="text-foreground">{bien.tauxOccupation}%</span>
                </div>
                <Progress value={bien.tauxOccupation} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selectedBien} onOpenChange={(o) => !o && setSelectedBien(null)}>
        <DialogContent className="max-w-2xl">
          {selectedBien && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />{selectedBien.nom}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">{selectedBien.adresse}</p>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-foreground flex items-center gap-2">
                    <Euro className="h-4 w-4 text-primary" />Finances
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Prix d'achat</span><span className="text-foreground">{selectedBien.prixAchat.toLocaleString()} €</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Travaux</span><span className="text-foreground">{selectedBien.travaux.toLocaleString()} €</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Coût total</span><span className="font-semibold text-foreground">{(selectedBien.prixAchat + selectedBien.travaux).toLocaleString()} €</span></div>
                    <hr className="border-border" />
                    <div className="flex justify-between"><span className="text-muted-foreground">Loyer mensuel</span><span className="text-foreground">{selectedBien.loyerMensuel} €</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Charges mensuelles</span><span className="text-foreground">-{selectedBien.charges} €</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Taxe foncière</span><span className="text-foreground">{selectedBien.taxeFonciere} €/an</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Loyer net mensuel</span><span className="font-semibold text-primary">{(selectedBien.loyerMensuel - selectedBien.charges - selectedBien.taxeFonciere / 12).toFixed(0)} €</span></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />Rendement locatif
                  </h4>
                  <div className="space-y-3">
                    <div className="glass-card rounded-lg p-4 text-center">
                      <p className="text-xs text-muted-foreground">Rendement brut</p>
                      <p className="text-3xl font-bold text-foreground">{selectedBien.rendementBrut}%</p>
                      <p className="text-xs text-muted-foreground mt-1">Loyer annuel / Prix achat</p>
                    </div>
                    <div className="glass-card rounded-lg p-4 text-center border border-primary/20">
                      <p className="text-xs text-muted-foreground">Rendement net</p>
                      <p className="text-3xl font-bold text-primary">{selectedBien.rendementNet}%</p>
                      <p className="text-xs text-muted-foreground mt-1">Net de charges et taxes</p>
                    </div>
                    <div className="glass-card rounded-lg p-4 text-center">
                      <p className="text-xs text-muted-foreground">Cash-flow mensuel</p>
                      <p className={`text-2xl font-bold ${(selectedBien.loyerMensuel - selectedBien.charges - selectedBien.taxeFonciere / 12) > 0 ? "text-primary" : "text-destructive"}`}>
                        {(selectedBien.loyerMensuel - selectedBien.charges - selectedBien.taxeFonciere / 12).toFixed(0)} €
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BiensPage;
