import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Footer } from "./Footer";
import { Home } from "./routes/Home";
import { OhYou } from "./routes/OhYou";
import { NotFound } from "./routes/NotFound";

import "./App.css"

export function App() {

  // Todo: 
  // - generate sitemaps dynamically
  // - add/improve tracking

  return (
    <Router>
      <div className="app flex-col bg-primary">
              {/* TODO: add oh-you index page */}
              <Route index element={<Navigate to="./1" />} />
        <Footer />
      </div>
    </Router>
  );
}