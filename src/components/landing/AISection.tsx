import { motion } from "framer-motion";
import { Bot, Brain, MessageSquare, Search, Zap, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Matching IA",
    description:
      "Notre algorithme connecte automatiquement locataires et biens disponibles selon 50+ critères.",
  },
  {
    icon: Bot,
    title: "Chatbot 24/7",
    description:
      "Un assistant virtuel répond instantanément aux questions de vos locataires et prospects.",
  },
  {
    icon: Brain,
    title: "Agents IA",
    description:
      "Des agents autonomes gèrent la prospection, les relances et l'analyse de marché.",
  },
  {
    icon: TrendingUp,
    title: "Analyse prédictive",
    description:
      "Prédisez les tendances du marché, les risques d'impayés et les besoins de maintenance.",
  },
  {
    icon: MessageSquare,
    title: "Communication intelligente",
    description:
      "Génération automatique de messages personnalisés pour chaque interlocuteur.",
  },
  {
    icon: Zap,
    title: "Automatisation",
    description:
      "Workflows automatisés pour les tâches répétitives : relances, rapports, facturation.",
  },
];

const AISection = () => {
  return (
    <section id="ai" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Intelligence Artificielle</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            L'IA au cœur de <span className="text-gradient-gold">votre gestion</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Des outils intelligents qui travaillent pour vous, jour et nuit.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AISection;
