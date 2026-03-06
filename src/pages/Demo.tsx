import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

const validRoles: AppRole[] = ["agent", "syndic", "proprietaire", "locataire", "intervenant", "conciergerie"];

const Demo = () => {
  const { role } = useParams<{ role: string }>();
  const { enterDemo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const r = role as AppRole;
    if (validRoles.includes(r)) {
      enterDemo(r);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [role]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
};

export default Demo;
