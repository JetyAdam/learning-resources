import React, { useRef, useState } from 'react';
import { Tab, TabContent, TabTitleText, Tabs } from '@patternfly/react-core';
import './GlobalLearningResourcesTabs.scss';

interface GlobalLearningResourcesTabsProps {
  learningResourcesCount: number;
  bookmarkedResourcesCount: number;
}

const GlobalLearningResourcesTabs: React.FC<GlobalLearningResourcesTabsProps> = ({
  learningResourcesCount,
  bookmarkedResourcesCount
}) => {
  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);

  const contentRef1 = useRef<HTMLElement>(null);
  const contentRef2 = useRef<HTMLElement>(null);

  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  return (
    <Tabs
      activeKey={activeTabKey}
      onSelect={handleTabClick}
      aria-label="Tabs in the separate content example"
      role="region"
      className='lr-c-global-learning-resources-tabs'
    >
      <Tab eventKey={0} title={<TabTitleText>All learning resources ({learningResourcesCount})</TabTitleText>} />
      <Tab eventKey={1} title={<TabTitleText>My bookmarked resources ({bookmarkedResourcesCount})</TabTitleText>} />
    </Tabs>
  );
};

export default GlobalLearningResourcesTabs;
