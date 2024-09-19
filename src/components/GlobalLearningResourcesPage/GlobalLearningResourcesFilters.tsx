import React, { useState } from 'react';
import {
  Button,
  Split,
  SplitItem,
  Stack,
  StackItem,
  TextInputGroup,
  TextInputGroupMain,
} from '@patternfly/react-core';
import { FilterIcon, SortAmountDownAltIcon } from '@patternfly/react-icons';
import './GlobalLearningResourcesFilters.scss';
import GlobalLearningResourcesFiltersCategory from './GlobalLearningResourcesFiltersCategory';
import { FiltersCategory } from '../../utils/FiltersCategoryInterface';
import { UnwrappedLoader } from '@redhat-cloud-services/frontend-components-utilities/useSuspenseLoader';
import fetchAllData from '../../utils/fetchAllData';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

<<<<<<< HEAD
export const GlobalLearningResourcesFilters = () => {
=======
interface GlobalLearningResourcesFiltersProps {
  loader: UnwrappedLoader<typeof fetchAllData>;
}

const GlobalLearningResourcesFilters: React.FC<
  GlobalLearningResourcesFiltersProps
> = ({ loader }) => {
>>>>>>> 7037354 (Add missing tags and adjust fetching data from API)
  const [inputValue, setInputValue] = useState('');
  const chrome = useChrome();

  const [filters] = loader(chrome.auth.getUser);

  const handleInputChange = (
    _event: React.FormEvent<HTMLInputElement>,
    value: string
  ) => {
    setInputValue(value);
  };

  return (
    <Stack
      hasGutter
      className="lr-c-global-learning-resources-page__filters pf-v5-u-p-lg"
    >
      <StackItem>
        <Split>
          <SplitItem isFilled>
            <TextInputGroup>
              <TextInputGroupMain
                icon={<FilterIcon />}
                value={inputValue}
                placeholder="Find by name ..."
                onChange={handleInputChange}
              />
            </TextInputGroup>
          </SplitItem>
          <SplitItem>
            <Button variant="plain">
              <SortAmountDownAltIcon />
            </Button>
          </SplitItem>
        </Split>
      </StackItem>
      {filters.data.categories.map(
        (category: FiltersCategory, index: number) => (
          <StackItem key={index}>
            <GlobalLearningResourcesFiltersCategory
              categoryId={category.categoryId}
              categoryName={category.categoryName}
              categoryData={category.categoryData}
            />
          </StackItem>
        )
      )}
    </Stack>
  );
};

export default GlobalLearningResourcesFilters;
