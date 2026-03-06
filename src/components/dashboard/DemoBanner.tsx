import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, LogIn } from "lucide-react";

const DemoBanner = () => {
  const { isDemo, exitDemo } = useAuth();
  const navigate = useNavigate();

  if (!isDemo) return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-primary">
        <Eye className="h-4 w-4" />
        <span className="font-medium">Mode démonstration</span>
        <span className="text-muted-foreground">— Données fictives, lecture seule</span>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          exitDemo();
          navigate("/signup");
        }}
      >
        <LogIn className="h-3 w-3 mr-1" />
        Créer un compte
      </Button>
    </div>
  );
};

export default DemoBanner;
