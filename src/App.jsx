import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import CateringDetail from "./pages/CateringDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/catering/:id" element={<CateringDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;