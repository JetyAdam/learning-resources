import React, { Suspense, useRef, useState } from 'react';
import GlobalLearningResourcesHeader from './GlobalLearningResourcesHeader';
import GlobalLearningResourcesTabs from './GlobalLearningResourcesTabs';
import GlobalLearningResourcesSidebar from './GlobalLearningResourcesSidebar';
import GlobalLearningResourcesContent from './GlobalLearningResourcesContent';
import './GlobalLearningResourcesPage.scss';
import useAsyncLoader from '../../hooks/useAsyncLoader';
import fetchSuperQuickstarts from '../../utils/fetchQuickstarts';

export const GlobalLearningResourcesPage = () => {
  const [activeTabKey, setActiveTabKey] = useState<number>(0);

  const handleTabSelect = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(Number(tabIndex));
  };
  const { loader, purgeCache } = useAsyncLoader(fetchSuperQuickstarts);

  return (
    <div className="lr-c-global-learning-resources-page">
      <div className="lr-c-global-learning-resources-page__top-container">
        <GlobalLearningResourcesHeader />
        <Suspense fallback={<div>Loading tabs...</div>}>
          <GlobalLearningResourcesTabs
            activeTabKey={activeTabKey}
            onSelect={handleTabSelect}
            loader={loader}
            purgeCache={purgeCache}
          />
        </Suspense>
      </div>
      <div className="lr-c-global-learning-resources-page__main">
        <GlobalLearningResourcesSidebar />
        {/* chybi suspense */}
        <Suspense fallback={<div>Loading Content...</div>}>
          <GlobalLearningResourcesContent
            activeTabKey={activeTabKey}
            loader={loader}
            purgeCache={purgeCache}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default GlobalLearningResourcesPage;
