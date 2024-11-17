import { useNavigate, useParams } from "react-router-dom";
import { Direction, NavArrow } from "app/components/NavArrow";
import { NotFound } from "app/routes/NotFound";
import { useArrowNavigation } from "app/hooks/useArrowNavigation";
import "./OhYou.css";

type OneIndexedArray<T> = [undefined, ...T[]];

const ohYouComicList: OneIndexedArray<string> = [
  undefined, // 1-indexed comic ids. This comic doesn't exist.
  "https://storage.googleapis.com/oh-you/1.jpg",
  "https://storage.googleapis.com/oh-you/2.jpg",
  "https://storage.googleapis.com/oh-you/3.jpg",
  "https://storage.googleapis.com/oh-you/4.jpg",
  "https://storage.googleapis.com/oh-you/5.jpg",
  "https://storage.googleapis.com/oh-you/6.jpg",
  "https://storage.googleapis.com/oh-you/7.jpg",
  "https://storage.googleapis.com/oh-you/8.jpg",
  "https://storage.googleapis.com/oh-you/9.jpg"
];

export function OhYou() {
  const { comicId } = useParams<{ comicId: string }>();
  const navigate = useNavigate();

  if (!comicId || isNaN(+comicId)) return <NotFound />;

  const comicIndex = +comicId;
  if (!ohYouComicList[comicIndex]) return <NotFound />;

  // TODO: add a header with a link to the index page
  return <ComicViewer comics={ohYouComicList} index={comicIndex} setIndex={(index: number) => navigate(`../${index}`)} />;
}

type ComicViewerProps = {
  comics: OneIndexedArray<string>;
  index: number;
  setIndex: (index: number) => void;
};

function ComicViewer({ comics, index, setIndex }: ComicViewerProps) {

  useArrowNavigation((direction: Direction) => {
    if (direction === Direction.Left && index > 1) {
      setIndex(index - 1);
    }
    if (direction === Direction.Right && index < comics.length - 1) {
      setIndex(index + 1);
    }
  });

  //TODO: 
  // - fix mobile-layout navigation
  // - add swipe navigation?

  return <div className="page grow">
    <div className="scroll-container flex-col overflow-scroll">
      <img key={index} className="comic shadow" src={comics[index]} alt="Comic panel" />
    </div>
    {index !== comics.length - 1 &&
      <NavArrow onClick={() => setIndex(index + 1)} direction={Direction.Right} />}
  </div>;
}
