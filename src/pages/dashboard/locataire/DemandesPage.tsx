import { ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DemandesPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Mes Demandes</h2>
      <p className="text-muted-foreground">Suivez vos demandes d'intervention</p>
    </div>
    <Card className="glass-card border-border/50">
      <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5 text-primary" />Demandes</CardTitle></CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground py-8">Aucune demande en cours</p>
      </CardContent>
    </Card>
  </div>
);

export default DemandesPage;
