import { Home, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LogementPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Mon Logement</h2>
      <p className="text-muted-foreground">Informations sur votre logement actuel</p>
    </div>
    <Card className="glass-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Home className="h-5 w-5 text-primary" />Détails du logement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <Home className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Aucun logement associé pour le moment.</p>
          <p className="text-sm mt-2">Contactez votre propriétaire pour être lié à un bien.</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default LogementPage;
