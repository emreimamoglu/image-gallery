import {
  createContext,
  useState,
  useContext,
  useMemo,
  ReactNode,
  Dispatch,
} from "react";
import { Image } from "../types";

export type CreateImageContextProps = {
  images: Image[];
  setImages: Dispatch<React.SetStateAction<Image[]>>;
  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
};

export type ImageContextProps = {
  children?: ReactNode;
};

const ImageContext = createContext<CreateImageContextProps | null>(null);

export function ImageContextProvider({ children }: ImageContextProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const contextValue = useMemo(
    () => ({
      images,
      setImages,
      loading,
      setLoading,
      page,
      setPage,
    }),
    [images, setImages, loading, setLoading, page, setPage]
  );

  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
}

export const useImageContext = () => {
  const contextValue = useContext(ImageContext);

  if (!contextValue) {
    throw new Error(
      "useImageContext must be used within a ImageContextProvider"
    );
  }

  return contextValue;
};
