import React, { useEffect } from 'react';
import { GalleryItem, TabContent } from '@patternfly/react-core';
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
import CubesIcon from '@patternfly/react-icons/dist/dynamic/icons/cubes-icon';
import GlobalLearningResourcesQuickstartItem from './GlobalLearningResourcesQuickstartItem';
import { useSearchParams } from 'react-router-dom';
import { UnwrappedLoader } from '@redhat-cloud-services/frontend-components-utilities/useSuspenseLoader';
import { TabsEnum } from '../../utils/TabsEnum';
import fetchAllData from '../../utils/fetchAllData';
import { ExtendedQuickstart } from '../../utils/fetchQuickstarts';
import { Filter, FilterMap, ValidTags } from '../../utils/filtersInterface';

interface GlobalLearningResourcesContentProps {
  purgeCache: () => void;
  loader: UnwrappedLoader<typeof fetchAllData>;
}

interface GalleryQuickstartProps {
  quickStarts: ExtendedQuickstart[];
  purgeCache: () => void;
  filterMap: FilterMap;
}

function isValidTagType(
  key: string,
  storage: ValidTags
): key is keyof ValidTags {
  return Object.prototype.hasOwnProperty.call(storage, key);
}

const findQuickstartFilterTags = (
  filterMap: FilterMap,
  QuickStart: ExtendedQuickstart
) => {
  // const productFamiliesTags: Tag[] = QuickStart.metadata.tags.filter(
  //   (tag: Tag) => tag.kind === 'product-families'
  // );
  // const productFamiliesTags = QuickStart.metadata.tags.reduce((acc, tag) => {
  //   return {...acc,
  //     filterMap[tag.kind][tag.value]
  //   }
  // }, {});

  const modifiedTags = QuickStart.metadata.tags.reduce<{
    'product-families': Filter[];
    'use-case': Filter[];
  }>(
    (acc, curr) => {
      const key = curr.kind;
      // pokud curr.kind existuje v acc
      if (isValidTagType(key, acc)) {
        const newEntry = filterMap[curr.kind][curr.value];
        // pushnout tag do spravne kategorie
        acc[key].push(newEntry);
      }
      return acc;
    },
    {
      'product-families': [],
      'use-case': [],
    }
  );

  return modifiedTags;

  // return productFamiliesTags.map((tag: Tag) => {
  //   return filterMap['product-families'][tag.value];
  // });
};

const GalleryQuickstart: React.FC<GalleryQuickstartProps> = ({
  quickStarts,
  purgeCache,
  filterMap,
}) => {
  return (
    <Gallery
      hasGutter
      className="lr-c-global-learning-resources-page__content--gallery"
    >
      {quickStarts.map((quickStart) => {
        const productFamiliesTags = findQuickstartFilterTags(
          filterMap,
          quickStart
        );
        return (
          <GalleryItem
            key={quickStart.metadata.name}
            className="lr-c-global-learning-resources-page__content--gallery-card-wrapper"
          >
            <GlobalLearningResourcesQuickstartItem
              quickStart={quickStart}
              purgeCache={purgeCache}
              quickStartTags={productFamiliesTags}
              key={quickStart.metadata.name}
            />
          </GalleryItem>
        );
      })}
    </Gallery>
  );
};

const GalleryBookmarkedQuickstart: React.FC<GalleryQuickstartProps> = ({
  quickStarts,
  purgeCache,
  filterMap,
}) => {
  const [, setSearchParams] = useSearchParams();

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
              <Button
                variant="link"
                onClick={() => setSearchParams({ tab: TabsEnum.All })}
              >
                Go to the &apos;All learning resources&apos; tab
              </Button>
            </EmptyStateActions>
          </EmptyStateFooter>
        </EmptyState>
      </Bullseye>
    );
  }
  const bookmarkedQuickStarts = quickStarts.filter(
    (item) => item.metadata.favorite
  );
  return (
    <Gallery
      hasGutter
      className="lr-c-global-learning-resources-page__content--gallery"
    >
      {bookmarkedQuickStarts.map((quickStart) => {
        if (quickStart.metadata.favorite) {
          const productFamiliesTags = findQuickstartFilterTags(
            filterMap,
            quickStart as ExtendedQuickstart
          );
          return (
            <div
              key={quickStart.metadata.name}
              className="lr-c-global-learning-resources-page__content--gallery-card-wrapper"
            >
              <GlobalLearningResourcesQuickstartItem
                quickStart={quickStart}
                purgeCache={purgeCache}
                quickStartTags={productFamiliesTags}
                key={quickStart.metadata.name}
              />
            </div>
          );
        }
      })}
    </Gallery>
  );
};

const GlobalLearningResourcesContent: React.FC<
  GlobalLearningResourcesContentProps
> = ({ loader, purgeCache }) => {
  const chrome = useChrome();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ tab: TabsEnum.All });
  }, []);

  const [filters, quickStarts] = loader(chrome.auth.getUser);
  console.log(filters);
  console.log(quickStarts);

  // Create a hashmap for the filters
  // const filterMap = new Map();

  // filters sou nejaky pole => [{...}]

  /**
   * const filterMap = {
   *  "product-families": {
   *     ansible: {
   *       id: 'ansible',
   *       cardLabel: 'Ansible',
   *       filterLabel: 'Ansible'
   *     }
   *   }
   * }
   */

  /**
   * Footer
   * productFamilies = quickstart.metadata.tags.filters(({kind}) => kind === 'productFamilies') // ansible
   *
   *
   * // iterovat pres productFamilies -> productFamily
   * <Text>{filterMap['product-families'][productFamily].cardLabel}</Text>
   */

  const filterMap: FilterMap = {};

  filters.data.categories.forEach((category) => {
    const categoryId = category.categoryId;

    // Initialize the category object if it doesn't exist
    if (!filterMap[categoryId]) {
      filterMap[categoryId] = {};
    }

    category.categoryData.forEach((dataGroup) => {
      dataGroup.data.forEach((filter) => {
        filterMap[categoryId][filter.id] = {
          id: filter.id,
          cardLabel: filter.cardLabel,
          filterLabel: filter.filterLabel,
        };
      });
    });
  });

  return (
    <div className="pf-v5-u-p-md">
      <TabContent
        id="refTabResources"
        hidden={searchParams.get('tab') !== TabsEnum.All}
      >
        <GalleryQuickstart
          quickStarts={quickStarts}
          filterMap={filterMap}
          purgeCache={purgeCache}
        />
      </TabContent>
      <TabContent
        id="refTabBookmarks"
        hidden={searchParams.get('tab') !== TabsEnum.Bookmarks}
      >
        <GalleryBookmarkedQuickstart
          quickStarts={quickStarts}
          purgeCache={purgeCache}
          filterMap={filterMap}
        />
      </TabContent>
    </div>
  );
};

export default GlobalLearningResourcesContent;
