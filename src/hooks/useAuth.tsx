import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: AppRole | null;
  loading: boolean;
  isDemo: boolean;
  signOut: () => Promise<void>;
  enterDemo: (role: AppRole) => void;
  exitDemo: () => void;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  role: null,
  loading: true,
  isDemo: false,
  signOut: async () => {},
  enterDemo: () => {},
  exitDemo: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [demoRole, setDemoRole] = useState<AppRole | null>(null);

  const fetchRole = async (userId: string) => {
    const { data } = await supabase.rpc("get_user_role", { _user_id: userId });
    setRole(data as AppRole | null);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => fetchRole(session.user.id), 0);
        } else if (!isDemo) {
          setRole(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRole(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setRole(null);
    setIsDemo(false);
    setDemoRole(null);
  };

  const enterDemo = (r: AppRole) => {
    setIsDemo(true);
    setDemoRole(r);
    setRole(r);
    setLoading(false);
  };

  const exitDemo = () => {
    setIsDemo(false);
    setDemoRole(null);
    if (!user) setRole(null);
  };

  const currentRole = isDemo ? demoRole : role;

  return (
    <AuthContext.Provider value={{ session, user, role: currentRole, loading, isDemo, signOut, enterDemo, exitDemo }}>
      {children}
    </AuthContext.Provider>
  );
};
