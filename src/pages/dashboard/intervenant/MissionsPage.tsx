import { Hammer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MissionsPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Mes Missions</h2>
      <p className="text-muted-foreground">Consultez et gérez vos missions d'intervention</p>
    </div>
    <Card className="glass-card border-border/50">
      <CardHeader><CardTitle className="flex items-center gap-2"><Hammer className="h-5 w-5 text-primary" />Missions actives</CardTitle></CardHeader>
      <CardContent><p className="text-center text-muted-foreground py-8">Aucune mission en cours</p></CardContent>
    </Card>
  </div>
);

export default MissionsPage;
