import React, { useEffect } from 'react';
import { Tab, TabTitleText, Tabs, TabsProps } from '@patternfly/react-core';
import './GlobalLearningResourcesTabs.scss';
import fetchSuperQuickstarts from '../../utils/fetchQuickstarts';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

type Foobar<AsyncFunc extends (...args: any[]) => Promise<unknown>> = (
  ...args: Parameters<AsyncFunc>
) => Awaited<ReturnType<AsyncFunc>>;

interface GlobalLearningResourcesTabsProps {
  activeTabKey: number | string;
  onSelect: TabsProps['onSelect'];
  loader: Foobar<typeof fetchSuperQuickstarts>;
  purgeCache: () => void;
}

const GlobalLearningResourcesTabs: React.FC<
  GlobalLearningResourcesTabsProps
> = ({ activeTabKey, onSelect, loader }) => {
  // loader call
  const chrome = useChrome();
  const quickStarts = loader(chrome.auth.getUser);

  const bookmarkedResourcesCount = quickStarts.reduce(
    (acc, cur) => (cur.metadata.favorite ? acc + 1 : acc),
    0
  );

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
            All learning resources ({quickStarts.length})
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
