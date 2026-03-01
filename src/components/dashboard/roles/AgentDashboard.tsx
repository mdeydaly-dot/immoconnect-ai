import StatCard from "../StatCard";
import { FileText, Users, Search, CreditCard, TrendingUp, BarChart3 } from "lucide-react";

const AgentDashboard = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Bienvenue, Agent</h2>
      <p className="text-muted-foreground">Vue d'ensemble de votre activité immobilière</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Mandats actifs" value="12" icon={FileText} trend="+2 ce mois" />
      <StatCard title="Clients" value="48" icon={Users} subtitle="18 acquéreurs, 30 vendeurs" />
      <StatCard title="Matchings IA" value="24" icon={Search} subtitle="6 en attente" />
      <StatCard title="Commissions" value="18 400 €" icon={CreditCard} trend="+12% vs mois dernier" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" /> Matchings récents
        </h3>
        <div className="space-y-3">
          {[
            { locataire: "Marie Dupont", bien: "T3 Paris 11e", score: "94%" },
            { locataire: "Paul Martin", bien: "Studio Lyon 3e", score: "87%" },
            { locataire: "Sophie Leblanc", bien: "T2 Marseille 6e", score: "82%" },
          ].map((m, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{m.locataire}</p>
                <p className="text-xs text-muted-foreground">{m.bien}</p>
              </div>
              <span className="text-sm font-bold text-primary">{m.score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" /> Activité récente
        </h3>
        <div className="space-y-3">
          {[
            { action: "Nouveau mandat ajouté", detail: "Appartement T4, Rue de Rivoli", time: "Il y a 2h" },
            { action: "Visite planifiée", detail: "Studio, Bd Haussmann", time: "Il y a 4h" },
            { action: "Offre acceptée", detail: "T2, Rue Oberkampf", time: "Hier" },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{a.action}</p>
                <p className="text-xs text-muted-foreground">{a.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AgentDashboard;
