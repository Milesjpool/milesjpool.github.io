import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer } from "./Footer";

import "./App.css"
import { Home } from "./routes/Home";
import { OhYou } from "./routes/OhYou";
import { NotFound } from "./routes/NotFound";

export function App() {
  return (
    <Router>
      <div className="app flex-col bg-primary">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oh-you">
            <Route path=":comicId" element={<OhYou />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}