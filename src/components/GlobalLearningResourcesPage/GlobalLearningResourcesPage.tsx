import React, { useState } from 'react';
import GlobalLearningResourcesHeader from './GlobalLearningResourcesHeader';
import GlobalLearningResourcesTabs from './GlobalLearningResourcesTabs';
import GlobalLearningResourcesSidebar from './GlobalLearningResourcesSidebar';
import GlobalLearningResourcesContent from './GlobalLearningResourcesContent';
import './GlobalLearningResourcesPage.scss';

export const GlobalLearningResourcesPage = () => {
  const [activeTabKey, setActiveTabKey] = useState<number>(0);

  const handleTabSelect = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(Number(tabIndex));
  };

  return (
    <div className="lr-c-global-learning-resources-page">
      <div className="lr-c-global-learning-resources-page__top-container">
        <GlobalLearningResourcesHeader />
        <GlobalLearningResourcesTabs
          activeTabKey={activeTabKey}
          onSelect={handleTabSelect}
          learningResourcesCount={65}
          bookmarkedResourcesCount={0}
        />
      </div>
      <div className="lr-c-global-learning-resources-page__main">
        <GlobalLearningResourcesSidebar />
        <GlobalLearningResourcesContent activeTabKey={activeTabKey} />
      </div>
    </div>
  );
};

export default GlobalLearningResourcesPage;
