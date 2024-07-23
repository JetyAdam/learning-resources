import React, { SyntheticEvent, useState } from 'react';
import { useFlag } from '@unleash/proxy-client-react';
import { QuickStart } from '@patternfly/quickstarts';
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Flex,
  FlexItem,
  GalleryItem,
  Icon,
  Label,
} from '@patternfly/react-core';
import { API_BASE, FAVORITES } from '../../hooks/useQuickStarts';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { BookmarkIcon, OutlinedBookmarkIcon } from '@patternfly/react-icons';
import axios from 'axios';
import './GlobalLearningResourcesQuickstartItem.scss';

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
  console.log(quickStart);
  const quickStartURL = new URL(
    quickStart.spec.link?.href ?? 'https://access.redhat.com/'
  );

  return (
    <GalleryItem key={quickStart.metadata.name}>
      <Card>
        <CardTitle
          component="div"
          className="lr-c-global-learning-resources-quickstart__card--title"
        >
          <Flex>
            <img
              src="/apps/frontend-assets/console-landing/ansible.svg"
              alt=""
            />
            <Flex direction={{ default: 'column' }}>
              <Label color="orange">{quickStart.spec.type?.text}</Label>
              <span className="lr-c-global-learning-resources-quickstart__card--title-span">
                {quickStartURL.hostname}
              </span>
            </Flex>
            <OutlinedBookmarkIcon />
          </Flex>
        </CardTitle>
        <CardBody component="div">
          <Flex direction={{ default: 'column' }}>
            <span className="lr-c-global-learning-resources-quickstart__card--body-name">
              {quickStart.spec.displayName}
            </span>
            <p className="lr-c-global-learning-resources-quickstart__card--body-description">{quickStart.spec.description}</p>
          </Flex>
        </CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
      {/* <QuickStartTile
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
      /> */}
    </GalleryItem>
  );
};

export default GlobalLearningResourcesQuickstartItem;
