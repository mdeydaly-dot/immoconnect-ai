import { useAuth } from "@/hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AgentDashboard from "@/components/dashboard/roles/AgentDashboard";
import SyndicDashboard from "@/components/dashboard/roles/SyndicDashboard";
import ProprietaireDashboard from "@/components/dashboard/roles/ProprietaireDashboard";
import LocataireDashboard from "@/components/dashboard/roles/LocataireDashboard";
import IntervenantDashboard from "@/components/dashboard/roles/IntervenantDashboard";

// Propriétaire pages
import BiensPage from "@/pages/dashboard/proprietaire/BiensPage";
import LocatairesPage from "@/pages/dashboard/proprietaire/LocatairesPage";
import LoyersPage from "@/pages/dashboard/proprietaire/LoyersPage";
import DocumentsProprietairePage from "@/pages/dashboard/proprietaire/DocumentsProprietairePage";
import ComptabilitePage from "@/pages/dashboard/proprietaire/ComptabilitePage";
import ConciergeriePage from "@/pages/dashboard/proprietaire/ConciergeriePage";

// Syndic pages
import ImmeublesPage from "@/pages/dashboard/syndic/ImmeublesPage";
import CoproprietairesPage from "@/pages/dashboard/syndic/CoproprietairesPage";
import AppelsFondsPage from "@/pages/dashboard/syndic/AppelsFondsPage";
import AssembleesPage from "@/pages/dashboard/syndic/AssembleesPage";
import InterventionsPage from "@/pages/dashboard/syndic/InterventionsPage";
import ComptabiliteSyndicPage from "@/pages/dashboard/syndic/ComptabiliteSyndicPage";
import DocumentsSyndicPage from "@/pages/dashboard/syndic/DocumentsSyndicPage";

// Shared pages
import MessagesPage from "@/pages/dashboard/shared/MessagesPage";

const Dashboard = () => {
  const { role } = useAuth();

  const renderHome = () => {
    switch (role) {
      case "agent": return <AgentDashboard />;
      case "syndic": return <SyndicDashboard />;
      case "proprietaire": return <ProprietaireDashboard />;
      case "locataire": return <LocataireDashboard />;
      case "intervenant": return <IntervenantDashboard />;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <Routes>
        <Route index element={renderHome()} />

        {/* Propriétaire routes */}
        <Route path="biens" element={<BiensPage />} />
        <Route path="locataires" element={<LocatairesPage />} />
        <Route path="loyers" element={<LoyersPage />} />
        <Route path="conciergerie" element={<ConciergeriePage />} />

        {/* Syndic routes */}
        <Route path="immeubles" element={<ImmeublesPage />} />
        <Route path="coproprietaires" element={<CoproprietairesPage />} />
        <Route path="appels-fonds" element={<AppelsFondsPage />} />
        <Route path="assemblees" element={<AssembleesPage />} />
        <Route path="interventions" element={<InterventionsPage />} />

        {/* Shared routes (role-aware) */}
        <Route path="documents" element={role === "syndic" ? <DocumentsSyndicPage /> : <DocumentsProprietairePage />} />
        <Route path="comptabilite" element={role === "syndic" ? <ComptabiliteSyndicPage /> : <ComptabilitePage />} />
        <Route path="messages" element={<MessagesPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
