import { motion } from "framer-motion";
import { Building, Home, Key, Wrench } from "lucide-react";

const userTypes = [
  {
    icon: Building,
    title: "Agents Immobiliers",
    description:
      "Gérez vos mandats, trouvez les locataires parfaits grâce au matching IA, et automatisez votre prospection.",
    features: ["Matching intelligent", "CRM intégré", "Rapports automatisés"],
  },
  {
    icon: Home,
    title: "Propriétaires",
    description:
      "Suivez vos biens, encaissez vos loyers, et gérez les interventions depuis une seule interface.",
    features: ["Suivi des loyers", "Gestion des baux", "Comptabilité simplifiée"],
  },
  {
    icon: Key,
    title: "Locataires",
    description:
      "Trouvez le logement idéal, payez votre loyer en ligne, et signalez vos demandes en un clic.",
    features: ["Recherche intelligente", "Paiement en ligne", "Chat direct"],
  },
  {
    icon: Wrench,
    title: "Intervenants",
    description:
      "Recevez des missions qualifiées, planifiez vos interventions et facturez directement sur la plateforme.",
    features: ["Missions ciblées", "Planning intégré", "Facturation auto"],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
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
            Une plateforme, <span className="text-gradient-gold">4 profils</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Chaque utilisateur bénéficie d'un espace dédié et de fonctionnalités adaptées à ses besoins.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {userTypes.map((user) => (
            <motion.div
              key={user.title}
              variants={item}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
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
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UserTypesSection;
