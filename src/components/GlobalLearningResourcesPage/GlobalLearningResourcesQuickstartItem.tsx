import React, { SyntheticEvent, useState } from 'react';
import { useFlag } from '@unleash/proxy-client-react';
import {
  QuickStart,
  QuickStartTile,
  getQuickStartStatus,
} from '@patternfly/quickstarts';
import { GalleryItem, Icon } from '@patternfly/react-core';
import { API_BASE, FAVORITES } from '../../hooks/useQuickStarts';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { BookmarkIcon, OutlinedBookmarkIcon } from '@patternfly/react-icons';
import axios from 'axios';

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
}

const GlobalLearningResourcesQuickstartItem: React.FC<
  GlobalLearningResourcesQuickstartItemProps
> = ({ quickStart, purgeCache }) => {
  const chrome = useChrome();
  const showBookmarks = useFlag('platform.learning-resources.bookmarks');
  const [isBookmarked, setIsBookmarked] = useState(
    quickStart.metadata.favorite
  );

  return (
    <GalleryItem key={quickStart.metadata.name}>
      <div style={{ height: '500px' }}>
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
              const user = await chrome.auth.getUser();
              if (!user) {
                throw new Error('User not logged in');
              }
              const account = user.identity.internal?.account_id;
              if (showBookmarks) {
                // djsakkjd
                e.preventDefault();
                e.stopPropagation();
                try {
                  setIsBookmarked((flag: boolean) => !flag);
                  await axios.post(
                    `${API_BASE}/${FAVORITES}?account=${account}`,
                    {
                      quickstartName: quickStart.metadata.name,
                      favorite: !isBookmarked,
                    }
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
              icon: `/apps/frontend-assets/src/console-landing
            /ansible.svg`,
            },
          }}
          isActive={true}
          status={getQuickStartStatus({}, quickStart.metadata.name)}
        />
      </div>
    </GalleryItem>
  );
};

export default GlobalLearningResourcesQuickstartItem;
