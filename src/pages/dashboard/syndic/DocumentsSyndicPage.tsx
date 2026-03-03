import { FileText, Download, FolderOpen, Plus, Search, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const documents = [
  { id: "1", nom: "PV AG Ordinaire 2025", type: "PV Assemblée", immeuble: "Résidence Les Lilas", date: "15/12/2025", taille: "1.5 Mo" },
  { id: "2", nom: "Budget prévisionnel 2026", type: "Budget", immeuble: "Résidence Voltaire", date: "01/01/2026", taille: "340 Ko" },
  { id: "3", nom: "Contrat syndic", type: "Contrat", immeuble: "Le Clos Saint-Martin", date: "01/07/2024", taille: "890 Ko" },
  { id: "4", nom: "Appel de fonds T1 2026", type: "Appel", immeuble: "Résidence du Parc", date: "02/01/2026", taille: "120 Ko" },
  { id: "5", nom: "Diagnostic amiante", type: "Diagnostic", immeuble: "Résidence Les Lilas", date: "10/06/2023", taille: "2.1 Mo" },
  { id: "6", nom: "Règlement de copropriété", type: "Règlement", immeuble: "Résidence Voltaire", date: "15/03/2020", taille: "4.2 Mo" },
];

const typeColors: Record<string, string> = {
  "PV Assemblée": "bg-primary/20 text-primary",
  Budget: "bg-green-500/20 text-green-400",
  Contrat: "bg-blue-500/20 text-blue-400",
  Appel: "bg-yellow-500/20 text-yellow-400",
  Diagnostic: "bg-purple-500/20 text-purple-400",
  Règlement: "bg-muted text-muted-foreground",
};

const DocumentsSyndicPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Documents</h2>
        <p className="text-muted-foreground">Archives et documents de copropriété</p>
      </div>
      <Button><Plus className="h-4 w-4 mr-2" />Ajouter</Button>
    </div>

    <div className="flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Rechercher un document..." className="pl-9" />
      </div>
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
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Building className="h-3 w-3" />{doc.immeuble} · {doc.date} · {doc.taille}</p>
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

export default DocumentsSyndicPage;
