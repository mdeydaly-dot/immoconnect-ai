import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PlanningPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Planning</h2>
      <p className="text-muted-foreground">Votre calendrier d'interventions</p>
    </div>
    <Card className="glass-card border-border/50">
      <CardHeader><CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" />Calendrier</CardTitle></CardHeader>
      <CardContent><p className="text-center text-muted-foreground py-8">Aucune intervention planifiée</p></CardContent>
    </Card>
  </div>
);

export default PlanningPage;
