import React, { useEffect } from 'react';
import { TabContent } from '@patternfly/react-core';
import './GlobalLearningResourcesContent.scss';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import {
  API_BASE,
  FAVORITES,
  FavoriteQuickStart,
  QUICKSTARTS,
} from '../../hooks/useQuickStarts';
import {
  Badge,
  Button,
  ExpandableSection,
  Flex,
  FlexItem,
  Gallery,
  GalleryItem,
  Icon,
  Split,
  SplitItem,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import {
  QuickStart,
  QuickStartTile,
  getQuickStartStatus,
} from '@patternfly/quickstarts';
import axios from 'axios';

interface GlobalLearningResourcesContentProps {
  activeTabKey: number;
}

const GlobalLearningResourcesContent: React.FC<
  GlobalLearningResourcesContentProps
> = ({ activeTabKey }) => {
  const chrome = useChrome();
  let quickstartsData;

  async function fetchData() {
    const user = await chrome.auth.getUser();
    if (!user) {
      throw new Error('User not logged in');
    }

    const account = user.identity.internal?.account_id;

    const quickstartsPath = `${API_BASE}/${QUICKSTARTS}`;

    const contentPromise = axios
      .get<{ data: { content: QuickStart }[] }>(quickstartsPath)
      .then(({ data }) => {
        console.log(data);
        return data;
      });

    // const favoritesPromise = account
    //   ? axios
    //       .get<{ data: FavoriteQuickStart[] }>(
    //         `${API_BASE}/${FAVORITES}?account=${account}`
    //       )
    //       .then(({ data }) => data.data)
    //   : Promise.resolve<FavoriteQuickStart[]>([]);

    // const promises = [contentPromise, favoritesPromise];
    // const [, favorites] = await Promise.allSettled(promises);
    // if (favorites.status === 'fulfilled' && favorites.value) {
    //   // setFavorites(favorites.value);
    // }

    // setContentReady(true);
  }

  useEffect(() => {
    quickstartsData = fetchData();
  }, []);

  return (
    <div className="lr-c-global-learning-resources-page__content">
      <TabContent id="refTabResources" eventKey={0} hidden={activeTabKey !== 0}>
        <Gallery>
          {quickstartsData &&
            quickstartsData?.data.map((quickStart) => {
              <GalleryItem key={quickStart.metadata.name}>
                <QuickStartTile
                  action={undefined}
                  quickStart={{
                    ...quickStart,
                    spec: {
                      ...quickStart.spec,
                      // remove any lingering icons
                      icon: null,
                    },
                  }}
                  isActive={true}
                  status={getQuickStartStatus({}, quickStart.metadata.name)}
                />
              </GalleryItem>;
            })}
        </Gallery>
      </TabContent>
      <TabContent id="refTabBookmarks" eventKey={1} hidden={activeTabKey !== 1}>
        Tab 2 section DFSFSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
      </TabContent>
    </div>
  );
};

export default GlobalLearningResourcesContent;
