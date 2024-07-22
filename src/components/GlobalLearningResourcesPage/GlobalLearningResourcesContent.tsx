import React from 'react';
import { TabContent } from '@patternfly/react-core';
import './GlobalLearningResourcesContent.scss';
import { Bullseye, Gallery } from '@patternfly/react-core';
import { QuickStart } from '@patternfly/quickstarts';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateIcon,
} from '@patternfly/react-core';
import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon';
import fetchSuperQuickstarts from '../../utils/fetchQuickstarts';
import GlobalLearningResourcesQuickstartItem from './GlobalLearningResourcesQuickstartItem';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Foobar<AsyncFunc extends (...args: any[]) => Promise<unknown>> = (
  ...args: Parameters<AsyncFunc>
) => Awaited<ReturnType<AsyncFunc>>;

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
  purgeCache: () => void;
  loader: Foobar<typeof fetchSuperQuickstarts>;
}

interface GalleryQuickstartProps {
  quickStarts: QuickStart[];
  purgeCache: () => void;
}

const GalleryQuickstart: React.FC<GalleryQuickstartProps> = ({
  quickStarts,
  purgeCache,
}) => {
  return (
    <Gallery className="lr-c-global-learning-resources-page__content--gallery">
      {quickStarts.map((quickStart) => {
        return (
          <GlobalLearningResourcesQuickstartItem
            quickStart={quickStart}
            purgeCache={purgeCache}
            key={quickStart.metadata.name}
          />
        );
      })}
    </Gallery>
  );
};

const GalleryBookmarkedQuickstart: React.FC<GalleryQuickstartProps> = ({
  quickStarts,
  purgeCache,
}) => {
  const bookmarkedItemsCount = quickStarts.reduce(
    (acc, quickStart) => (quickStart.metadata.favorite ? acc + 1 : acc),
    0
  );
  if (bookmarkedItemsCount === 0) {
    return (
      <Bullseye>
        <EmptyState className="lr-c-global-learning-resources-page__content--empty">
          <EmptyStateHeader
            titleText="No resources bookmarked"
            headingLevel="h4"
            icon={<EmptyStateIcon icon={CubesIcon} />}
          />
          <EmptyStateBody>
            You don&apos;t have any bookmarked learning resources. Click the
            icon in cards on the &apos;All learning resources&apos; tab to
            bookmark a resource.
          </EmptyStateBody>
          <EmptyStateFooter>
            <EmptyStateActions>
              <Button variant="link">
                Go to the &apos;All learning resources&apos; tab
              </Button>
            </EmptyStateActions>
          </EmptyStateFooter>
        </EmptyState>
      </Bullseye>
    );
  }
  return (
    <Gallery className="lr-c-global-learning-resources-page__content--gallery">
      {quickStarts.map((quickStart) => {
        if (quickStart.metadata.favorite) {
          return (
            <GlobalLearningResourcesQuickstartItem
              quickStart={quickStart}
              purgeCache={purgeCache}
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
> = ({ activeTabKey, loader, purgeCache }) => {
  // const { loader, purgeCache } = useAsyncLoader(fetchSuperQuickstarts);
  // const [favorites, setFavorites] = useState<FavoriteQuickStart[]>([]);
  const chrome = useChrome();

  const quickStarts = loader(chrome.auth.getUser);

  return (
    <div className="lr-c-global-learning-resources-page__content">
      <TabContent id="refTabResources" eventKey={0} hidden={activeTabKey !== 0}>
        {/* <Suspense fallback="Loading"> */}
        <GalleryQuickstart
          quickStarts={quickStarts}
          // favorites={favorites}
          // setFavorites={setFavorites}
          purgeCache={purgeCache}
        />
        {/* </Suspense> */}
      </TabContent>
      <TabContent id="refTabBookmarks" eventKey={1} hidden={activeTabKey !== 1}>
        {/* <Suspense fallback="Loading"> */}
        <GalleryBookmarkedQuickstart
          quickStarts={quickStarts}
          // favorites={favorites}
          // setFavorites={setFavorites}
          purgeCache={purgeCache}
        />
        {/* </Suspense> */}
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
