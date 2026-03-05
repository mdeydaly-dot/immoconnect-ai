import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DocumentsLocatairePage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Mes Documents</h2>
      <p className="text-muted-foreground">Bail, quittances et autres documents</p>
    </div>
    <Card className="glass-card border-border/50">
      <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Documents</CardTitle></CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground py-8">Aucun document disponible</p>
      </CardContent>
    </Card>
  </div>
);

export default DocumentsLocatairePage;
