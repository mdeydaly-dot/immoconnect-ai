import { Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfilMetierPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Profil Métier</h2>
      <p className="text-muted-foreground">Vos compétences et certifications</p>
    </div>
    <Card className="glass-card border-border/50">
      <CardHeader><CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5 text-primary" />Informations professionnelles</CardTitle></CardHeader>
      <CardContent><p className="text-center text-muted-foreground py-8">Complétez votre profil métier pour recevoir des missions</p></CardContent>
    </Card>
  </div>
);

export default ProfilMetierPage;
