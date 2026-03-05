import { CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaiementsPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Mes Paiements</h2>
      <p className="text-muted-foreground">Historique de vos paiements de loyer</p>
    </div>
    <Card className="glass-card border-border/50">
      <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" />Historique</CardTitle></CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground py-8">Aucun paiement enregistré</p>
      </CardContent>
    </Card>
  </div>
);

export default PaiementsPage;
