import React, { useState } from 'react';
import { InputGroup, InputGroupItem, InputGroupText, Flex, FlexItem, Text, TextInput, TextVariants, TextContent, Stack, StackItem, Checkbox } from '@patternfly/react-core';
import { AngleDownIcon, FilterIcon, SortAmountDownAltIcon } from '@patternfly/react-icons';
import { right } from '@patternfly/react-core/dist/esm/helpers/Popper/thirdparty/popper-core';
import './GlobalLearningResourcesFilters.scss';
import GlobalLearningResourcesFiltersCategory from './GlobalLearningResourcesFiltersCategory';

interface SubCategory {
  group: string;
  data: string[];
}

interface Category {
  category: string;
  data: SubCategory[];
}

const data = [
  {
    category: "Product families",
    data: [
      {
        group: "Platforms",
        data: ["Ansible", "OpenShift", "RHEL (Red Hat Enterprise Linux)"]
      },
      {
        group: "SaaS services",
        data: ["Quay.io"]
      },
      {
        group: "Console-wide services",
        data: [
          "IAM (Identity and Access Management)",
          "Console settings",
          "Subscription services"
        ]
      }
    ]
  }
];


export const GlobalLearningResourcesFilters = () => {
  const [value, setValue] = useState('');

  return (
    <Stack hasGutter>
      <StackItem><InputGroup>
      <InputGroupText><FilterIcon /></InputGroupText>
      <TextInput value={value} type="text" onChange={(_event, value) => setValue(value)} placeholder="Find by name ..." />
      <InputGroupText isPlain><SortAmountDownAltIcon /></InputGroupText>
    </InputGroup></StackItem>
      {data.map((category: Category, index: number) => (
          <StackItem>
          <GlobalLearningResourcesFiltersCategory 
                categoryName={category.category} 
                categoryData={category.data} 
              />
          </StackItem>
      ))}
    </Stack> 
  )};

  export default GlobalLearningResourcesFilters;

  



