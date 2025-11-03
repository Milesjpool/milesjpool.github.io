import "./SlopBox.css";
import { ReactComponent as AiGem } from "icons/ai_gem.svg";

const GUITAREX_URL = "https://www.milesjpool.com/guitarex-ai/";
const GUITAREX_HERO = "/assets/guitarex-hero.png";

type CardStyle = {
  gridColumnStart: number;
  gridColumnEnd: number;
  gridRowStart: number;
  gridRowEnd: number;
};

function GuitarExCard({ style }: { style: CardStyle }) {
  return (
    <a
      href={GUITAREX_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="slop-box-card slop-box-card-link"
      style={style}
    >
      <div className="slop-box-card-hero">
        <img src={GUITAREX_HERO} alt="GuitarEx AI" />
      </div>
      <div className="slop-box-card-content">
        <div>
          <div>GuitarEx<sup className="guitarex-ai">AI</sup> 🎸</div>
          <div className="slop-box-card-subtitle"><span className="ai-blue">AI</span> generated guitar exercises</div>
        </div>
      </div>
    </a>
  );
}

export function SlopBox() {
  const cards: (CardStyle & { content?: 'guitarex' })[] = [
    { gridColumnStart: 1, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 4, content: 'guitarex' },
    { gridColumnStart: 1, gridColumnEnd: 2, gridRowStart: 4, gridRowEnd: 7 },
    { gridColumnStart: 2, gridColumnEnd: 3, gridRowStart: 1, gridRowEnd: 3 },
    { gridColumnStart: 2, gridColumnEnd: 3, gridRowStart: 5, gridRowEnd: 7 },
    { gridColumnStart: 3, gridColumnEnd: 4, gridRowStart: 1, gridRowEnd: 3 },
    { gridColumnStart: 3, gridColumnEnd: 4, gridRowStart: 5, gridRowEnd: 7 },
    { gridColumnStart: 4, gridColumnEnd: 5, gridRowStart: 1, gridRowEnd: 4 },
    { gridColumnStart: 4, gridColumnEnd: 5, gridRowStart: 4, gridRowEnd: 7 },
  ];

  return (
    <div className="slop-box">
      <div className="slop-box-title-container">
        <h1 className="slop-box-title">📦 <span className="slop-grey">Slop</span><span className="box-blue">Box</span></h1>
        <p className="slop-box-subtitle">🤖 <span className="ai-blue">AI</span> Coded, Human Approved</p>
      </div>
      {cards.map((card, index) => {
        const { content, ...style } = card;
        if (content === 'guitarex') {
          return <GuitarExCard key={index} style={style} />;
        }
        return <div key={index} className="slop-box-card" style={style}><AiGem /></div>;
      })}
    </div>
  );
}
