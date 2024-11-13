import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Footer } from "./Footer";
import { Home } from "./routes/Home";
import { OhYou } from "./routes/OhYou";
import { NotFound } from "./routes/NotFound";

import "./App.css"

export function App() {
  return (
    <Router>
      <div className="app flex-col bg-primary">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oh-you">
            <Route path=":comicId" element={<OhYou />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}