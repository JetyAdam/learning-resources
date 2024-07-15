import React, { Suspense, SyntheticEvent, useEffect, useState } from 'react';
import { TabContent } from '@patternfly/react-core';
import './GlobalLearningResourcesContent.scss';
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
import { BookmarkIcon, OutlinedBookmarkIcon } from '@patternfly/react-icons';
import axios from 'axios';
import useAsyncLoader from '../../hooks/useAsyncLoader';
import { useFlag } from '@unleash/proxy-client-react';
import toggleFavorite from '../../utils/toggleFavorite';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { ChromeAPI } from '@redhat-cloud-services/types';
import fetchSuperQuickstarts from '../../utils/fetchQuickstarts';

const OutlinedBookmarkedIcon = () => (
  <Icon className="lr-c-bookmark__icon">
    <OutlinedBookmarkIcon />
  </Icon>
);

const BookmarkedIcon = () => (
  <Icon className="lr-c-bookmark__icon">
    <BookmarkIcon />
  </Icon>
);

interface GlobalLearningResourcesContentProps {
  activeTabKey: number;
  targetBundle: string;
}

async function loadQuickstart(getUser: ChromeAPI['auth']['getUser']) {
  const quickstartsPath = `${API_BASE}/${QUICKSTARTS}`;
  const user = await getUser();
  // account: user!.identity.internal?.account_id,
  return axios
    .get<{ data: { content: QuickStart }[] }>(quickstartsPath)
    .then(({ data }) => {
      console.log(data);
      return data.data.map((data) => data.content);
    });
}

interface GalleryQuickstartProps {
  // loadQuickstart: (
  //   getUser: ChromeAPI['auth']['getUser']
  // ) => QuickStart[] | undefined;
  favorites: FavoriteQuickStart[];
  setFavorites: (favorites: FavoriteQuickStart[]) => void;
  targetBundle: string;
}

const GalleryQuickstart: React.FC<GalleryQuickstartProps> = ({
  // loadQuickstart,
  favorites,
  setFavorites,
  targetBundle,
}) => {
  const chrome = useChrome();
  // const quickstarts = loadQuickstart(chrome.auth.getUser);
  const [quickstarts,] = fetchSuperQuickstarts(chrome, targetBundle);
  const showBookmarks = useFlag('platform.learning-resources.bookmarks');

  return (
    <Gallery className="lr-c-global-learning-resources-page__content--gallery">
      {quickstarts?.map((quickStart) => {
        return (
          <GalleryItem key={quickStart.metadata.name}>
            <QuickStartTile
              action={{
                'aria-label': quickStart.metadata.favorite
                  ? `Remove quickstart ${quickStart.spec.displayName} from bookmarks.`
                  : `Bookmark quickstart ${quickStart.spec.displayName}.`,
                icon: showBookmarks
                  ? quickStart.metadata.favorite
                    ? BookmarkedIcon
                    : OutlinedBookmarkedIcon
                  : undefined,
                onClick: (e: SyntheticEvent<Element, Event>): void => {
                  if (showBookmarks) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(
                      quickStart.metadata.name,
                      !quickStart.metadata.favorite,
                      favorites,
                      setFavorites,
                      chrome
                    );
                  }
                },
              }}
              quickStart={{
                ...quickStart,
                spec: {
                  ...quickStart.spec,
                  icon: null,
                },
              }}
              isActive={true}
              status={getQuickStartStatus({}, quickStart.metadata.name)}
            />
          </GalleryItem>
        );
      })}
    </Gallery>
  );
};

const GlobalLearningResourcesContent: React.FC<
  GlobalLearningResourcesContentProps
> = ({ activeTabKey, targetBundle }) => {
  // const { loader } = useAsyncLoader(loadQuickstart);
  const [favorites, setFavorites] = useState<FavoriteQuickStart[]>([]);

  return (
    <div className="lr-c-global-learning-resources-page__content">
      <TabContent id="refTabResources" eventKey={0} hidden={activeTabKey !== 0}>
        <Suspense fallback="Loading">
          <GalleryQuickstart
            // loadQuickstart={loader}
            targetBundle={targetBundle}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </Suspense>
      </TabContent>
      <TabContent id="refTabBookmarks" eventKey={1} hidden={activeTabKey !== 1}>
        Tab 2 section DFSFSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
      </TabContent>
    </div>
  );
};

export default GlobalLearningResourcesContent;
