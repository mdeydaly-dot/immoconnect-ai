import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AgentDashboard from "@/components/dashboard/roles/AgentDashboard";
import SyndicDashboard from "@/components/dashboard/roles/SyndicDashboard";
import ProprietaireDashboard from "@/components/dashboard/roles/ProprietaireDashboard";
import LocataireDashboard from "@/components/dashboard/roles/LocataireDashboard";
import IntervenantDashboard from "@/components/dashboard/roles/IntervenantDashboard";

const Dashboard = () => {
  const { role } = useAuth();

  const renderDashboard = () => {
    switch (role) {
      case "agent": return <AgentDashboard />;
      case "syndic": return <SyndicDashboard />;
      case "proprietaire": return <ProprietaireDashboard />;
      case "locataire": return <LocataireDashboard />;
      case "intervenant": return <IntervenantDashboard />;
      default: return null;
    }
  };

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>;
};

export default Dashboard;
