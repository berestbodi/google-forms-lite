import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { HomePage } from "./pages/HomePage/HomePage";
import { FormBuilder } from "./pages/FormBuilder/FormBuilder";
import { FormView } from "./pages/FormView/FormView";
import { FormResponses } from "./pages/FormResponses/FormResponses";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forms/new" element={<FormBuilder />} />
          <Route path="/forms/:id/fill" element={<FormView />} />
          <Route path="/forms/:id/responses" element={<FormResponses />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
