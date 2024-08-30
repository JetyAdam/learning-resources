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

export const GlobalLearningResourcesFilters = () => {
  const [inputValue, setInputValue] = useState('');

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
      {data.map((category: FiltersCategory, index: number) => (
        <StackItem key={index}>
          <GlobalLearningResourcesFiltersCategory
            categoryName={category.categoryName}
            categoryData={category.categoryData}
          />
        </StackItem>
      ))}
    </Stack>
  );
};

export default GlobalLearningResourcesFilters;
