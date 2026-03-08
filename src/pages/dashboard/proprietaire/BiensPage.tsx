import { useState } from "react";
import { Home, Plus, TrendingUp, MapPin, Euro, Trash2 } from "lucide-react";
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
import { useBiens } from "@/hooks/useBiens";
import { Skeleton } from "@/components/ui/skeleton";

const BiensPage = () => {
  const { data: biens = [], isLoading, addBien, deleteBien } = useBiens();
  const [selectedBien, setSelectedBien] = useState<typeof biens[0] | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    nom: "", adresse: "", type: "Appartement", surface: 0,
    prix_achat: 0, travaux: 0, loyer_mensuel: 0, charges: 0, taxe_fonciere: 0, statut: "vacant",
  });

  const handleAdd = () => {
    addBien.mutate(form, {
      onSuccess: () => {
        setOpen(false);
        setForm({ nom: "", adresse: "", type: "Appartement", surface: 0, prix_achat: 0, travaux: 0, loyer_mensuel: 0, charges: 0, taxe_fonciere: 0, statut: "vacant" });
      },
    });
  };

  const calcRendBrut = (b: typeof biens[0]) => b.prix_achat > 0 ? ((Number(b.loyer_mensuel) * 12) / Number(b.prix_achat) * 100) : 0;
  const calcRendNet = (b: typeof biens[0]) => {
    const revenuNet = Number(b.loyer_mensuel) * 12 - Number(b.charges) * 12 - Number(b.taxe_fonciere);
    return (Number(b.prix_achat) + Number(b.travaux)) > 0 ? (revenuNet / (Number(b.prix_achat) + Number(b.travaux)) * 100) : 0;
  };
  const cashFlow = (b: typeof biens[0]) => Number(b.loyer_mensuel) - Number(b.charges) - Number(b.taxe_fonciere) / 12;

  const totalInvesti = biens.reduce((s, b) => s + Number(b.prix_achat) + Number(b.travaux), 0);
  const loyerTotal = biens.reduce((s, b) => s + Number(b.loyer_mensuel), 0);
  const biensLoues = biens.filter(b => b.statut === "loué").length;
  const rendNets = biens.filter(b => calcRendNet(b) > 0);
  const rendMoyen = rendNets.length > 0 ? rendNets.reduce((s, b) => s + calcRendNet(b), 0) / rendNets.length : 0;

  if (isLoading) return <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-32 w-full" />)}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Mes Biens</h2>
          <p className="text-muted-foreground">Gérez votre patrimoine immobilier</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Ajouter un bien</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Ajouter un bien immobilier</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Nom</Label><Input value={form.nom} onChange={e => setForm(f => ({...f, nom: e.target.value}))} placeholder="T3 Paris 11e" /></div>
                <div>
                  <Label>Type</Label>
                  <Select value={form.type} onValueChange={v => setForm(f => ({...f, type: v}))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Studio">Studio</SelectItem>
                      <SelectItem value="Appartement T2">T2</SelectItem>
                      <SelectItem value="Appartement T3">T3</SelectItem>
                      <SelectItem value="Appartement T4">T4</SelectItem>
                      <SelectItem value="Maison">Maison</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Adresse</Label><Input value={form.adresse} onChange={e => setForm(f => ({...f, adresse: e.target.value}))} placeholder="Adresse complète" /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Surface (m²)</Label><Input type="number" value={form.surface || ""} onChange={e => setForm(f => ({...f, surface: +e.target.value}))} /></div>
                <div><Label>Prix d'achat (€)</Label><Input type="number" value={form.prix_achat || ""} onChange={e => setForm(f => ({...f, prix_achat: +e.target.value}))} /></div>
                <div><Label>Travaux (€)</Label><Input type="number" value={form.travaux || ""} onChange={e => setForm(f => ({...f, travaux: +e.target.value}))} /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Loyer (€/mois)</Label><Input type="number" value={form.loyer_mensuel || ""} onChange={e => setForm(f => ({...f, loyer_mensuel: +e.target.value}))} /></div>
                <div><Label>Charges (€/mois)</Label><Input type="number" value={form.charges || ""} onChange={e => setForm(f => ({...f, charges: +e.target.value}))} /></div>
                <div><Label>Taxe foncière (€/an)</Label><Input type="number" value={form.taxe_fonciere || ""} onChange={e => setForm(f => ({...f, taxe_fonciere: +e.target.value}))} /></div>
              </div>
              <div>
                <Label>Statut</Label>
                <Select value={form.statut} onValueChange={v => setForm(f => ({...f, statut: v}))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loué">Loué</SelectItem>
                    <SelectItem value="vacant">Vacant</SelectItem>
                    <SelectItem value="en travaux">En travaux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter><Button onClick={handleAdd} disabled={addBien.isPending || !form.nom}>{addBien.isPending ? "Enregistrement..." : "Enregistrer"}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Patrimoine total</p>
          <p className="text-2xl font-bold text-foreground">{(totalInvesti / 1000).toFixed(0)}k TND</p>
          <p className="text-xs text-muted-foreground">{biens.length} biens</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Revenus mensuels</p>
           <p className="text-2xl font-bold text-foreground">{loyerTotal.toLocaleString()} TND</p>
           <p className="text-xs text-muted-foreground">{loyerTotal * 12} TND/an</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Rendement net moyen</p>
          <p className="text-2xl font-bold text-primary">{rendMoyen.toFixed(2)}%</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Taux d'occupation</p>
          <p className="text-2xl font-bold text-foreground">{biens.length > 0 ? ((biensLoues / biens.length) * 100).toFixed(0) : 0}%</p>
          <p className="text-xs text-muted-foreground">{biensLoues}/{biens.length} loués</p>
        </div>
      </div>

      {biens.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">Aucun bien enregistré</h3>
          <p className="text-muted-foreground mb-4">Commencez par ajouter votre premier bien immobilier</p>
          <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" />Ajouter un bien</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {biens.map((bien) => (
            <Card key={bien.id} className="glass-card border-border/50 cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelectedBien(bien)}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{bien.nom}</CardTitle>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" />{bien.adresse || "Adresse non renseignée"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={bien.statut === "loué" ? "default" : bien.statut === "vacant" ? "destructive" : "secondary"}>{bien.statut}</Badge>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); deleteBien.mutate(bien.id); }}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div><p className="text-xs text-muted-foreground">Loyer</p><p className="font-semibold text-foreground">{Number(bien.loyer_mensuel) > 0 ? `${Number(bien.loyer_mensuel)} TND` : "—"}</p></div>
                  <div><p className="text-xs text-muted-foreground">Rend. brut</p><p className="font-semibold text-foreground">{calcRendBrut(bien) > 0 ? `${calcRendBrut(bien).toFixed(2)}%` : "—"}</p></div>
                  <div><p className="text-xs text-muted-foreground">Rend. net</p><p className={`font-semibold ${calcRendNet(bien) > 0 ? "text-primary" : "text-destructive"}`}>{calcRendNet(bien).toFixed(2)}%</p></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail dialog */}
      <Dialog open={!!selectedBien} onOpenChange={(o) => !o && setSelectedBien(null)}>
        <DialogContent className="max-w-2xl">
          {selectedBien && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Home className="h-5 w-5 text-primary" />{selectedBien.nom}</DialogTitle>
                <p className="text-sm text-muted-foreground">{selectedBien.adresse}</p>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-foreground flex items-center gap-2"><Euro className="h-4 w-4 text-primary" />Finances</h4>
                  <div className="space-y-2 text-sm">
                     <div className="flex justify-between"><span className="text-muted-foreground">Prix d'achat</span><span>{Number(selectedBien.prix_achat).toLocaleString()} TND</span></div>
                     <div className="flex justify-between"><span className="text-muted-foreground">Travaux</span><span>{Number(selectedBien.travaux).toLocaleString()} TND</span></div>
                     <div className="flex justify-between"><span className="text-muted-foreground">Coût total</span><span className="font-semibold">{(Number(selectedBien.prix_achat) + Number(selectedBien.travaux)).toLocaleString()} TND</span></div>
                     <hr className="border-border" />
                     <div className="flex justify-between"><span className="text-muted-foreground">Loyer mensuel</span><span>{Number(selectedBien.loyer_mensuel)} TND</span></div>
                     <div className="flex justify-between"><span className="text-muted-foreground">Charges</span><span>-{Number(selectedBien.charges)} TND</span></div>
                     <div className="flex justify-between"><span className="text-muted-foreground">Taxe foncière</span><span>{Number(selectedBien.taxe_fonciere)} TND/an</span></div>
                     <div className="flex justify-between"><span className="text-muted-foreground">Cash-flow</span><span className="font-semibold text-primary">{cashFlow(selectedBien).toFixed(0)} TND/mois</span></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-foreground flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" />Rendement locatif</h4>
                  <div className="space-y-3">
                    <div className="glass-card rounded-lg p-4 text-center">
                      <p className="text-xs text-muted-foreground">Rendement brut</p>
                      <p className="text-3xl font-bold text-foreground">{calcRendBrut(selectedBien).toFixed(2)}%</p>
                    </div>
                    <div className="glass-card rounded-lg p-4 text-center border border-primary/20">
                      <p className="text-xs text-muted-foreground">Rendement net</p>
                      <p className="text-3xl font-bold text-primary">{calcRendNet(selectedBien).toFixed(2)}%</p>
                    </div>
                    <div className="glass-card rounded-lg p-4 text-center">
                      <p className="text-xs text-muted-foreground">Cash-flow mensuel</p>
                      <p className={`text-2xl font-bold ${cashFlow(selectedBien) > 0 ? "text-primary" : "text-destructive"}`}>{cashFlow(selectedBien).toFixed(0)} TND</p>
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
