import { COLOUR_FG_SECONDARY } from "styles";
import { ReactComponent as GithubGem } from "icons/github_gem.svg";
import { ReactComponent as LinkedInGem } from "icons/linkedin_gem.svg";

import "./Banner.css";

export function Banner() {
  return (
    <header className="banner">
      <div className="content-row">
        <Title />
        <ExternalLinks />
      </div>
      <div className="construction-sign" >
        <div className="text-container">ALWAYS UNDER CONSTRUCTION</div>
      </div>
    </header>
  );
}
function Title() { 
  return (
   < div className="item-row">
    <img src="/alien_256.png" alt="alien" className="icon" />
    <span className="text">
      Miles
      <span className="peek">
        JPool.com
      </span>
    </span>
  </div>
  )
}

function ExternalLinks(){
  return (
    <div className="item-row">
      <a href="https://github.milesjpool.com">
        <GithubGem className="icon" fill={COLOUR_FG_SECONDARY}/>
      </a>
      <a href="https://linkedin.milesjpool.com">
        <LinkedInGem className="icon" fill={COLOUR_FG_SECONDARY}/>
      </a>
    </div>
  )
}

