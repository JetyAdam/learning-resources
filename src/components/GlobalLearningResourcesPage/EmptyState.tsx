import React from 'react';
import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateIcon,
} from '@patternfly/react-core';
import CubesIcon from '@patternfly/react-icons/dist/dynamic/icons/cubes-icon';
import { useSearchParams } from 'react-router-dom';
import { TabsEnum } from '../../utils/TabsEnum';
import './GlobalLearningResourcesContent.scss';

const EmptyStateComponent: React.FC = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <Bullseye>
      <EmptyState className="lr-c-global-learning-resources-page__content--empty">
        <EmptyStateHeader
          titleText="No resources bookmarked"
          headingLevel="h4"
          icon={<EmptyStateIcon icon={CubesIcon} />}
        />
        <EmptyStateBody>
          You don&apos;t have any bookmarked learning resources. Click the icon
          in cards on the &apos;All learning resources&apos; tab to bookmark a
          resource.
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
};

export default EmptyStateComponent;
