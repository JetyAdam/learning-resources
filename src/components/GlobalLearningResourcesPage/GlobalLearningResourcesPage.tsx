import React, { Suspense, useState } from 'react';
import GlobalLearningResourcesHeader from './GlobalLearningResourcesHeader';
import GlobalLearningResourcesTabs from './GlobalLearningResourcesTabs';
import GlobalLearningResourcesSidebar from './GlobalLearningResourcesSidebar';
import GlobalLearningResourcesContent from './GlobalLearningResourcesContent';
import './GlobalLearningResourcesPage.scss';
import useAsyncLoader from '../../hooks/useAsyncLoader';
import fetchSuperQuickstarts from '../../utils/fetchQuickstarts';

export const GlobalLearningResourcesPage = () => {
  const { loader, purgeCache } = useAsyncLoader(fetchSuperQuickstarts);

  return (
    <div className="lr-c-global-learning-resources-page">
      <div className="lr-c-global-learning-resources-page__top-container">
        <GlobalLearningResourcesHeader />
        <Suspense fallback={<GlobalLearningResourcesTabs />}>
          <GlobalLearningResourcesTabs loader={loader} />
        </Suspense>
      </div>
      <div className="lr-c-global-learning-resources-page__main">
        <GlobalLearningResourcesSidebar />
        {/* chybi suspense */}
        <Suspense fallback={<div>Loading Content...</div>}>
          <GlobalLearningResourcesContent
            loader={loader}
            purgeCache={purgeCache}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default GlobalLearningResourcesPage;
