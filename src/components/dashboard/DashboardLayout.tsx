import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import DemoBanner from "@/components/dashboard/DemoBanner";
import {
  Building2, LogOut, Menu, X, Home, Building, Key, Wrench, Landmark,
  LayoutDashboard, FileText, CreditCard, MessageSquare, Settings, Users, Search,
  CalendarDays, ClipboardList, BookOpen, Hammer, BarChart3, BedDouble, Briefcase
} from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const roleNavItems: Record<AppRole, NavItem[]> = {
  agent: [
    { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
    { label: "Mandats", href: "/dashboard/mandats", icon: FileText },
    { label: "Matching", href: "/dashboard/matching", icon: Search },
    { label: "Clients", href: "/dashboard/clients", icon: Users },
    { label: "Messagerie", href: "/dashboard/messages", icon: MessageSquare },
    { label: "Comptabilité", href: "/dashboard/comptabilite", icon: CreditCard },
    { label: "Rapports", href: "/dashboard/rapports", icon: BarChart3 },
  ],
  syndic: [
    { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
    { label: "Immeubles", href: "/dashboard/immeubles", icon: Building },
    { label: "Copropriétaires", href: "/dashboard/coproprietaires", icon: Users },
    { label: "Appels de fonds", href: "/dashboard/appels-fonds", icon: CreditCard },
    { label: "Assemblées", href: "/dashboard/assemblees", icon: CalendarDays },
    { label: "Interventions", href: "/dashboard/interventions", icon: Hammer },
    { label: "Comptabilité", href: "/dashboard/comptabilite", icon: BarChart3 },
    { label: "Documents", href: "/dashboard/documents", icon: BookOpen },
  ],
  proprietaire: [
    { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
    { label: "Mes biens", href: "/dashboard/biens", icon: Home },
    { label: "Locataires", href: "/dashboard/locataires", icon: Key },
    { label: "Loyers", href: "/dashboard/loyers", icon: CreditCard },
    { label: "Documents", href: "/dashboard/documents", icon: BookOpen },
    { label: "Comptabilité", href: "/dashboard/comptabilite", icon: BarChart3 },
    { label: "Conciergerie", href: "/dashboard/conciergerie", icon: BedDouble },
    { label: "Messagerie", href: "/dashboard/messages", icon: MessageSquare },
  ],
  locataire: [
    { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
    { label: "Mon logement", href: "/dashboard/logement", icon: Home },
    { label: "Paiements", href: "/dashboard/paiements", icon: CreditCard },
    { label: "Demandes", href: "/dashboard/demandes", icon: ClipboardList },
    { label: "Documents", href: "/dashboard/documents", icon: FileText },
    { label: "Messagerie", href: "/dashboard/messages", icon: MessageSquare },
  ],
  intervenant: [
    { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
    { label: "Missions", href: "/dashboard/missions", icon: Hammer },
    { label: "Planning", href: "/dashboard/planning", icon: CalendarDays },
    { label: "Facturation", href: "/dashboard/facturation", icon: CreditCard },
    { label: "Messagerie", href: "/dashboard/messages", icon: MessageSquare },
    { label: "Profil métier", href: "/dashboard/profil", icon: Settings },
  ],
  conciergerie: [
    { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
    { label: "Contrats", href: "/dashboard/contrats", icon: Briefcase },
    { label: "Propriétaires", href: "/dashboard/proprietaires", icon: Users },
    { label: "Intervenants", href: "/dashboard/intervenants-reseau", icon: Wrench },
    { label: "Réservations", href: "/dashboard/conciergerie", icon: CalendarDays },
    { label: "Messagerie", href: "/dashboard/messages", icon: MessageSquare },
    { label: "Facturation", href: "/dashboard/facturation", icon: CreditCard },
  ],
};

const roleLabels: Record<AppRole, { label: string; icon: React.ElementType }> = {
  agent: { label: "Agent Immobilier", icon: Building },
  syndic: { label: "Syndic", icon: Landmark },
  proprietaire: { label: "Propriétaire", icon: Home },
  locataire: { label: "Locataire", icon: Key },
  intervenant: { label: "Intervenant", icon: Wrench },
  conciergerie: { label: "Conciergerie", icon: BedDouble },
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, role, signOut, isDemo } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (!role) return null;

  const navItems = roleNavItems[role];
  const roleInfo = roleLabels[role];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DemoBanner />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Link to="/" className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-1.5">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <span className="font-display text-lg font-bold">
                  Immo<span className="text-gradient-gold">Link</span>
                </span>
              </Link>
              <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2 text-sm">
                <roleInfo.icon className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">{roleInfo.label}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {isDemo ? "Mode démonstration" : user?.email}
              </p>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-3 border-t border-border">
              {isDemo ? (
                <Link to="/signup">
                  <Button variant="ghost" className="w-full justify-start">
                    <Key className="h-4 w-4 mr-2" />
                    Créer un compte
                  </Button>
                </Link>
              ) : (
                <Button variant="ghost" className="w-full justify-start" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              )}
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <div className="flex-1 lg:ml-64">
          <header className="sticky top-0 z-30 bg-card/80 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3 lg:px-6">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-display text-lg font-semibold text-foreground">
              {navItems.find((i) => i.href === location.pathname)?.label || "Tableau de bord"}
            </h1>
          </header>
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
