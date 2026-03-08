import { useState } from "react";
import { FileText, Calculator, Download, AlertTriangle, CheckCircle, Clock, Building, Plus, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from "@/components/dashboard/StatCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Demo data — retenues à la source
const retenuesData = [
  { mois: "Jan", retenues: 1240, honoraires: 8000 },
  { mois: "Fév", retenues: 930, honoraires: 6000 },
  { mois: "Mar", retenues: 1550, honoraires: 10000 },
  { mois: "Avr", retenues: 775, honoraires: 5000 },
  { mois: "Mai", retenues: 1085, honoraires: 7000 },
  { mois: "Jun", retenues: 1395, honoraires: 9000 },
];

const declarationsDemo = [
  { id: "1", type: "retenue_source", periode: "T1 2026", immeuble: "Résidence Les Jasmins", montant: 3720, statut: "validée", echeance: "25/04/2026" },
  { id: "2", type: "retenue_source", periode: "T1 2026", immeuble: "Résidence Ennasr", montant: 5425, statut: "brouillon", echeance: "25/04/2026" },
  { id: "3", type: "tib", periode: "2025", immeuble: "Résidence Les Jasmins", montant: 1840, statut: "soumise", echeance: "30/06/2026" },
  { id: "4", type: "tib", periode: "2025", immeuble: "Résidence Ennasr", montant: 2650, statut: "en_attente", echeance: "30/06/2026" },
  { id: "5", type: "bilan", periode: "2025", immeuble: "Tous immeubles", montant: 13635, statut: "brouillon", echeance: "31/03/2026" },
];

const prestatairesDemo = [
  { nom: "Plomberie Sfaxienne", rne: "1234567A", honoraires: 8500, retenue: 1317.5 },
  { nom: "Électricité Medina", rne: "7654321B", honoraires: 6200, retenue: 961 },
  { nom: "Jardinage El Menzah", rne: "9876543C", honoraires: 3800, retenue: 589 },
  { nom: "Peinture & Déco", rne: "4567890D", honoraires: 12000, retenue: 1860 },
];

const tibData = [
  { name: "Résidence Les Jasmins", value: 1840 },
  { name: "Résidence Ennasr", value: 2650 },
  { name: "Immeuble Lac 2", value: 1200 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))"];

const statutConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  brouillon: { label: "Brouillon", variant: "outline" },
  validée: { label: "Validée", variant: "default" },
  soumise: { label: "Soumise", variant: "secondary" },
  en_attente: { label: "En attente", variant: "destructive" },
};

const typeLabels: Record<string, string> = {
  retenue_source: "Retenue à la source",
  tib: "TIB Parties communes",
  bilan: "Bilan fiscal annuel",
};

const DeclarationsFiscalesPage = () => {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardForm, setWizardForm] = useState({
    type: "retenue_source",
    immeuble: "",
    periode: "",
    frequence: "trimestriel",
  });

  const totalRetenues = retenuesData.reduce((s, r) => s + r.retenues, 0);
  const totalHonoraires = retenuesData.reduce((s, r) => s + r.honoraires, 0);
  const totalTIB = tibData.reduce((s, t) => s + t.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Déclarations Fiscales</h2>
          <p className="text-muted-foreground">Conformité loi 2005-78 · Régime fiscal tunisien</p>
        </div>
        <Dialog open={wizardOpen} onOpenChange={(o) => { setWizardOpen(o); if (!o) setWizardStep(1); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Nouvelle déclaration</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nouvelle déclaration — Étape {wizardStep}/3</DialogTitle>
            </DialogHeader>

            {wizardStep === 1 && (
              <div className="space-y-4 py-4">
                <div>
                  <Label>Type de déclaration</Label>
                  <Select value={wizardForm.type} onValueChange={v => setWizardForm(f => ({ ...f, type: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retenue_source">Retenues à la source (15,5%)</SelectItem>
                      <SelectItem value="tib">TIB Parties communes</SelectItem>
                      <SelectItem value="bilan">Bilan fiscal annuel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Immeuble</Label>
                  <Select value={wizardForm.immeuble} onValueChange={v => setWizardForm(f => ({ ...f, immeuble: v }))}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jasmins">Résidence Les Jasmins</SelectItem>
                      <SelectItem value="ennasr">Résidence Ennasr</SelectItem>
                      <SelectItem value="lac2">Immeuble Lac 2</SelectItem>
                      <SelectItem value="tous">Tous les immeubles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Période</Label>
                    <Input value={wizardForm.periode} onChange={e => setWizardForm(f => ({ ...f, periode: e.target.value }))} placeholder="T1 2026" />
                  </div>
                  <div>
                    <Label>Fréquence</Label>
                    <Select value={wizardForm.frequence} onValueChange={v => setWizardForm(f => ({ ...f, frequence: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mensuel">Mensuel</SelectItem>
                        <SelectItem value="trimestriel">Trimestriel</SelectItem>
                        <SelectItem value="annuel">Annuel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-4 py-4">
                <h4 className="font-semibold text-foreground">Vérification des calculs</h4>
                {wizardForm.type === "retenue_source" ? (
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-muted/30">
                      <p className="text-sm text-muted-foreground mb-2">Honoraires imposables (&gt;200 TND)</p>
                      <p className="text-2xl font-bold text-foreground">15 000 TND</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-2">Retenues à la source (15,5%)</p>
                      <p className="text-2xl font-bold text-primary">2 325 TND</p>
                    </div>
                    <div className="space-y-2">
                      {prestatairesDemo.slice(0, 3).map((p, i) => (
                        <div key={i} className="flex justify-between text-sm p-2 rounded bg-muted/20">
                          <span className="text-foreground">{p.nom}</span>
                          <span className="text-primary font-medium">{p.retenue.toLocaleString()} TND</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : wizardForm.type === "tib" ? (
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-muted/30">
                      <p className="text-sm text-muted-foreground mb-2">Formule : 2% × prix réf. m² × m² communes</p>
                      <p className="text-xs text-muted-foreground">Prix réf. INNORPI : 850 TND/m²</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-2">TIB calculé</p>
                      <p className="text-2xl font-bold text-primary">{totalTIB.toLocaleString()} TND</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground">Synthèse annuelle de toutes les retenues et TIB</p>
                    <p className="text-2xl font-bold text-foreground mt-2">{(totalRetenues + totalTIB).toLocaleString()} TND</p>
                  </div>
                )}
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-4 py-4">
                <h4 className="font-semibold text-foreground">Export et soumission</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" /> Exporter PDF (Formulaire Finances)
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" /> Exporter CSV (Format Recette des Finances)
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" /> Exporter Excel (Bilan complet)
                  </Button>
                </div>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">📋 Archivage légal</p>
                  <p>Les déclarations seront archivées pendant 10 ans conformément à la réglementation fiscale tunisienne.</p>
                </div>
              </div>
            )}

            <DialogFooter className="flex gap-2">
              {wizardStep > 1 && (
                <Button variant="outline" onClick={() => setWizardStep(s => s - 1)}>Précédent</Button>
              )}
              {wizardStep < 3 ? (
                <Button onClick={() => setWizardStep(s => s + 1)} disabled={wizardStep === 1 && !wizardForm.immeuble}>
                  Suivant <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={() => { setWizardOpen(false); setWizardStep(1); }}>
                  Valider et enregistrer
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Retenues S1 2026" value={`${totalRetenues.toLocaleString()} TND`} icon={Calculator} />
        <StatCard title="Honoraires versés" value={`${totalHonoraires.toLocaleString()} TND`} icon={FileText} subtitle="Taux 15,5%" />
        <StatCard title="TIB total" value={`${totalTIB.toLocaleString()} TND`} icon={Building} subtitle="3 immeubles" />
        <StatCard title="Déclarations" value={`${declarationsDemo.length}`} icon={CheckCircle} subtitle="2 en attente" />
      </div>

      <Tabs defaultValue="declarations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="declarations">Déclarations</TabsTrigger>
          <TabsTrigger value="retenues">Retenues à la source</TabsTrigger>
          <TabsTrigger value="tib">TIB</TabsTrigger>
          <TabsTrigger value="prestataires">Prestataires</TabsTrigger>
        </TabsList>

        {/* Déclarations list */}
        <TabsContent value="declarations" className="space-y-4">
          {declarationsDemo.map((d) => (
            <Card key={d.id} className="glass-card border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{typeLabels[d.type]}</h3>
                    <p className="text-sm text-primary">{d.immeuble}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>Période : {d.periode}</span>
                      <span>Échéance : {d.echeance}</span>
                      <span className="font-semibold text-foreground">{d.montant.toLocaleString()} TND</span>
                    </div>
                  </div>
                  <Badge variant={statutConfig[d.statut]?.variant || "outline"}>
                    {statutConfig[d.statut]?.label || d.statut}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Retenues chart */}
        <TabsContent value="retenues" className="space-y-4">
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" /> Retenues à la source — S1 2026
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={retenuesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mois" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`${value.toLocaleString()} TND`]}
                  />
                  <Bar dataKey="honoraires" fill="hsl(var(--muted))" name="Honoraires" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="retenues" fill="hsl(var(--primary))" name="Retenues 15,5%" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Retenues calculées à 15,5% sur honoraires &gt;200 TND (Art. 52 CGI Tunisie)
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TIB chart */}
        <TabsContent value="tib" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" /> TIB par immeuble
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={tibData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value} TND`}>
                      {tibData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value.toLocaleString()} TND`]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Calcul TIB — Formule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="text-sm font-mono text-foreground">TIB = 2% × Prix réf. m² × Superficie communes</p>
                  <p className="text-xs text-muted-foreground mt-2">Mise à jour annuelle INNORPI</p>
                </div>
                {tibData.map((t, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                    <span className="text-sm text-foreground">{t.name}</span>
                    <span className="text-sm font-semibold text-primary">{t.value.toLocaleString()} TND</span>
                  </div>
                ))}
                <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-sm font-semibold text-foreground">Total TIB</span>
                  <span className="text-sm font-bold text-primary">{totalTIB.toLocaleString()} TND</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Prestataires */}
        <TabsContent value="prestataires" className="space-y-4">
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Prestataires et retenues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prestatairesDemo.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium text-foreground">{p.nom}</p>
                      <p className="text-xs text-muted-foreground">RNE : {p.rne}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground">{p.honoraires.toLocaleString()} TND</p>
                      <p className="text-xs text-primary font-medium">Retenue : {p.retenue.toLocaleString()} TND</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Alertes échéances */}
      <Card className="glass-card border-border/50 border-l-4 border-l-destructive">
        <CardContent className="p-5">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-destructive" /> Alertes échéances fiscales
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/5">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-destructive" />
                <span className="text-sm text-foreground">Déclaration retenues T1 2026</span>
              </div>
              <span className="text-xs text-destructive font-medium">Échéance : 25/04/2026 (48 jours)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">TIB annuel 2025</span>
              </div>
              <span className="text-xs text-muted-foreground">Échéance : 30/06/2026 (114 jours)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeclarationsFiscalesPage;
