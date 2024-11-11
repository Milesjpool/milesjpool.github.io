import { useNavigate, useParams } from "react-router-dom";
import { Direction, NavArrow } from "app/Components/NavArrow";
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
  "https://storage.googleapis.com/oh-you/8.jpg"
];

export function OhYou() {
  const { comicId } = useParams<{ comicId: string }>();
  const navigate = useNavigate();

  if (!comicId || isNaN(+comicId)) return <NotFound />;

  const comicIndex = +comicId;
  if (!ohYouComicList[comicIndex]) return <NotFound />;

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

  return <div className="page grow">
    {index !== 1 && <NavArrow onClick={() => setIndex(index - 1)} direction={Direction.Left} />}
    <div className="scroll-container flex-col">
      <img className="comic" src={comics[index]} />
      <span className="comic-index">{index}</span>
    </div>
    {index !== comics.length - 1 &&
      <NavArrow onClick={() => setIndex(index + 1)} direction={Direction.Right} />}
  </div>;
}