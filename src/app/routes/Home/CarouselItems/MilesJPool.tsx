import { useState } from "react";
import clsx from "clsx";
import { ConstructionSign } from "app/routes/Home/components/ConstructionSign";
import { GithubLink } from "app/components/GithubLink";

import { ReactComponent as GithubPagesGem } from "icons/github_pages_gem.svg";
import { ReactComponent as ReactGem } from "icons/react_gem.svg";
import { ReactComponent as TypescriptGem } from "icons/ts_gem.svg";
import { ReactComponent as GoogleCloudGem } from "icons/gcp_gem.svg";
import { COLOUR_FG_SECONDARY } from "styles";

import "./MilesJPool.css";

const thisRepo = {
  name: "milesjpool.github.io",
  url: "https://github.com/Milesjpool/milesjpool.github.io",
  statusBadge: {
    path: "/actions/workflows/gh-pages.yml/badge.svg",
    href: "https://github.com/Milesjpool/milesjpool.github.io/actions/workflows/gh-pages.yml"
  }
}

export function MilesJPool() {
  const [cursorPosition, setCursorPosition] = useState<'title' | 'signature'>('title');

  return (
    <div className="home flex-col">
      <div className="content flex-col grow">
        <div className="title" onClick={() => setCursorPosition('title')}>
          <span className="prompt">&gt;</span>
          Miles&#8203;
          <span className="j">J&#8203;</span>
          Pool&#8203;
          <span className="com">.com</span>
          <span className={clsx('prompt', 'cursor', { blink: cursorPosition === 'title' })}>█</span>
        </div>

        <div className="description flex-col">
          <span>
            Welcome to the personal website of Miles Pool.
          </span>
          <span>
            Handmade with <i>Typescript</i> and <i>React</i>.<br />
            Hosted through <i>GitHub Pages</i> and <i>Google Cloud</i>.
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
            <a href="https://cloud.google.com/gcp" target="_blank" rel="noopener noreferrer">
              <GoogleCloudGem className="icon" fill={COLOUR_FG_SECONDARY} />
            </a>
          </div>
          <ConstructionSign className="banner shadow-2" />
        </div>

        <div className="signature flex-col">
          <span onClick={() => setCursorPosition('signature')}>
            <span>&gt; </span>
            <span>enjoy your stay </span>
            <span className={clsx('cursor', { blink: cursorPosition === 'signature' })}>█</span>
          </span>
          <div className="aliens flex">
            <img src="/assets/alien_256.png" alt="alien" className="icon" />
            <img src="/assets/alien_256.png" alt="alien" className="icon" />
            <img src="/assets/alien_256.png" alt="alien" className="icon" />
          </div>
        </div>

      </div>
      <GithubLink {...thisRepo} lightMode={true} />
    </div>
  );
}