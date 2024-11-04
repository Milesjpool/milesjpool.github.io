import { ConstructionSign } from "app/Components/ConstructionSign";
import "./Home.css";
import { GithubLink } from "app/Components/GithubLink";

import { ReactComponent as GithubPagesGem } from "icons/github_pages_gem.svg";
import { ReactComponent as ReactGem } from "icons/react_gem.svg";
import { ReactComponent as TypescriptGem } from "icons/ts_gem.svg";
import { COLOUR_FG_SECONDARY } from "styles";

const thisRepo = {
  name: "milesjpool.github.io",
  url: "https://github.com/Milesjpool/milesjpool.github.io",
  statusBadge: {
    path: "/actions/workflows/gh-pages.yml/badge.svg",
    href: "https://github.com/Milesjpool/milesjpool.github.io/actions/workflows/gh-pages.yml"
  }
}

export function Home() {
  return (
    <div className="home flex-col">
      <div className="background" />
      <div className="content flex-col">
        <div className="title">
          <span className="prompt">&gt;</span>
          Miles&#8203;
          <span className="j">J&#8203;</span>
          Pool&#8203;
          <span className="com">.com</span>
          <span className="prompt">█</span>
        </div>

        <div className="description flex-col">
          <span>
            Handmade with <i>Typescript</i> and <i>React</i>.<br />
            Hosted through <i>GitHub Pages</i>.
          </span>

          <div className="gems flex-row">
            <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
              <TypescriptGem className="icon" fill={COLOUR_FG_SECONDARY} />
            </a>
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
              <ReactGem className="icon" fill={COLOUR_FG_SECONDARY} />
            </a>
            <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">
              <GithubPagesGem className="icon" fill={COLOUR_FG_SECONDARY} />
            </a>
          </div>
        </div>

        <ConstructionSign className="banner" />
        <div className="signature flex-col">
          <span>
            Enjoy your stay
          </span>
          <div>
            <img src="/alien_256.png" alt="alien" className="icon" />
            <img src="/alien_256.png" alt="alien" className="icon" />
            <img src="/alien_256.png" alt="alien" className="icon" />
          </div>
        </div>

      </div>
      <GithubLink {...thisRepo} />
    </div>
  );
}