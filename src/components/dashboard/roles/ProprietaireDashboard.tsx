import StatCard from "../StatCard";
import { Home, CreditCard, Key, FileText, BedDouble, TrendingUp } from "lucide-react";

const ProprietaireDashboard = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Bienvenue, Propriétaire</h2>
      <p className="text-muted-foreground">Gérez vos biens immobiliers</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Biens" value="4" icon={Home} subtitle="3 loués, 1 vacant" />
      <StatCard title="Loyers perçus" value="5 200 TND" icon={CreditCard} trend="+100% encaissement" />
      <StatCard title="Locataires" value="3" icon={Key} />
      <StatCard title="Locations courtes" value="1" icon={BedDouble} subtitle="12 réservations ce mois" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" /> Suivi des loyers
        </h3>
        <div className="space-y-3">
          {[
            { bien: "S+3 La Marsa", locataire: "M. Ben Ali", montant: "1 200 TND", statut: "Payé" },
            { bien: "S+2 Ennasr", locataire: "Mme Trabelsi", montant: "800 TND", statut: "En retard" },
            { bien: "Studio Lac 2", locataire: "M. Hammami", montant: "550 TND", statut: "Payé" },
          ].map((l, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{l.bien}</p>
                <p className="text-xs text-muted-foreground">{l.locataire} · {l.montant}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                l.statut === "Payé" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              }`}>{l.statut}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" /> Documents récents
        </h3>
        <div className="space-y-3">
          {[
            { nom: "Bail - T3 Paris 11e", type: "Contrat", date: "01/02/2026" },
            { nom: "Quittance Février", type: "Quittance", date: "28/02/2026" },
            { nom: "État des lieux - Lyon", type: "EDL", date: "15/01/2026" },
          ].map((d, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{d.nom}</p>
                <p className="text-xs text-muted-foreground">{d.type}</p>
              </div>
              <span className="text-xs text-muted-foreground">{d.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ProprietaireDashboard;
