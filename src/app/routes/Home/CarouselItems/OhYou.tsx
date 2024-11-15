import { useState } from "react";
import "./OhYou.css";

export function OhYou() {
  const [hover, setHover] = useState(false);


  const heroImage = hover ? "/assets/oh-you/hero-hover.png" : "/assets/oh-you/hero.png";

  return (
    <div className="oh-you" onClick={() => setHover(true)} >
      <img className="hero-image" src={heroImage} alt="Oh-you comic background" />
      <div className="card-footer">
        <Logo onHover={(h: boolean) => setHover(h)} />
      </div>
    </div>
  );
}

function Logo({ onHover }: { onHover: (hover: boolean) => void }) {
  return <a href="/oh-you/1">
    <div className="title">
      <img className="title-image" src="/assets/oh-you/title.png" alt="Oh-you comic title"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)} />
    </div>
  </a>;
}
