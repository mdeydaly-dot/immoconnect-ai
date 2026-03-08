import { useState } from "react";
import { CreditCard, TrendingUp, AlertTriangle, CheckCircle, Clock, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLoyers } from "@/hooks/useLoyers";
import { useBiens } from "@/hooks/useBiens";
import { useLocataires } from "@/hooks/useLocataires";
import StatCard from "@/components/dashboard/StatCard";
import { Skeleton } from "@/components/ui/skeleton";

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
  "payé": { icon: CheckCircle, color: "text-green-400", label: "Payé" },
  "en retard": { icon: AlertTriangle, color: "text-destructive", label: "En retard" },
  "en attente": { icon: Clock, color: "text-yellow-400", label: "En attente" },
};

const LoyersPage = () => {
  const { data: loyers = [], isLoading, addLoyer, updateLoyer } = useLoyers();
  const { data: biens = [] } = useBiens();
  const { data: locataires = [] } = useLocataires();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ bien_id: "", locataire_id: null as string | null, mois: "", montant: 0, statut: "en attente", date_paiement: null as string | null });

  const handleAdd = () => {
    addLoyer.mutate(form, {
      onSuccess: () => { setOpen(false); setForm({ bien_id: "", locataire_id: null, mois: "", montant: 0, statut: "en attente", date_paiement: null }); },
    });
  };

  const totalMois = loyers.reduce((s, p) => s + Number(p.montant), 0);
  const paye = loyers.filter(p => p.statut === "payé").reduce((s, p) => s + Number(p.montant), 0);
  const impaye = loyers.filter(p => p.statut === "en retard").length;

  if (isLoading) return <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-24 w-full" />)}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Suivi des Loyers</h2>
          <p className="text-muted-foreground">Encaissements et relances</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Enregistrer un loyer</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Enregistrer un paiement</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label>Bien</Label>
                <Select value={form.bien_id} onValueChange={v => setForm(f => ({...f, bien_id: v}))}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>{biens.map(b => <SelectItem key={b.id} value={b.id}>{b.nom}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Locataire</Label>
                <Select value={form.locataire_id || ""} onValueChange={v => setForm(f => ({...f, locataire_id: v}))}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>{locataires.map(l => <SelectItem key={l.id} value={l.id}>{l.nom}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Mois</Label><Input value={form.mois} onChange={e => setForm(f => ({...f, mois: e.target.value}))} placeholder="Mars 2026" /></div>
                <div><Label>Montant (TND)</Label><Input type="number" value={form.montant || ""} onChange={e => setForm(f => ({...f, montant: +e.target.value}))} /></div>
              </div>
              <div>
                <Label>Statut</Label>
                <Select value={form.statut} onValueChange={v => setForm(f => ({...f, statut: v}))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payé">Payé</SelectItem>
                    <SelectItem value="en attente">En attente</SelectItem>
                    <SelectItem value="en retard">En retard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter><Button onClick={handleAdd} disabled={addLoyer.isPending || !form.bien_id || !form.mois}>{addLoyer.isPending ? "..." : "Enregistrer"}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total loyers" value={`${totalMois.toLocaleString()} TND`} icon={CreditCard} />
        <StatCard title="Encaissés" value={`${paye.toLocaleString()} TND`} icon={CheckCircle} trend={totalMois > 0 ? `${((paye / totalMois) * 100).toFixed(0)}%` : "0%"} />
        <StatCard title="Impayés" value={`${impaye}`} icon={AlertTriangle} subtitle={`${(totalMois - paye).toLocaleString()} TND en attente`} />
        <StatCard title="Paiements" value={`${loyers.length}`} icon={TrendingUp} />
      </div>

      <Card className="glass-card border-border/50">
        <CardHeader><CardTitle className="text-lg">Historique des paiements</CardTitle></CardHeader>
        <CardContent>
          {loyers.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Aucun paiement enregistré</p>
          ) : (
            <div className="space-y-3">
              {loyers.map((p) => {
                const cfg = statusConfig[p.statut] || statusConfig["en attente"];
                const Icon = cfg.icon;
                return (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${cfg.color}`} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{p.biens?.nom || "—"}</p>
                        <p className="text-xs text-muted-foreground">{p.locataires?.nom || "—"} · {p.mois}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">{Number(p.montant)} TND</p>
                      </div>
                      {p.statut !== "payé" && (
                        <Button size="sm" variant="outline" onClick={() => updateLoyer.mutate({ id: p.id, statut: "payé", date_paiement: new Date().toISOString() })}>
                          Marquer payé
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyersPage;
