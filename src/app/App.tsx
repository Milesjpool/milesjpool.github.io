import "./App.css"
import { Footer } from "./Footer";
import { Content } from "./Content";

export function App() {
  return (
    <div className="app flex-col bg-primary">
      <Content />
      <Footer />
    </div>
  );
}

