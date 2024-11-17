import "./GithubLink.css";
import { ReactComponent as GithubGem } from "icons/github_gem.svg";
import { GithubRepo } from "../../types/GithubRepo";
import clsx from "clsx";

type GithubLinkProps = GithubRepo & {
  className?: string;
  lightMode?: boolean;
};

export function GithubLink({ className, lightMode, url, statusBadge }: GithubLinkProps) {
  return (
    <div className={clsx("github-link flex-col shrink overflow-hidden rounded", className, lightMode && 'light')}>
      <div className="heading shrink overflow-hidden" >
        <a href={url} target="_blank" className="overflow-hidden" rel="noopener noreferrer">
          <GithubGem className="icon" />
          {url.split('/').filter(Boolean).pop()}
        </a>
      </div>
      <div className="subheading flex shrink overflow-hidden" >
        {statusBadge ? (
          <a className="shrink overflow-hidden" href={statusBadge.href} target="_blank" rel="noopener noreferrer">
            <img src={url + statusBadge.path} alt="github build status" />
          </a>) : (
          <a className="shrink overflow-hidden" href={url} target="_blank" rel="noopener noreferrer">
            <span className="overflow-hidden">{url}</span>
          </a>
        )}
      </div>
    </div >);
}
