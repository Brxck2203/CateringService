import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import CateringDetail from "./pages/CateringDetail";
import QuotationPage from "./pages/QuotationPage";
import ProviderDashboard from './pages/ProviderDashboard';
import { CateringCatalogProvider } from "./context/CateringCatalogContext";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <CateringCatalogProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/catering/:id" element={<CateringDetail />} />
            <Route
              path="/catering/:id/cotizacion"
              element={
                <RequireAuth>
                  <QuotationPage />
                </RequireAuth>
              }
            />
            <Route path="/proveedor/panel" element={<ProviderDashboard />} />
            <Route path="/acceso" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </CateringCatalogProvider>
    </AuthProvider>
  );
}

export default App;
