import { CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FacturationPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Facturation</h2>
      <p className="text-muted-foreground">Gérez vos factures et paiements</p>
    </div>
    <Card className="glass-card border-border/50">
      <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" />Factures</CardTitle></CardHeader>
      <CardContent><p className="text-center text-muted-foreground py-8">Aucune facture émise</p></CardContent>
    </Card>
  </div>
);

export default FacturationPage;
