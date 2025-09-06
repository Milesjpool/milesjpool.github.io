import { useMemo } from "react";

const aspectRatios = [
  1,        // Square
  4 / 3,    // Landscape
  3 / 4,    // Portrait
  3 / 2,    // Standard landscape
  2 / 3,    // Standard portrait
  16 / 9,   // Wide landscape
  9 / 16,   // Tall portrait
  5 / 4,    // Slightly tall
  4 / 5,    // Slightly wide
];

const colors = [
  "#ff6b6b", "#4ecdc4", "#45b7d1", "#ff9ff3", "#54a0ff",
  "#96ceb4", "#feca57", "#5f27cd", "#00d2d3", "#ff9f43",
  "#a55eea", "#26de81", "#fd79a8", "#fdcb6e", "#6c5ce7"
];

export function useGalleryImages() {
  const images = useMemo(() => Array.from({ length: 30 }, (_, i) => {
    const aspectRatio = aspectRatios[Math.floor(Math.random() * aspectRatios.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return (
      <div
        key={i}
        style={{
          backgroundColor: color,
          width: "100%",
          aspectRatio: aspectRatio,
          border: "10px dashed black",
          boxSizing: "border-box",
          color: "white",
          fontSize: "2em",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}>
        {i}
      </div>
    );
  }), []);

  return images;
}
