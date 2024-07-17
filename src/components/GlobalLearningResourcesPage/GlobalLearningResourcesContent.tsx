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
import GlobalLearningResourcesQuickstartItem from './GlobalLearningResourcesQuickstartItem';

/**
 * Optimistic UI
 * UI se tvari ze vsecny async requesty budou mit 2xx response
 *
 * 1. Return z quickstarts map musi byt vlastni komponenta
 * 2. Ta komponenta musi mit interni state managmeent na favorite, state bude inicializovany z quctsrtas.metadata.favorite
 * 3. Bude nova async funkce na toggle favorite
 *   a. jeste pred tim nez se zavolaji async veci (toggle) nastavis novy state likalne pro favorite
 *   b. "napozadi" po update se zavolaj async veci vcetne purge
 *   c. kdyz se API call posere, vratis state do puvodniho stavu
 */

interface GlobalLearningResourcesContentProps {
  activeTabKey: number;
}

interface GalleryQuickstartProps {
  quickStarts: QuickStart[];
  favorites: FavoriteQuickStart[];
  setFavorites: (favorites: FavoriteQuickStart[]) => void;
  purgeCache: () => void;
}

const GalleryQuickstart: React.FC<GalleryQuickstartProps> = ({
  quickStarts,
  favorites,
  setFavorites,
  purgeCache,
}) => {
  return (
    <Gallery className="lr-c-global-learning-resources-page__content--gallery">
      {quickStarts?.map((quickStart) => {
        return (
          <GlobalLearningResourcesQuickstartItem
            quickStart={quickStart}
            purgeCache={purgeCache}
            favorites={favorites}
            setFavorites={setFavorites}
            key={quickStart.metadata.name}
          />
        );
      })}
    </Gallery>
  );
};

const GalleryBookmarkedQuickstart: React.FC<GalleryQuickstartProps> = ({
  quickStarts,
  favorites,
  setFavorites,
  purgeCache,
}) => {
  return (
    <Gallery className="lr-c-global-learning-resources-page__content--gallery">
      {quickStarts?.map((quickStart) => {
        if (quickStart.metadata.favorite) {
          return (
            <GlobalLearningResourcesQuickstartItem
              quickStart={quickStart}
              purgeCache={purgeCache}
              favorites={favorites}
              setFavorites={setFavorites}
              key={quickStart.metadata.name}
            />
          );
        }
      })}
    </Gallery>
  );
};

const GlobalLearningResourcesContent: React.FC<
  GlobalLearningResourcesContentProps
> = ({ activeTabKey }) => {
  const [quickStarts, setQuickStarts] = useState<QuickStart[]>([]);
  const { loader, purgeCache } = useAsyncLoader(fetchSuperQuickstarts);
  const [favorites, setFavorites] = useState<FavoriteQuickStart[]>([]);
  const chrome = useChrome();

  return (
    <div className="lr-c-global-learning-resources-page__content">
      <TabContent id="refTabResources" eventKey={0} hidden={activeTabKey !== 0}>
        <Suspense fallback="Loading">
          <GalleryQuickstart
            quickStarts={quickStarts}
            favorites={favorites}
            setFavorites={setFavorites}
            purgeCache={purgeCache}
          />
        </Suspense>
      </TabContent>
      <TabContent id="refTabBookmarks" eventKey={1} hidden={activeTabKey !== 1}>
        <Suspense fallback="Loading">
          <GalleryBookmarkedQuickstart
            quickStarts={quickStarts}
            favorites={favorites}
            setFavorites={setFavorites}
            purgeCache={purgeCache}
          />
        </Suspense>
      </TabContent>
    </div>
  );
};

export default GlobalLearningResourcesContent;

// const LoaderReader = ({ loader }) => {
//   const filters = useFilters();
//   const data = loader(filters);

//   return <div>{JSON.stringify(data)}</div>;
// };

// const LoaderRoot = () => {
//   const { loader, purge } = useAsyncLoader(fetchdata);

//   return (
//     <Suspense>
//       <LoaderReader loader={loader} />
//     </Suspense>
//   )
// };
