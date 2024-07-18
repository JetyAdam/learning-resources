import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { ChromeAPI } from '@redhat-cloud-services/types';
import React from 'react';

interface LoaderReaderQuickStartsProps {
  loader: (chrome: ChromeAPI) => string[];
}

const LoaderReaderQuickStarts: React.FC<LoaderReaderQuickStartsProps> = ({
  loader,
}) => {
  const chrome = useChrome();
  const data = loader(chrome);
  return data;
};

export default LoaderReaderQuickStarts;

// type WithPromise = (chrome: ChromeAPI) => Promise<string[]>;
// type LoaderOnly = (chrome: ChromeAPI) => string[];
