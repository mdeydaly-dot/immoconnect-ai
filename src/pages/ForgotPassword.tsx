import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, ArrowLeft, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-primary/10 p-2">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              Immo<span className="text-gradient-gold">Link</span>
            </span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-foreground">Mot de passe oublié</h1>
          <p className="text-muted-foreground mt-2">Recevez un lien de réinitialisation par email</p>
        </div>

        {sent ? (
          <div className="glass-card rounded-xl p-8 text-center space-y-4">
            <Mail className="h-12 w-12 text-primary mx-auto" />
            <h2 className="font-display text-xl font-semibold text-foreground">Email envoyé !</h2>
            <p className="text-muted-foreground text-sm">
              Si un compte existe avec l'adresse <strong>{email}</strong>, vous recevrez un lien de réinitialisation.
            </p>
            <Link to="/login">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />Retour à la connexion
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="glass-card rounded-xl p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com" required />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer le lien"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              <Link to="/login" className="text-primary hover:underline">
                <ArrowLeft className="h-3 w-3 inline mr-1" />Retour à la connexion
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
