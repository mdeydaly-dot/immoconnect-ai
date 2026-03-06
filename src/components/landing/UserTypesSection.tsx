import { motion } from "framer-motion";
import { Building, Home, Key, Wrench, Landmark, BedDouble } from "lucide-react";
import { Link } from "react-router-dom";

const userTypes = [
  {
    icon: Building,
    title: "Agents Immobiliers",
    demoRole: "agent",
    description: "Gérez vos mandats, trouvez les locataires parfaits grâce au matching IA.",
    features: ["Matching intelligent", "CRM intégré", "Rapports automatisés"],
  },
  {
    icon: Landmark,
    title: "Syndics",
    demoRole: "syndic",
    description: "Administrez vos copropriétés, assemblées générales et appels de fonds.",
    features: ["AG en ligne", "Appels de fonds", "Suivi interventions"],
  },
  {
    icon: Home,
    title: "Propriétaires",
    demoRole: "proprietaire",
    description: "Suivez vos biens, encaissez vos loyers et calculez votre rendement.",
    features: ["Rendement locatif", "Gestion des baux", "Comptabilité"],
  },
  {
    icon: Key,
    title: "Locataires",
    demoRole: "locataire",
    description: "Payez votre loyer en ligne et signalez vos demandes en un clic.",
    features: ["Paiement en ligne", "Demandes", "Documents"],
  },
  {
    icon: Wrench,
    title: "Intervenants",
    demoRole: "intervenant",
    description: "Recevez des missions qualifiées et facturez sur la plateforme.",
    features: ["Missions ciblées", "Planning intégré", "Facturation auto"],
  },
  {
    icon: BedDouble,
    title: "Conciergerie",
    demoRole: "conciergerie",
    description: "Gérez les locations courte durée et coordonnez vos prestataires.",
    features: ["Réservations", "Réseau intervenants", "Contrats propriétaires"],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const UserTypesSection = () => {
  return (
    <section id="users" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Une plateforme, <span className="text-gradient-gold">6 profils</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Chaque utilisateur bénéficie d'un espace dédié. Cliquez pour explorer en mode démo.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {userTypes.map((user) => (
            <Link key={user.title} to={`/demo/${user.demoRole}`}>
              <motion.div
                variants={item}
                className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group cursor-pointer h-full"
              >
                <div className="rounded-lg bg-primary/10 p-3 w-fit mb-5 group-hover:bg-primary/20 transition-colors">
                  <user.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {user.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {user.description}
                </p>
                <ul className="space-y-2">
                  {user.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UserTypesSection;
