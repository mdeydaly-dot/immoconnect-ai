import StatCard from "../StatCard";
import { Building, Users, CreditCard, Hammer, CalendarDays, AlertTriangle } from "lucide-react";

const SyndicDashboard = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Bienvenue, Syndic</h2>
      <p className="text-muted-foreground">Gestion de vos copropriétés</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Immeubles gérés" value="8" icon={Building} />
      <StatCard title="Copropriétaires" value="124" icon={Users} subtitle="3 nouveaux ce mois" />
      <StatCard title="Appels de fonds" value="42 800 TND" icon={CreditCard} subtitle="78% recouvrés" />
      <StatCard title="Interventions" value="6" icon={Hammer} subtitle="2 urgentes" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" /> Interventions urgentes
        </h3>
        <div className="space-y-3">
          {[
            { immeuble: "Résidence Les Lilas", probleme: "Fuite toiture - Lot 12", statut: "En cours" },
            { immeuble: "Résidence Voltaire", probleme: "Panne ascenseur", statut: "Planifiée" },
          ].map((i, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{i.probleme}</p>
                <p className="text-xs text-muted-foreground">{i.immeuble}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">{i.statut}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" /> Prochaines assemblées
        </h3>
        <div className="space-y-3">
          {[
            { immeuble: "Résidence Les Lilas", date: "15 Mars 2026", type: "AG Ordinaire" },
            { immeuble: "Résidence Voltaire", date: "22 Mars 2026", type: "AG Extraordinaire" },
          ].map((a, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{a.type}</p>
                <p className="text-xs text-muted-foreground">{a.immeuble}</p>
              </div>
              <span className="text-xs text-muted-foreground">{a.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default SyndicDashboard;
