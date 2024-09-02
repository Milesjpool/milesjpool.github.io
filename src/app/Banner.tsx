import { COLOUR_FG_SECONDARY } from "styles";
import { ReactComponent as GithubGem } from "icons/github_gem.svg";
import { ReactComponent as LinkedInGem } from "icons/linkedin_gem.svg";

import "./Banner.css";

export function Banner() {
  return (
    <header className="banner">
      <div className="item-row title">
        <img src="/alien_256.png" alt="alien" className="icon" />
        <span className="text">
          Miles
          <span className="peek">
            JPool.com
          </span>
        </span>
      </div>
      <div className="item-row links">
        <a href="https://github.milesjpool.com">
          <GithubGem className="icon" fill={COLOUR_FG_SECONDARY}/>
        </a>
        <a href="https://linkedin.milesjpool.com">
          <LinkedInGem className="icon" fill={COLOUR_FG_SECONDARY}/>
        </a>
      </div>
    </header>
  );
}

