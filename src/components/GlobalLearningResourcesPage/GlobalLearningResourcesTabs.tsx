import React, { useState } from 'react';
import {
  Spinner,
  Tab,
  TabTitleText,
  Tabs,
  TabsProps,
} from '@patternfly/react-core';
import './GlobalLearningResourcesTabs.scss';
import fetchSuperQuickstarts from '../../utils/fetchQuickstarts';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { QuickStart } from '@patternfly/quickstarts';

type Foobar<AsyncFunc extends (...args: any[]) => Promise<unknown>> = (
  ...args: Parameters<AsyncFunc>
) => Awaited<ReturnType<AsyncFunc>>;

interface GlobalLearningResourcesTabsProps {
  activeTabKey: number | string;
  onSelect: TabsProps['onSelect'];
  loader?: Foobar<typeof fetchSuperQuickstarts>;
}

const GlobalLearningResourcesTabs: React.FC<
  GlobalLearningResourcesTabsProps
> = ({ activeTabKey, onSelect, loader }) => {
  const chrome = useChrome();
  const quickStarts: QuickStart[] = loader?.(chrome.auth.getUser) ?? [];

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
            All learning resources (
            {!loader ? <Spinner size="md" /> : quickStarts.length})
          </TabTitleText>
        }
        tabContentId="refTabResources"
      />
      <Tab
        eventKey={1}
        title={
          <TabTitleText>
            My bookmarked resources (
            {!loader ? <Spinner size="md" /> : bookmarkedResourcesCount})
          </TabTitleText>
        }
        tabContentId="refTabBookmarks"
      />
    </Tabs>
  );
};

export default GlobalLearningResourcesTabs;
