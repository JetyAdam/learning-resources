import React from 'react';
import { TabContent } from '@patternfly/react-core';

interface GlobalLearningResourcesContentProps {
  activeTabKey: number;
}

const GlobalLearningResourcesContent: React.FC<GlobalLearningResourcesContentProps> = ({
  activeTabKey,
}) => {
  return (
    <>
      <TabContent id="refTabResources" eventKey={0} hidden={activeTabKey !== 0}>
        Tab 1 section
        DSFFFFFFFFFDDDDDDDDDDDDDDDDDDDDDDDD
      </TabContent>
      <TabContent id="refTabBookmarks" eventKey={1} hidden={activeTabKey !== 1}>
        Tab 2 section
        DFSFSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
      </TabContent>
    </>
  );
};

export default GlobalLearningResourcesContent;
