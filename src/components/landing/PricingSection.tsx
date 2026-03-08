import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Crown, Gem, Rocket, Star } from "lucide-react";

const plans = [
  {
    name: "Gratuit",
    price: "0 TND",
    period: "/mois",
    description: "Pour découvrir la plateforme",
    icon: Rocket,
    featured: false,
    features: [
      "1 bien géré",
      "Matching basique",
      "Chatbot limité (50 msg/mois)",
      "Tableau de bord",
      "Support email",
    ],
    cta: "Commencer",
  },
  {
    name: "Premium",
    price: "89 TND",
    period: "/mois",
    description: "Pour les indépendants",
    icon: Star,
    featured: false,
    features: [
      "10 biens gérés",
      "Matching IA avancé",
      "Chatbot illimité",
      "Agents IA basiques",
      "Analyse de marché",
      "Support prioritaire",
    ],
    cta: "Choisir Premium",
  },
  {
    name: "Gold",
    price: "249 TND",
    period: "/mois",
    description: "Pour les professionnels",
    icon: Crown,
    featured: true,
    features: [
      "Biens illimités",
      "Matching IA premium",
      "Chatbot personnalisé",
      "Agents IA avancés",
      "Analyse prédictive",
      "API & intégrations",
      "Support dédié 24/7",
    ],
    cta: "Choisir Gold",
  },
  {
    name: "Platinium",
    price: "599 TND",
    period: "/mois",
    description: "Pour les agences & groupes",
    icon: Gem,
    featured: false,
    features: [
      "Tout Gold inclus",
      "Multi-agences",
      "IA sur mesure",
      "Marque blanche",
      "Formation dédiée",
      "SLA garanti",
      "Account manager",
    ],
    cta: "Contacter",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Des tarifs <span className="text-gradient-gold">adaptés</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Du particulier à l'agence, trouvez le forfait qui vous correspond.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-6 flex flex-col transition-all duration-300 ${
                plan.featured
                  ? "glass-card border-primary/40 glow-gold relative"
                  : "glass-card hover:border-primary/20"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  Populaire
                </div>
              )}

              <div className="rounded-lg bg-primary/10 p-2.5 w-fit mb-4">
                <plan.icon className="h-5 w-5 text-primary" />
              </div>

              <h3 className="font-display text-xl font-bold text-foreground">
                {plan.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="font-display text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.featured ? "hero" : "hero-outline"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
