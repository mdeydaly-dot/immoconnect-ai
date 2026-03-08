import { useAuth } from "@/hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AgentDashboard from "@/components/dashboard/roles/AgentDashboard";
import SyndicDashboard from "@/components/dashboard/roles/SyndicDashboard";
import ProprietaireDashboard from "@/components/dashboard/roles/ProprietaireDashboard";
import LocataireDashboard from "@/components/dashboard/roles/LocataireDashboard";
import IntervenantDashboard from "@/components/dashboard/roles/IntervenantDashboard";
import ConciergerieDashboard from "@/components/dashboard/roles/ConciergerieDashboard";

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
import DeclarationsFiscalesPage from "@/pages/dashboard/syndic/DeclarationsFiscalesPage";
import DocumentsSyndicPage from "@/pages/dashboard/syndic/DocumentsSyndicPage";

// Agent pages
import ClientsPage from "@/pages/dashboard/agent/ClientsPage";
import MandatsPage from "@/pages/dashboard/agent/MandatsPage";
import MatchingPage from "@/pages/dashboard/agent/MatchingPage";
import RapportsPage from "@/pages/dashboard/agent/RapportsPage";

// Locataire pages
import LogementPage from "@/pages/dashboard/locataire/LogementPage";
import PaiementsPage from "@/pages/dashboard/locataire/PaiementsPage";
import DemandesPage from "@/pages/dashboard/locataire/DemandesPage";
import DocumentsLocatairePage from "@/pages/dashboard/locataire/DocumentsLocatairePage";

// Intervenant pages
import MissionsPage from "@/pages/dashboard/intervenant/MissionsPage";
import PlanningPage from "@/pages/dashboard/intervenant/PlanningPage";
import FacturationPage from "@/pages/dashboard/intervenant/FacturationPage";
import ProfilMetierPage from "@/pages/dashboard/intervenant/ProfilMetierPage";

// Conciergerie pages
import ContratsConciergeriePage from "@/pages/dashboard/conciergerie/ContratsConciergeriePage";
import ProprietairesConciergeriePage from "@/pages/dashboard/conciergerie/ProprietairesConciergeriePage";
import IntervenantsConciergeriePage from "@/pages/dashboard/conciergerie/IntervenantsConciergeriePage";

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
      case "conciergerie": return <ConciergerieDashboard />;
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
        <Route path="conciergerie" element={role === "conciergerie" ? <ConciergerieDashboard /> : <ConciergeriePage />} />

        {/* Syndic routes */}
        <Route path="immeubles" element={<ImmeublesPage />} />
        <Route path="coproprietaires" element={<CoproprietairesPage />} />
        <Route path="appels-fonds" element={<AppelsFondsPage />} />
        <Route path="assemblees" element={<AssembleesPage />} />
        <Route path="interventions" element={<InterventionsPage />} />
        <Route path="declarations-fiscales" element={<DeclarationsFiscalesPage />} />

        {/* Agent routes */}
        <Route path="mandats" element={<MandatsPage />} />
        <Route path="matching" element={<MatchingPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="rapports" element={<RapportsPage />} />

        {/* Locataire routes */}
        <Route path="logement" element={<LogementPage />} />
        <Route path="paiements" element={<PaiementsPage />} />
        <Route path="demandes" element={<DemandesPage />} />

        {/* Intervenant routes */}
        <Route path="missions" element={<MissionsPage />} />
        <Route path="planning" element={<PlanningPage />} />
        <Route path="profil" element={<ProfilMetierPage />} />

        {/* Conciergerie routes */}
        <Route path="contrats" element={<ContratsConciergeriePage />} />
        <Route path="proprietaires" element={<ProprietairesConciergeriePage />} />
        <Route path="intervenants-reseau" element={<IntervenantsConciergeriePage />} />

        {/* Shared routes (role-aware) */}
        <Route path="documents" element={
          role === "syndic" ? <DocumentsSyndicPage /> : 
          role === "locataire" ? <DocumentsLocatairePage /> : 
          <DocumentsProprietairePage />
        } />
        <Route path="comptabilite" element={role === "syndic" ? <ComptabiliteSyndicPage /> : <ComptabilitePage />} />
        <Route path="facturation" element={<FacturationPage />} />
        <Route path="messages" element={<MessagesPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
