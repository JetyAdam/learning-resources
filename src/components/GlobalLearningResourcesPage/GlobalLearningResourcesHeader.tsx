import React from 'react';
import './GlobalLearningResourcesHeader.scss';
import { Divider, Stack, StackItem, Text, TextContent } from '@patternfly/react-core';

export const GlobalLearningResourcesHeader = () => {
  return (
    <div className='lr-c-global-learning-resources-page__header'>
      <img src="../../icons/LearningResources.svg" alt="Learning resources icon" />
      <Divider />
      <Stack>

        <StackItem>

        </StackItem>
      </Stack>
    </div>
  );
};

export default GlobalLearningResourcesHeader;
