import { GithubLink } from "app/components/GithubLink";
import { ReactComponent as NotionGem } from "icons/notion_gem.svg";
import { ReactComponent as AuthorIcon } from "icons/notion/people.svg";
import { GithubRepo } from "types/GithubRepo";
import { COLOUR_FG_SECONDARY } from "styles";
import { useEffect, useMemo, useState, type FunctionComponent, type SVGAttributes } from "react";

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
  githubRepo?: GithubRepo;
  extraIconLinks?: IconLinkDefinition[];
}

export function NotionPost({ title, emoji, headerImage, href, githubRepo, extraIconLinks }: NotionPostProps) {
  const links = [
    githubRepo && <GithubLink key={1} {...githubRepo} />,
    ...(extraIconLinks?.map((link, index) => (
      <IconLink key={`extra-icon-${index}`} {...link} />
    )) ?? []),
    <NotionLink key="notion" />,
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
    <IconLink href="https://notion.so" Icon={NotionGem} fill={COLOUR_FG_SECONDARY} />
  );
}

type IconLinkDefinition = {
  href: string;
  Icon: FunctionComponent<SVGAttributes<SVGElement>>;
  fill?: string;
}

function IconLink({ href, Icon, fill }: IconLinkDefinition) {
  return (
    <div className="icon-link">
      <a className="flex" href={href} target="_blank" rel="noopener noreferrer">
        <Icon className="icon" fill={fill} />
      </a>
    </div>
  );
}