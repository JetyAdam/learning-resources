import React from 'react';
import GlobalLearningResourcesHeader from './GlobalLearningResourcesHeader';
import GlobalLearningResourcesTabs from './GlobalLearningResourcesTabs';
import GlobalLearningResourcesSidebar from './GlobalLearningResourcesSidebar';

export const GlobalLearningResourcesPage = () => {
  return (
    <>
      <GlobalLearningResourcesHeader />
      <GlobalLearningResourcesTabs learningResourcesCount={65} bookmarkedResourcesCount={0} />
      <div className='lr-c-global-learning-resources-page__main'>
        <GlobalLearningResourcesSidebar />
      </div>
    </>
  );
};

export default GlobalLearningResourcesPage;
