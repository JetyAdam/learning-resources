import React, { useState } from 'react';
import {
  Button,
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Text,
  TextContent,
  TextInputGroup,
  TextInputGroupMain,
  TextVariants,
} from '@patternfly/react-core';
import { FilterIcon, SortAmountDownAltIcon } from '@patternfly/react-icons';
import './GlobalLearningResourcesFilters.scss';
import GlobalLearningResourcesFiltersCategory from './GlobalLearningResourcesFiltersCategory';
import { FiltersCategory } from '../../utils/FiltersCategoryInterface';
import { UnwrappedLoader } from '@redhat-cloud-services/frontend-components-utilities/useSuspenseLoader';
import fetchAllData from '../../utils/fetchAllData';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import {
  FetchQuickstartsOptions,
  loaderOptionsFalllback,
} from '../../utils/fetchQuickstarts';
import type { GlobalLearningResourcesFiltersProps } from './GlobalLearningResourcesFilters';
import './GlobalLearningResourcesFiltersMobile.scss';

const GlobalLearningResourcesFiltersMobile: React.FC<
  GlobalLearningResourcesFiltersProps
> = ({ loader, loaderOptions, setLoaderOptions }) => {
  // const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  // const [isSubMenuOpen, setIsSubMenuOpen] = useState<{
  //   [itemId: string]: boolean;
  // }>({});

  const chrome = useChrome();

  //const [filters] = loader(chrome.auth.getUser);

  // const toggleMainMenu = () => {
  //   setIsMainMenuOpen((prev) => !prev);
  // };

  // const toggleSubMenu = (itemId: string) => {
  //   setIsSubMenuOpen((prev) => ({
  //     ...prev,
  //     [itemId]: !prev[itemId],
  //   }));
  //};

  // const handleInputChange = (
  //   _event: React.FormEvent<HTMLInputElement>,
  //   value: string
  // ) => {
  //   if (value !== loaderOptions['display-name']) {
  //     setLoaderOptions({
  //       ...(loaderOptions || loaderOptionsFalllback),
  //       'display-name': value,
  //     });
  //   }
  // };

  return (
    <div
      className="lr-c-global-learning-resources-page__filters-mobile pf-v5-u-p-md"
      // display={{ default: 'inlineFlex' }}
    >
      <FlexItem className="lr-c-global-learning-resources-page__filters-mobile--input">
        <TextInputGroup>
          <TextInputGroupMain
            icon={<FilterIcon />}
            value={loaderOptions['display-name']}
            placeholder="Find by name ..."
            //onChange={console.log("change")}
          />
        </TextInputGroup>
      </FlexItem>
      <FlexItem>
        <FilterIcon />
      </FlexItem>
      <FlexItem>
        <Button variant="plain">
          <SortAmountDownAltIcon />
        </Button>
      </FlexItem>
      <FlexItem>
        <Button variant="plain">
          <TextContent>
            <Text component={TextVariants.small}>Clear Filters</Text>
          </TextContent>
        </Button>
      </FlexItem>
    </div>
  );
};

export default GlobalLearningResourcesFiltersMobile;
