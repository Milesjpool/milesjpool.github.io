import { createContext, useContext } from "react";

type ImageProviderContextType = {
  images: JSX.Element[];
  hasMore: boolean;
  loading: boolean;
  loadMore: () => void;
};
export const ImageProviderContext = createContext<ImageProviderContextType>({
  images: [],
  hasMore: false,
  loading: false,
  loadMore: () => { }
});

export function useImageProvider(): ImageProviderContextType {
  return useContext(ImageProviderContext);
}
