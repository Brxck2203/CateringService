import { useEffect, useRef, useState } from 'react';
import BusinessManagementSection from '../components/provider/BusinessManagementSection';
import FinanceSection from '../components/provider/FinanceSection';
import ProviderSidebar from '../components/provider/ProviderSidebar';
import QuotationRequestsSection from '../components/provider/QuotationRequestsSection';
import SuppliesEstimatorSection from '../components/provider/SuppliesEstimatorSection';
import {
  loadProviderDashboardData,
  resetProviderDashboardData,
  saveProviderDashboardData
} from '../services/providerDashboardStorage';
import '../styles/providerDashboard.css';

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('quotations');
  const [dashboardData, setDashboardData] = useState(() => loadProviderDashboardData());
  const [notice, setNotice] = useState('');
  const hasSavedInitialData = useRef(false);

  useEffect(() => {
    const result = saveProviderDashboardData(dashboardData);

    if (!result) {
      setNotice('No se pudo guardar la información en este navegador.');
    } else if (hasSavedInitialData.current) {
      setNotice('Cambios guardados con éxito.');
    } else {
      hasSavedInitialData.current = true;
    }
  }, [dashboardData]);

  const handleResetData = () => {
    const restoredData = resetProviderDashboardData();
    setDashboardData(restoredData);
    setNotice('Datos del panel restaurados correctamente.');
  };

  return (
    <div className="provider-dashboard-shell">
      <ProviderSidebar
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onReset={handleResetData}
      />

      <main className="provider-dashboard-main">
        {notice && (
          <div className="provider-banner">
            <span>{notice}</span>
          </div>
        )}

        {activeTab === 'quotations' && (
          <QuotationRequestsSection
            quotations={dashboardData.quotations}
            menus={dashboardData.menus}
            events={dashboardData.events}
            onQuotationsChange={(quotations) =>
              setDashboardData((prev) => ({ ...prev, quotations }))
            }
            onEventsChange={(events) =>
              setDashboardData((prev) => ({ ...prev, events }))
            }
          />
        )}

        {activeTab === 'business' && (
          <BusinessManagementSection
            business={dashboardData.business}
            menus={dashboardData.menus}
            onBusinessSave={(business) =>
              setDashboardData((prev) => ({ ...prev, business }))
            }
            onPortfolioChange={(portfolio) =>
              setDashboardData((prev) => ({
                ...prev,
                business: { ...prev.business, portfolio }
              }))
            }
            onMenusChange={(menus) =>
              setDashboardData((prev) => ({ ...prev, menus }))
            }
          />
        )}

        {activeTab === 'finance' && (
          <FinanceSection
            transactions={dashboardData.transactions}
            events={dashboardData.events}
            menus={dashboardData.menus}
            onTransactionsChange={(transactions) =>
              setDashboardData((prev) => ({ ...prev, transactions }))
            }
          />
        )}

        {activeTab === 'supplies' && (
          <SuppliesEstimatorSection
            events={dashboardData.events}
            menus={dashboardData.menus}
            recipes={dashboardData.recipes}
          />
        )}
      </main>
    </div>
  );
};

export default ProviderDashboard;