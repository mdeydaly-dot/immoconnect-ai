import { Building2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-lg font-bold">
                Immo<span className="text-gradient-gold">Link</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La plateforme immobilière intelligente qui connecte tous les acteurs du marché.
            </p>
          </div>

          {[
            {
              title: "Produit",
              links: ["Fonctionnalités", "Tarifs", "Intégrations", "API"],
            },
            {
              title: "Ressources",
              links: ["Documentation", "Blog", "Guides", "Webinaires"],
            },
            {
              title: "Entreprise",
              links: ["À propos", "Carrières", "Contact", "Mentions légales"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-foreground mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/30 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 ImmoLink. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
