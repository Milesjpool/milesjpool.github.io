import { GithubLink } from "app/Components/GithubLink";
import "./NotionPost.css";
import { ReactComponent as NotionGem } from "icons/notion_gem.svg";
import { ReactComponent as AuthorIcon } from "icons/notion/people.svg";
import { GithubRepo } from "types/GithubRepo";
import { COLOUR_FG_SECONDARY } from "styles";
import { useEffect, useMemo, useState } from "react";
import { GooglePlayTag } from "app/Components/GooglePlayTag";

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
    <div className="notion-post">
      <img
        className="header-image"
        src={headerImage}
        alt="decorative header" />
      <div className="body">
        <div className="emoji">{emoji}</div>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <h1>{title}</h1>
        </a>
        <div className="attribute-row">
          <div className="attribute">
            <AuthorIcon />
            Author</div>
          <div className="value">
            <img src={author.image} className="author-image" alt="author" />
            {author.name}
          </div>
        </div>
        <div className="spacer" />
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

  return <div className="links">
    {displayedLinks}
  </div>;
}

function NotionLink() {
  return (
    <div className="notion-link">
      <a href="https://notion.so" target="_blank" rel="noopener noreferrer">
        <NotionGem className="icon" fill={COLOUR_FG_SECONDARY} />
      </a>
    </div>
  );
}