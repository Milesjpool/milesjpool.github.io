import { GithubLink } from "app/components/GithubLink";
import { ReactComponent as NotionGem } from "icons/notion_gem.svg";
import { ReactComponent as AuthorIcon } from "icons/notion/people.svg";
import { GithubRepo } from "types/GithubRepo";
import { COLOUR_FG_SECONDARY } from "styles";
import { useEffect, useMemo, useState } from "react";

import "./NotionPost.css";

const author = {
  name: "Miles Pool",
  image: "https://lh3.googleusercontent.com/a/ACg8ocJbCeGw1kcJoyL2wOgMqnD7FIJSN-f3q9TEWzbMYEsmNqBugCcB=s100"
}

type NotionPostProps = {
  emoji: string;
  title: string;
  headerImage: string;
  href: string;
  githubRepo?: GithubRepo
}

export function NotionPost({ title, emoji, headerImage, href, githubRepo }: NotionPostProps) {
  const links = [
    githubRepo && <GithubLink key={1} {...githubRepo} />,
    <NotionLink key={2} />,
  ].filter(Boolean)

  return (
    <div className="notion-post bg-white flex-col">
      <img
        className="header-image flex shrink overflow-hidden"
        src={headerImage}
        alt="decorative header" />
      <div className="body flex-col grow">
        <div className="emoji">{emoji}</div>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <h1>{title}</h1>
        </a>
        <div className="attribute-row flex-row">
          <div className="attribute flex-row">
            <AuthorIcon />
            Author</div>
          <div className="value flex-row">
            <img src={author.image} className="author-image round" alt="author" />
            {author.name}
          </div>
        </div>
        <div className="spacer grow" />
        <LinksBlock links={links} />
      </div>
    </div>
  );
}

function LinksBlock({ links }: { links: React.ReactNode[] }) {
  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayedLinks = useMemo(() => {
    const maxLinks = viewWidth < 600 ? 1 : undefined;
    return links.slice(0, maxLinks)
  }, [links, viewWidth]);

  return <div className="links flex-row shrink">
    {displayedLinks}
  </div>;
}

function NotionLink() {
  return (
    <div className="notion-link">
      <a className="flex" href="https://notion.so" target="_blank" rel="noopener noreferrer">
        <NotionGem className="icon" fill={COLOUR_FG_SECONDARY} />
      </a>
    </div>
  );
}