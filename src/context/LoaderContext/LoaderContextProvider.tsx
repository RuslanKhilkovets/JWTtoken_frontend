// contexts/LoaderContext.js
import * as React from 'react';
import LoaderContext from './LoaderContext';

interface ILoadingContextProvider {
    children: React.ReactNode;
  }
  
export function LoaderContextProvider({ children }: ILoadingContextProvider) {
  const [isLoading, setIsLoading] = React.useState(false);

  const showLoader = () => {
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
        {children}
    </LoaderContext.Provider>
  );
}
export default LoaderContextProvider;