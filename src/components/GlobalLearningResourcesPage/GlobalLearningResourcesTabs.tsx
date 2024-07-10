import React from 'react';
import { Tab, TabTitleText, Tabs } from '@patternfly/react-core';
import './GlobalLearningResourcesTabs.scss';

interface GlobalLearningResourcesTabsProps {
  activeTabKey: number | string;
  onSelect: (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => void;
  learningResourcesCount: number;
  bookmarkedResourcesCount: number;
}

const GlobalLearningResourcesTabs: React.FC<
  GlobalLearningResourcesTabsProps
> = ({
  activeTabKey,
  onSelect,
  learningResourcesCount,
  bookmarkedResourcesCount,
}) => {
  return (
    <Tabs
      activeKey={activeTabKey}
      onSelect={onSelect}
      aria-label="Tabs in the separate content example"
      role="region"
      className="lr-c-global-learning-resources-tabs"
    >
      <Tab
        eventKey={0}
        title={
          <TabTitleText>
            All learning resources ({learningResourcesCount})
          </TabTitleText>
        }
        tabContentId="refTabResources"
      />
      <Tab
        eventKey={1}
        title={
          <TabTitleText>
            My bookmarked resources ({bookmarkedResourcesCount})
          </TabTitleText>
        }
        tabContentId="refTabBookmarks"
      />
    </Tabs>
  );
};

export default GlobalLearningResourcesTabs;
