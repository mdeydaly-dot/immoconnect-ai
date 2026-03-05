import { Users, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ClientsPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Clients</h2>
        <p className="text-muted-foreground">Gérez votre portefeuille clients</p>
      </div>
      <Button><Plus className="h-4 w-4 mr-2" />Ajouter un client</Button>
    </div>
    <Card className="glass-card border-border/50">
      <CardHeader><CardTitle>Liste des clients</CardTitle></CardHeader>
      <CardContent><p className="text-center text-muted-foreground py-8">Aucun client enregistré</p></CardContent>
    </Card>
  </div>
);

export default ClientsPage;
