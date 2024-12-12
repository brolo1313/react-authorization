import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface ILoaderContext {
  isLoading: boolean;
  loaderText: string;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<ILoaderContext>({} as ILoaderContext);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loaderText, setLoaderText] = useState("Loading");
  const [loaderStack, setLoaderStack] = useState<Array<boolean>>([])

  const showLoader = () => {
    setLoaderText(loaderText);
    setLoaderStack([...loaderStack, true])
  };
  const hideLoader = () => setLoaderStack([...loaderStack.slice(1)])

  useEffect(() => {
    if (!loaderStack.length) {
      setIsLoading(false)
      return
    }
    setIsLoading(true);

  }, [loaderStack, showLoader, hideLoader])
  
  return (
    <LoaderContext.Provider
      value={{ isLoading, showLoader, hideLoader, loaderText }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  if (!LoaderContext) {
    throw new Error(
      "Please use useLoader inside the context of LoaderProvider"
    );
  }

  return useContext(LoaderContext);
};
