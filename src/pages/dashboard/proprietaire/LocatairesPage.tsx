import { useState } from "react";
import { Users, Mail, Phone, AlertCircle, CheckCircle, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocataires } from "@/hooks/useLocataires";
import { useBiens } from "@/hooks/useBiens";
import { Skeleton } from "@/components/ui/skeleton";

const LocatairesPage = () => {
  const { data: locataires = [], isLoading, addLocataire, deleteLocataire } = useLocataires();
  const { data: biens = [] } = useBiens();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", bien_id: null as string | null, loyer: 0, depot_garantie: 0, statut: "actif", date_debut_bail: null as string | null, date_fin_bail: null as string | null });

  const handleAdd = () => {
    addLocataire.mutate(form, {
      onSuccess: () => { setOpen(false); setForm({ nom: "", email: "", telephone: "", bien_id: null, loyer: 0, depot_garantie: 0, statut: "actif", date_debut_bail: null, date_fin_bail: null }); },
    });
  };

  if (isLoading) return <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-24 w-full" />)}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Locataires</h2>
          <p className="text-muted-foreground">Gérez vos locataires et leurs contrats</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Ajouter</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Ajouter un locataire</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div><Label>Nom</Label><Input value={form.nom} onChange={e => setForm(f => ({...f, nom: e.target.value}))} placeholder="Jean Dupont" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Email</Label><Input value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} /></div>
                <div><Label>Téléphone</Label><Input value={form.telephone} onChange={e => setForm(f => ({...f, telephone: e.target.value}))} /></div>
              </div>
              <div>
                <Label>Bien associé</Label>
                <Select value={form.bien_id || ""} onValueChange={v => setForm(f => ({...f, bien_id: v}))}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner un bien" /></SelectTrigger>
                  <SelectContent>{biens.map(b => <SelectItem key={b.id} value={b.id}>{b.nom}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Loyer (€)</Label><Input type="number" value={form.loyer || ""} onChange={e => setForm(f => ({...f, loyer: +e.target.value}))} /></div>
                <div><Label>Dépôt de garantie (€)</Label><Input type="number" value={form.depot_garantie || ""} onChange={e => setForm(f => ({...f, depot_garantie: +e.target.value}))} /></div>
              </div>
            </div>
            <DialogFooter><Button onClick={handleAdd} disabled={addLocataire.isPending || !form.nom}>{addLocataire.isPending ? "..." : "Enregistrer"}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Total locataires</p>
          <p className="text-2xl font-bold text-foreground">{locataires.length}</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Actifs</p>
          <p className="text-2xl font-bold text-primary">{locataires.filter(l => l.statut === "actif").length}</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Garanties détenues</p>
          <p className="text-2xl font-bold text-foreground">{locataires.reduce((s, l) => s + Number(l.depot_garantie), 0).toLocaleString()} €</p>
        </div>
      </div>

      {locataires.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">Aucun locataire</h3>
          <p className="text-muted-foreground mb-4">Ajoutez votre premier locataire</p>
          <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" />Ajouter</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {locataires.map((loc) => (
            <Card key={loc.id} className="glass-card border-border/50">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">{loc.nom.split(" ").map(n => n[0]).join("").slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-semibold text-foreground">{loc.nom}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={loc.statut === "actif" ? "default" : "secondary"}>{loc.statut}</Badge>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteLocataire.mutate(loc.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                      </div>
                    </div>
                    <p className="text-sm text-primary mt-0.5">{loc.biens?.nom || "Aucun bien"} — {Number(loc.loyer)} €/mois</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      {loc.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{loc.email}</span>}
                      {loc.telephone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{loc.telephone}</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocatairesPage;
