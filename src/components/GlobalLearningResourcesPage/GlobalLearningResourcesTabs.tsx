import React, { useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const chrome = useChrome();
  const quickStarts: QuickStart[] = loader?.(chrome.auth.getUser) ?? [];

  const bookmarkedResourcesCount = quickStarts.reduce(
    (acc, cur) => (cur.metadata.favorite ? acc + 1 : acc),
    0
  );

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      onSelect(null, parseInt(tabFromUrl, 10));
    }
  }, [searchParams, onSelect]);

  const handleTabSelect = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    eventKey: number
  ) => {
    setSearchParams({ tab: eventKey.toString() });
    onSelect(event, eventKey);
  };

  return (
    <Tabs
      activeKey={activeTabKey}
      onSelect={handleTabSelect}
      aria-label="Tabs in the separate content example"
      role="region"
      className="lr-c-global-learning-resources-tabs"
    >
      <Tab
        eventKey={0}
        title={
          <Link
            to={{
              pathname: '.',
              search: `?tab=0`,
            }}
          >
            <TabTitleText>
              All learning resources (
              {!loader ? <Spinner size="md" /> : quickStarts.length})
            </TabTitleText>
          </Link>
        }
        tabContentId="refTabResources"
      />
      <Tab
        eventKey={1}
        title={
          <Link
            to={{
              pathname: '.',
              search: `?tab=1`,
            }}
          >
            <TabTitleText>
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
