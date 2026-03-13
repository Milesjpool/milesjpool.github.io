import "./SlopBox.css";
import { ReactComponent as AiGem } from "icons/ai_gem.svg";

const GUITAREX_URL = "https://www.milesjpool.com/guitarex-ai/";
const GUITAREX_HERO = "/assets/guitarex-hero.png";
const KEEBO_URL = "https://www.milesjpool.com/keebo";

type CardStyle = {
  gridColumnStart: number;
  gridColumnEnd: number;
  gridRowStart: number;
  gridRowEnd: number;
};

function CardLink({ href, style, 'data-card-index': dataCardIndex, children }: {
  href: string;
  style: CardStyle;
  'data-card-index'?: number;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="slop-box-card slop-box-card-link"
      style={style}
      data-card-index={dataCardIndex}
    >
      {children}
    </a>
  );
}

function GuitarExCard({ style, 'data-card-index': dataCardIndex }: { style: CardStyle; 'data-card-index'?: number }) {
  return (
    <CardLink href={GUITAREX_URL} style={style} data-card-index={dataCardIndex}>
      <div className="slop-box-card-hero">
        <img src={GUITAREX_HERO} alt="GuitarEx AI" />
      </div>
      <div className="slop-box-card-content">
        <div>
          <div>GuitarEx<sup className="guitarex-ai">AI</sup> 🎸</div>
          <div className="slop-box-card-subtitle"><span className="ai-blue">AI</span> generated guitar exercises</div>
        </div>
      </div>
    </CardLink>
  );
}

function KeeboCard({ style, 'data-card-index': dataCardIndex }: { style: CardStyle; 'data-card-index'?: number }) {
  return (
    <CardLink href={KEEBO_URL} style={style} data-card-index={dataCardIndex}>
      <div className="slop-box-card-hero keebo-hero">
        <div className="keebo-prompt">$</div>
        <div className="keebo-title"><span className="keebo-cursor">k</span>eebo</div>
        <div className="keebo-subtitle">touch typing, step by step</div>
      </div>
    </CardLink>
  );
}

export function SlopBox() {
  const cards: (CardStyle & { content?: 'guitarex' | 'keebo' })[] = [
    { gridColumnStart: 1, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 4, content: 'guitarex' },
    { gridColumnStart: 1, gridColumnEnd: 2, gridRowStart: 4, gridRowEnd: 7 },
    { gridColumnStart: 2, gridColumnEnd: 3, gridRowStart: 1, gridRowEnd: 3, content: 'keebo' },
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
          return <GuitarExCard key={index} style={style} data-card-index={index} />;
        }
        if (content === 'keebo') {
          return <KeeboCard key={index} style={style} data-card-index={index} />;
        }
        return <div key={index} className="slop-box-card" style={style} data-card-index={index}><AiGem /></div>;
      })}
    </div>
  );
}
