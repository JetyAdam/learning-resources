import React, { SyntheticEvent, useState } from 'react';
import { useFlag } from '@unleash/proxy-client-react';
import { QuickStart } from '@patternfly/quickstarts';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Flex,
  FlexItem,
  GalleryItem,
  Icon,
  Label,
  Stack,
  StackItem,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import { API_BASE, FAVORITES } from '../../hooks/useQuickStarts';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { BookmarkIcon, OutlinedBookmarkIcon } from '@patternfly/react-icons';
import axios from 'axios';
import './GlobalLearningResourcesQuickstartItem.scss';
import { BookmarkedIcon, OutlinedBookmarkedIcon } from '../common/BookmarkIcon';

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
  const labelColor = quickStart.spec.type?.color;

  const handleBookmark = async (e: SyntheticEvent<Element, Event>) => {
    const user = await chrome.auth.getUser();
    if (!user) {
      throw new Error('User not logged in');
    }
    const account = user.identity.internal?.account_id;
    if (showBookmarks) {
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
  };
  
  return (
    <GalleryItem key={quickStart.metadata.name}>
      <Card className="lr-c-global-learning-resources-quickstart__card">
        <TextContent>
          <CardTitle
            component="div"
            className="lr-c-global-learning-resources-quickstart__card--title"
          >
            <div className='lr-c-global-learning-resources-quickstart__card--title-container'>
              <img
                className="lr-c-global-learning-resources-quickstart__card--title-icon"
                src="/apps/frontend-assets/console-landing/ansible.svg"
                alt="card icon"
              />
              <Stack hasGutter={false}>
                <StackItem>
                  <Label isCompact color={labelColor}>
                    {quickStart.spec.type?.text}
                  </Label>
                </StackItem>
                <StackItem>
                  <Text component={TextVariants.small}>
                    {quickStartURL.hostname}
                  </Text>
                </StackItem>
              </Stack>
            </div>
            <Button onClick={handleBookmark} variant="plain" aria-label={ quickStart.metadata.favorite ? "Unbookmark learning resource" : "Bookmark learning resource"}>
            { isBookmarked ? <BookmarkedIcon /> : <OutlinedBookmarkedIcon /> }
            </Button>
          </CardTitle>
          <CardBody component="div">
            <Text component={TextVariants.h3}>
              {quickStart.spec.displayName}
            </Text>
            <Text component={TextVariants.p}>
              {quickStart.spec.description}
            </Text>
          </CardBody>
          <CardFooter>
            <Text component={TextVariants.small}>Footer</Text>
          </CardFooter>
        </TextContent>
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
          onClick: ,
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
