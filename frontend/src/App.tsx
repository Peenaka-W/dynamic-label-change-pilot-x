import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import LeadGenerationForm from './components/Forms/LeadGenerationForm';
import CustomerDetailsForm from './components/Forms/CustomerDetailsForm';
import Notification from './components/UI/Notification';
import useLabels from './hooks/useLabels';
import type{ Label, ScreenName, TenantId, ModuleName } from './types';

function App() {
  const [currentTenant, setCurrentTenant] = useState<TenantId>('tenant1');
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Lead Generation');
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  const moduleName: ModuleName = 'lending';

  const { labels, loading, error, updateLabel } = useLabels(
    moduleName,
    currentTenant,
    currentScreen
  );

  const handleTenantChange = (tenant: TenantId) => {
    setCurrentTenant(tenant);
  };

  const handleScreenChange = (screen: ScreenName) => {
    setCurrentScreen(screen);
  };

  const handleLabelsUpdate = (updatedLabel: Label) => {
    updateLabel(updatedLabel);
    setNotification({
      show: true,
      message: `Label "${updatedLabel.key}" updated successfully!`,
      type: 'success',
    });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentTenant={currentTenant} onTenantChange={handleTenantChange} />
      <Navigation currentScreen={currentScreen} onScreenChange={handleScreenChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : (
          <>
            {currentScreen === 'Lead Generation' ? (
              <LeadGenerationForm
                labels={labels}
                moduleName={moduleName}
                tenantId={currentTenant}
                screenName={currentScreen}
                onLabelsUpdate={handleLabelsUpdate}
              />
            ) : (
              <CustomerDetailsForm
                labels={labels}
                moduleName={moduleName}
                tenantId={currentTenant}
                screenName={currentScreen}
                onLabelsUpdate={handleLabelsUpdate}
              />
            )}
          </>
        )}
      </main>

      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}

export default App;