import { FileText, Download, FolderOpen, Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const documents = [
  { id: "1", nom: "Bail - T3 Paris 11e", type: "Contrat", bien: "T3 Paris 11e", date: "01/03/2024", taille: "245 Ko" },
  { id: "2", nom: "Quittance Mars 2026", type: "Quittance", bien: "T3 Paris 11e", date: "01/03/2026", taille: "120 Ko" },
  { id: "3", nom: "État des lieux entrée", type: "EDL", bien: "T2 Lyon 6e", date: "15/06/2023", taille: "1.2 Mo" },
  { id: "4", nom: "Diagnostic DPE", type: "Diagnostic", bien: "Studio Marseille", date: "10/08/2025", taille: "890 Ko" },
  { id: "5", nom: "Mise en demeure", type: "Courrier", bien: "T2 Lyon 6e", date: "15/02/2026", taille: "95 Ko" },
  { id: "6", nom: "Assurance PNO", type: "Assurance", bien: "T3 Paris 11e", date: "01/01/2026", taille: "340 Ko" },
];

const typeColors: Record<string, string> = {
  Contrat: "bg-primary/20 text-primary",
  Quittance: "bg-green-500/20 text-green-400",
  EDL: "bg-blue-500/20 text-blue-400",
  Diagnostic: "bg-yellow-500/20 text-yellow-400",
  Courrier: "bg-destructive/20 text-destructive",
  Assurance: "bg-purple-500/20 text-purple-400",
};

const DocumentsProprietairePage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Documents</h2>
        <p className="text-muted-foreground">Contrats, quittances, diagnostics et courriers</p>
      </div>
      <Button><Plus className="h-4 w-4 mr-2" />Ajouter</Button>
    </div>

    <div className="flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Rechercher un document..." className="pl-9" />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {["Contrats", "Quittances", "Courriers"].map((cat) => (
        <div key={cat} className="glass-card rounded-xl p-5 flex items-center gap-3">
          <FolderOpen className="h-8 w-8 text-primary" />
          <div>
            <p className="font-semibold text-foreground">{cat}</p>
            <p className="text-xs text-muted-foreground">{documents.filter(d => d.type === cat.slice(0, -1) || (cat === "Courriers" && d.type === "Courrier")).length} documents</p>
          </div>
        </div>
      ))}
    </div>

    <Card className="glass-card border-border/50">
      <CardHeader><CardTitle className="text-lg">Tous les documents</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-2">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{doc.nom}</p>
                  <p className="text-xs text-muted-foreground">{doc.bien} · {doc.date} · {doc.taille}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[doc.type] || ""}`}>{doc.type}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default DocumentsProprietairePage;
