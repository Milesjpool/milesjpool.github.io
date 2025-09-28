import { PropsWithChildren } from "react";

type PlaceholderImageProps = {
  aspectRatio: number;
  color: string;
}

export function PlaceholderImage({ aspectRatio, color, children }: PropsWithChildren<PlaceholderImageProps>) {
  return (
    <div
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
      {children}
    </div>
  );
}
