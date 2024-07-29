import React, { useState } from 'react';
import { Checkbox, ExpandableSection, Stack, StackItem, Text, TextVariants } from '@patternfly/react-core';

interface SubCategory {
  group: string;
  data: string[];
}

interface CategoryProps {
  categoryName: string;
  categoryData: SubCategory[];
}

const GlobalLearningResourcesQuickstartItemCategory: React.FC<CategoryProps> = ({ categoryName, categoryData }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const onToggle = (_event: React.MouseEvent, isExpanded: boolean) => {
    setIsExpanded(isExpanded);
  };

  return (
    <ExpandableSection toggleText={categoryName} onToggle={onToggle} isExpanded={isExpanded}>
      {categoryData.map((subCategory, index) => (
        <Stack key={index} hasGutter>
          <Text component={TextVariants.small} className="pf-u-mb-0">{subCategory.group}</Text>
          {subCategory.data.map((item, itemIndex) => (
            <StackItem key={itemIndex}>
              <Checkbox 
                label={
                  <div className="lr-c-global-learning-resources-page__filters--checkbox">
                    <img 
                      className="lr-c-global-learning-resources-page__filters--checkbox-icon" 
                      src='/apps/frontend-assets/console-landing/ansible.svg' 
                      alt={item}
                    />
                    {item}
                  </div>
                } 
                id={item.toLowerCase().replace(/ /g, '-')}
              />
            </StackItem>
          ))}
        </Stack>
      ))}
    </ExpandableSection>
  );
};

export default GlobalLearningResourcesQuickstartItemCategory;
