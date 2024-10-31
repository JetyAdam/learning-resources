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

const GlobalLearningResourcesFiltersMobile: React.FC<
  GlobalLearningResourcesFiltersProps
> = ({ loader, loaderOptions, setLoaderOptions }) => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<{
    [itemId: string]: boolean;
  }>({});

  const chrome = useChrome();

  const [filters] = loader(chrome.auth.getUser);

  const toggleMainMenu = () => {
    setIsMainMenuOpen((prev) => !prev);
  };

  const toggleSubMenu = (itemId: string) => {
    setIsSubMenuOpen((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleInputChange = (
    _event: React.FormEvent<HTMLInputElement>,
    value: string
  ) => {
    setLoaderOptions({
      ...(loaderOptions || loaderOptionsFalllback),
      'display-name': value,
    });
  };

  return (
    <Flex className="pf-v5-m-visible-on-sm pf-v5-m-hide-on-md">
      <FlexItem>
        <TextInputGroup>
          <TextInputGroupMain
            icon={<FilterIcon />}
            value={loaderOptions['display-name']}
            placeholder="Find by name ..."
            onChange={handleInputChange}
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
    </Flex>
  );
};

export default GlobalLearningResourcesFiltersMobile;
