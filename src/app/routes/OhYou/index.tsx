import { useNavigate, useParams } from "react-router-dom";
import { NotFound } from "app/routes/NotFound";
import { ComicViewer } from "./ComicViewer";
import { OneIndexedArray } from "./types";

import "./OhYou.css";

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

