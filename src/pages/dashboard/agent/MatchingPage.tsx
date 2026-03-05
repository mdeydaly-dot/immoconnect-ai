import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MatchingPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Matching</h2>
      <p className="text-muted-foreground">Trouvez les correspondances biens / acheteurs</p>
    </div>
    <Card className="glass-card border-border/50">
      <CardHeader><CardTitle className="flex items-center gap-2"><Search className="h-5 w-5 text-primary" />Recherche intelligente</CardTitle></CardHeader>
      <CardContent><p className="text-center text-muted-foreground py-8">Fonctionnalité bientôt disponible</p></CardContent>
    </Card>
  </div>
);

export default MatchingPage;
