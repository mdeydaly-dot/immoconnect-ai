import StatCard from "../StatCard";
import { Home, CreditCard, ClipboardList, MessageSquare } from "lucide-react";

const LocataireDashboard = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Bienvenue, Locataire</h2>
      <p className="text-muted-foreground">Gérez votre logement en toute simplicité</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Mon loyer" value="850 TND" icon={CreditCard} subtitle="Prélèvement le 5" />
      <StatCard title="Logement" value="T2 Paris 11e" icon={Home} />
      <StatCard title="Demandes" value="1" icon={ClipboardList} subtitle="En cours de traitement" />
      <StatCard title="Messages" value="3" icon={MessageSquare} subtitle="1 non lu" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" /> Historique paiements
        </h3>
        <div className="space-y-3">
          {[
            { mois: "Mars 2026", montant: "850 TND", statut: "À venir" },
            { mois: "Février 2026", montant: "850 TND", statut: "Payé" },
            { mois: "Janvier 2026", montant: "850 TND", statut: "Payé" },
          ].map((p, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{p.mois}</p>
                <p className="text-xs text-muted-foreground">{p.montant}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                p.statut === "Payé" ? "bg-green-500/20 text-green-400" : "bg-primary/20 text-primary"
              }`}>{p.statut}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" /> Mes demandes
        </h3>
        <div className="space-y-3">
          {[
            { titre: "Fuite robinet cuisine", date: "25/02/2026", statut: "En cours" },
            { titre: "Changement serrure", date: "10/01/2026", statut: "Résolu" },
          ].map((d, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{d.titre}</p>
                <p className="text-xs text-muted-foreground">{d.date}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                d.statut === "Résolu" ? "bg-green-500/20 text-green-400" : "bg-primary/20 text-primary"
              }`}>{d.statut}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default LocataireDashboard;
