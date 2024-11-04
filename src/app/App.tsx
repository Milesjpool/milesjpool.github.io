import "./App.css"
import { Footer } from "./Footer";
import { Content } from "./Content";

export function App() {
  return (
    <div className="app flex-col">
      <Content />
      <Footer />
    </div>
  );
}

