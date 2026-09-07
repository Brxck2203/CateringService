import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import CateringDetail from "./pages/CateringDetail";
import QuotationPage from "./pages/QuotationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/catering/:id" element={<CateringDetail />} />
        <Route path="/catering/:id/cotizacion" element={<QuotationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
