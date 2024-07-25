import React from 'react';
import './GlobalLearningResourcesSidebar.scss';
import GlobalLearningResourcesInput from './GlobalLearningResourcesInput';
import GlobalLearningResourcesFilters from './GlobalLearningResourcesFilters';
import { Stack } from '@patternfly/react-core';

export const GlobalLearningResourcesSidebar = () => {
  return (
    <Stack
     className="lr-c-global-learning-resources-page__sidebar">
      <GlobalLearningResourcesInput />
      <GlobalLearningResourcesFilters />
    </Stack>
  );
};

export default GlobalLearningResourcesSidebar;
