import React from 'react';
import './GlobalLearningResourcesSidebar.scss';
import GlobalLearningResourcesInput from './GlobalLearningResourcesInput';
import GlobalLearningResourcesFilters from './GlobalLearningResourcesFilters';

export const GlobalLearningResourcesSidebar = () => {
  return (
    <div className="lr-c-global-learning-resources-page__sidebar">
      <GlobalLearningResourcesInput />
      <GlobalLearningResourcesFilters />
    </div>
  );
};

export default GlobalLearningResourcesSidebar;
