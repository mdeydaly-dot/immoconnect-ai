import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RapportsPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Rapports</h2>
      <p className="text-muted-foreground">Analysez vos performances</p>
    </div>
    <Card className="glass-card border-border/50">
      <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" />Statistiques</CardTitle></CardHeader>
      <CardContent><p className="text-center text-muted-foreground py-8">Pas encore de données à afficher</p></CardContent>
    </Card>
  </div>
);

export default RapportsPage;
