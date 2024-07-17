import React, { SyntheticEvent, useState } from 'react';
import { useFlag } from '@unleash/proxy-client-react';
import {
  QuickStart,
  QuickStartCatalogEmptyState,
  QuickStartTile,
  getQuickStartStatus,
} from '@patternfly/quickstarts';
import { GalleryItem, Icon } from '@patternfly/react-core';
import toggleFavorite from '../../utils/toggleFavorite';
import { FavoriteQuickStart } from '../../hooks/useQuickStarts';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { BookmarkIcon, OutlinedBookmarkIcon } from '@patternfly/react-icons';

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

interface GlobalLearningResourcesQuickstartItemProps {
  quickStart: QuickStart;
  purgeCache: () => void;
  favorites: FavoriteQuickStart[];
  setFavorites: (favorites: FavoriteQuickStart[]) => void;
}

const GlobalLearningResourcesQuickstartItem: React.FC<
  GlobalLearningResourcesQuickstartItemProps
> = ({ quickStart, purgeCache, favorites, setFavorites }) => {
  const chrome = useChrome();
  const showBookmarks = useFlag('platform.learning-resources.bookmarks');
  const [isBookmarked, setIsBookmarked] = useState(
    quickStart.metadata.favorite
  );

  return (
    <GalleryItem key={quickStart.metadata.name}>
      <QuickStartTile
        action={{
          'aria-label': isBookmarked
            ? `Remove quickstart ${quickStart.spec.displayName} from bookmarks.`
            : `Bookmark quickstart ${quickStart.spec.displayName}.`,
          icon: showBookmarks
            ? isBookmarked
              ? BookmarkedIcon
              : OutlinedBookmarkedIcon
            : undefined,
          onClick: async (e: SyntheticEvent<Element, Event>) => {
            if (showBookmarks) {
              // djsakkjd
              e.preventDefault();
              e.stopPropagation();
              try {
                setIsBookmarked((flag: boolean) => !flag);
                await toggleFavorite(
                  quickStart.metadata.name,
                  isBookmarked,
                  favorites,
                  setFavorites,
                  chrome
                );
                purgeCache();
              } catch (error) {
                console.log(error);
                setIsBookmarked(quickStart.metadata.favorite);
              }
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
};

export default GlobalLearningResourcesQuickstartItem;
