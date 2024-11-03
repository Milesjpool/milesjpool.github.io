import "./GithubLink.css";
import { ReactComponent as GithubGem } from "icons/github_gem.svg";
import { GithubRepo } from "../../types/GithubRepo";
import clsx from "clsx";

type GithubLinkProps = GithubRepo & {
  className?: string;
};

export function GithubLink({className,  url, statusBadge }: GithubLinkProps) {
  return (
    <div className={clsx("github-link", className)}>
      <div className="heading" >
        <a href={url}  target="_blank" className="name" rel="noopener noreferrer">
          <GithubGem className="icon"/>
          {url.split('/').filter(Boolean).pop()}
        </a>
      </div>
      <div className="subheading" >
        {statusBadge ? (
          <a href={statusBadge.href} target="_blank" rel="noopener noreferrer">
            <img src={url + statusBadge.path} alt="alien" />
          </a>) : (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <span>{url}</span>
          </a>
        )}
      </div>
    </div>);
}
