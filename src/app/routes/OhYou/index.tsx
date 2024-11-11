import { useNavigate, useParams } from "react-router-dom";
import { Direction, NavArrow } from "app/Components/NavArrow";
import { NotFound } from "app/routes/NotFound";

import "./OhYou.css";

const comics = [
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
  if (!comics[comicIndex]) return <NotFound />;


  // function handleKeyDown(event: KeyboardEvent) {
  //   if (event.key === "ArrowLeft" && comicIndex > 1) {
  //     navigate(`../${comicIndex - 1}`);
  //   } else if (event.key === "ArrowRight" && comicIndex < comics.length - 1) {
  //     navigate(`../${comicIndex + 1}`);
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [comicIndex, navigate]);

  return (<div className="page grow">
    {comicIndex !== 1 && <NavArrow onClick={() => navigate(`../${comicIndex - 1}`)} direction={Direction.Left} />}
    <div className="scroll-container flex-col">
      <img className="comic" src={comics[comicIndex]} />
      <span className="comic-index">{comicIndex}</span>
    </div>
    {comicIndex !== comics.length - 1 &&
      <NavArrow onClick={() => navigate(`../${comicIndex + 1}`)} direction={Direction.Right} />}
  </div>);
}