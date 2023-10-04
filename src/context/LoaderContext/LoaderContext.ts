import * as React from 'react';

export const LoaderContext = React.createContext({
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

export default LoaderContext;