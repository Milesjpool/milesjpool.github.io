import { createContext, useContext } from "react";
import { noop } from "ts/noop";

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
  loadMore: noop,
});

export function useImageProvider(): ImageProviderContextType {
  return useContext(ImageProviderContext);
}
