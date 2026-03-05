import { FileText, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MandatsPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Mandats</h2>
        <p className="text-muted-foreground">Gérez vos mandats de vente et location</p>
      </div>
      <Button><Plus className="h-4 w-4 mr-2" />Nouveau mandat</Button>
    </div>
    <Card className="glass-card border-border/50">
      <CardHeader><CardTitle>Liste des mandats</CardTitle></CardHeader>
      <CardContent><p className="text-center text-muted-foreground py-8">Aucun mandat enregistré</p></CardContent>
    </Card>
  </div>
);

export default MandatsPage;
