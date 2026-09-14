const ProviderSidebar = ({ activeTab, onChangeTab, onReset }) => {
  const tabs = [
    { id: 'quotations', label: 'Gestión de contrataciones' },
    { id: 'finance', label: 'Finanzas' },
    { id: 'supplies', label: 'Estimación de insumos' },
    { id: 'business', label: 'Configuraciones' }
  ];

  return (
    <aside className="provider-sidebar">
      <div className="provider-sidebar-header">
        <p className="provider-sidebar-eyebrow">Proveedor</p>
        <h2>Panel</h2>
      </div>

      <nav className="provider-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={activeTab === tab.id ? 'provider-nav-btn active' : 'provider-nav-btn'}
            onClick={() => onChangeTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <button type="button" className="provider-reset-btn" onClick={onReset}>
        Restablecer datos
      </button>
    </aside>
  );
};

export default ProviderSidebar;