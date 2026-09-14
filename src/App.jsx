import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import CateringDetail from "./pages/CateringDetail";
import QuotationPage from "./pages/QuotationPage";
import ProviderDashboard from './pages/ProviderDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/catering/:id" element={<CateringDetail />} />
        <Route path="/catering/:id/cotizacion" element={<QuotationPage />} />
        <Route path="/proveedor/panel" element={<ProviderDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
