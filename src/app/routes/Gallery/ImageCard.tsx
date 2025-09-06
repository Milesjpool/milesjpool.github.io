type ImageCardProps = {
  children: React.ReactNode;
};

export function ImageCard({ children }: ImageCardProps) {
  return <div className="gallery-item">
    {children}
  </div>;
}
