import React from 'react';
import './GlobalLearningResourcesSidebar.scss';
import GlobalLearningResourcesFilters from './GlobalLearningResourcesFilters';
import { Stack } from '@patternfly/react-core';

export const GlobalLearningResourcesSidebar = () => {
  return (
    <Stack className="lr-c-global-learning-resources-page__sidebar">
      <GlobalLearningResourcesFilters />
    </Stack>
  );
};

export default GlobalLearningResourcesSidebar;
