import React from 'react';
import { Spinner, Tab, TabTitleText, Tabs } from '@patternfly/react-core';
import './GlobalLearningResourcesTabs.scss';
import fetchSuperQuickstarts from '../../utils/fetchQuickstarts';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { QuickStart } from '@patternfly/quickstarts';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

type Foobar<AsyncFunc extends (...args: any[]) => Promise<unknown>> = (
  ...args: Parameters<AsyncFunc>
) => Awaited<ReturnType<AsyncFunc>>;

interface GlobalLearningResourcesTabsProps {
  loader?: Foobar<typeof fetchSuperQuickstarts>;
}

const GlobalLearningResourcesTabs: React.FC<
  GlobalLearningResourcesTabsProps
> = ({ loader }) => {
  const [searchParams] = useSearchParams();
  const chrome = useChrome();
  const quickStarts: QuickStart[] = loader?.(chrome.auth.getUser) ?? [];

  const bookmarkedResourcesCount = quickStarts.reduce(
    (acc, cur) => (cur.metadata.favorite ? acc + 1 : acc),
    0
  );

  return (
    <Tabs
      aria-label="Tabs in the separate content example"
      role="region"
      className="lr-c-global-learning-resources-tabs"
      activeKey={searchParams.get('tab')!}
    >
      <Tab
        eventKey="all"
        title={
          <Link
            className="lr-c-global-learning-resources-tabs__link"
            to={{
              pathname: '.',
              search: `?tab=all`,
            }}
          >
            <TabTitleText className="lr-c-global-learning-resources-tabs__title">
              All learning resources (
              {!loader ? <Spinner size="md" /> : quickStarts.length})
            </TabTitleText>
          </Link>
        }
        tabContentId="refTabResources"
      />
      <Tab
        eventKey="bookmarks"
        title={
          <Link
            className="lr-c-global-learning-resources-tabs__link"
            to={{
              pathname: '.',
              search: `?tab=bookmarks`,
            }}
          >
            <TabTitleText className="lr-c-global-learning-resources-tabs__title">
              My bookmarked resources (
              {!loader ? <Spinner size="md" /> : bookmarkedResourcesCount})
            </TabTitleText>
          </Link>
        }
        tabContentId="refTabBookmarks"
      />
    </Tabs>
  );
};

export default GlobalLearningResourcesTabs;
