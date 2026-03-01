import StatCard from "../StatCard";
import { Hammer, CalendarDays, CreditCard, Star } from "lucide-react";

const IntervenantDashboard = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Bienvenue, Intervenant</h2>
      <p className="text-muted-foreground">Gérez vos missions et facturations</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Missions actives" value="3" icon={Hammer} subtitle="1 urgente" />
      <StatCard title="Ce mois" value="2 400 €" icon={CreditCard} trend="+15% vs mois dernier" />
      <StatCard title="RDV cette semaine" value="5" icon={CalendarDays} />
      <StatCard title="Note moyenne" value="4.8/5" icon={Star} subtitle="32 avis" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <Hammer className="h-5 w-5 text-primary" /> Missions en cours
        </h3>
        <div className="space-y-3">
          {[
            { mission: "Réparation fuite", lieu: "Résidence Les Lilas, Lot 12", urgence: "Urgent" },
            { mission: "Peinture salon", lieu: "15 Rue Voltaire, Apt 3A", urgence: "Normal" },
            { mission: "Remplacement chaudière", lieu: "8 Bd Haussmann", urgence: "Planifié" },
          ].map((m, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{m.mission}</p>
                <p className="text-xs text-muted-foreground">{m.lieu}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                m.urgence === "Urgent" ? "bg-red-500/20 text-red-400" : "bg-primary/20 text-primary"
              }`}>{m.urgence}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" /> Planning de la semaine
        </h3>
        <div className="space-y-3">
          {[
            { jour: "Lundi 2 Mars", heure: "9h00", mission: "Fuite - Résidence Les Lilas" },
            { jour: "Mardi 3 Mars", heure: "14h00", mission: "Peinture - Rue Voltaire" },
            { jour: "Jeudi 5 Mars", heure: "10h00", mission: "Chaudière - Bd Haussmann" },
          ].map((p, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{p.mission}</p>
                <p className="text-xs text-muted-foreground">{p.jour} à {p.heure}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default IntervenantDashboard;
