import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Footer } from "./Footer";
import { Home } from "./routes/Home";
import { OhYou } from "./routes/OhYou";
import { CurriculumVitae } from "./routes/CurriculumVitae";
import { NotFound } from "./routes/NotFound";

import "./App.css"

export function App() {

  // Todo: 
  // - generate sitemaps dynamically
  // - add/improve tracking

  return (
    <Router>
      <div className="app flex-col bg-primary">
        <div className="flex grow overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/oh-you" >
              {/* TODO: add oh-you index page */}
              <Route index element={<Navigate to="./1" />} />
              <Route path=":comicId" element={<OhYou />} />
            </Route>
            <Route path="/curriculum-vitae" element={<CurriculumVitae />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}