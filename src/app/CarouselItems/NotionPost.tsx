import "./NotionPost.css";
import { ReactComponent as AuthorIcon } from "icons/notion/people.svg";

const author = {
  name: "Miles Pool",
  image: "https://lh3.googleusercontent.com/a/ACg8ocJbCeGw1kcJoyL2wOgMqnD7FIJSN-f3q9TEWzbMYEsmNqBugCcB=s100"
}

type NotionPostProps = {
  emoji: string;
  title: string;
  headerImage: string;
  href: string;
}

export function NotionPost({title, emoji, headerImage, href}: NotionPostProps) {
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
            <AuthorIcon/>
            Author</div>
          <div className="value">
            <img src={author.image} className="author-image" alt="author" />
            {author.name}
          </div>
        </div>
      </div>
    </div>
  );
}
