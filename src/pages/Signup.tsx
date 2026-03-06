import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, UserPlus, Building, Home, Key, Wrench, Landmark, BedDouble } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

const roles: { value: AppRole; label: string; icon: React.ElementType; description: string }[] = [
  { value: "agent", label: "Agent Immobilier", icon: Building, description: "Gérez vos mandats et clients" },
  { value: "syndic", label: "Syndic d'Immeuble", icon: Landmark, description: "Administrez vos copropriétés" },
  { value: "proprietaire", label: "Propriétaire", icon: Home, description: "Suivez vos biens et loyers" },
  { value: "locataire", label: "Locataire", icon: Key, description: "Gérez votre logement" },
  { value: "intervenant", label: "Intervenant", icon: Wrench, description: "Recevez des missions" },
  { value: "conciergerie", label: "Conciergerie", icon: BedDouble, description: "Gérez les locations courte durée" },
];

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedRole, setSelectedRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast({ title: "Sélectionnez un profil", description: "Veuillez choisir votre type de compte.", variant: "destructive" });
      return;
    }
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (error) {
      toast({ title: "Erreur d'inscription", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    if (data.user) {
      // Insert role
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: data.user.id,
        role: selectedRole,
      });

      if (roleError) {
        toast({ title: "Erreur", description: "Impossible d'assigner le rôle.", variant: "destructive" });
      } else {
        toast({ title: "Inscription réussie !", description: "Bienvenue sur ImmoLink !" });
        navigate("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-primary/10 p-2">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              Immo<span className="text-gradient-gold">Link</span>
            </span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-foreground">Créer un compte</h1>
          <p className="text-muted-foreground mt-2">Choisissez votre profil et inscrivez-vous</p>
        </div>

        <form onSubmit={handleSignup} className="glass-card rounded-xl p-8 space-y-6">
          {/* Role selection */}
          <div className="space-y-3">
            <Label>Type de compte</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setSelectedRole(r.value)}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all text-left ${
                    selectedRole === r.value
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border/50 hover:border-primary/30 text-muted-foreground"
                  }`}
                >
                  <r.icon className={`h-5 w-5 mt-0.5 shrink-0 ${selectedRole === r.value ? "text-primary" : ""}`} />
                  <div>
                    <div className="font-medium text-sm">{r.label}</div>
                    <div className="text-xs opacity-70">{r.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Nom complet</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jean Dupont" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" minLength={6} required />
          </div>
          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
            <UserPlus className="h-4 w-4" />
            {loading ? "Inscription..." : "S'inscrire"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-primary hover:underline">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
