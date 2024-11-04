import { COLOUR_FG_SECONDARY } from "styles";
import { ReactComponent as GithubGem } from "icons/github_gem.svg";
import { ReactComponent as LinkedInGem } from "icons/linkedin_gem.svg";

import "./Footer.css";

export function Footer() {
  return (
    <header className="footer bg-secondary">
      <div className="content-row flex-row">
        <Title />
        <ExternalLinks />
      </div>
    </header>
  );
}

function Title() {
  return (
    < div className="item-row flex-row">
      <img src="/alien_256.png" alt="alien" className="icon" />
      <a href="/">
        <span className="text">
          Miles
          <span className="peek">
            <span className="j">J</span>
            Pool
            <span className="com">.com</span>
          </span>
        </span>
      </a>
    </div>
  )
}

function ExternalLinks() {
  return (
    <div className="item-row flex-row">
      <a href="https://github.milesjpool.com" target="_blank" rel="noopener noreferrer">
        <GithubGem className="icon" fill={COLOUR_FG_SECONDARY} />
      </a>
      <a href="https://linkedin.milesjpool.com" target="_blank" rel="noopener noreferrer">
        <LinkedInGem className="icon" fill={COLOUR_FG_SECONDARY} />
      </a>
    </div>
  )
}

