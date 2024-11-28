import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuToggle,
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
  const chrome = useChrome();

  const [filters] = loader(chrome.auth.getUser);

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<string | null>(null);

  const toggleMainMenu = () => {
    setIsMainMenuOpen((prev) => !prev);
  };

  const toggleSubMenu = (categoryId: string) => {
    setIsSubMenuOpen((prev) => (prev === categoryId ? null : categoryId));
  };
  // TODO zprovoznit ten INPUT a to menu pri ikliknuti na filter iconu

  const handleInputChange = (
    _event: React.FormEvent<HTMLInputElement>,
    value: string
  ) => {
    if (value !== loaderOptions['display-name']) {
      setLoaderOptions({
        ...(loaderOptions || loaderOptionsFalllback),
        'display-name': value,
      });
    }
  };

  return (
    <div className="lr-c-global-learning-resources-page__filters-mobile pf-v5-u-p-md">
      <div className="lr-c-global-learning-resources-page__filters-mobile--input">
        <TextInputGroup>
          <TextInputGroupMain
            icon={<FilterIcon />}
            value={loaderOptions['display-name']}
            placeholder="Find by name ..."
            onChange={handleInputChange}
          />
        </TextInputGroup>
      </div>
      <div className="lr-c-global-learning-resources-page__filters-mobile--icon">
        <MenuToggle
          variant="plain"
          onClick={toggleMainMenu}
          isExpanded={isMainMenuOpen}
          aria-expanded={isMainMenuOpen}
          aria-label="Filter menu toggle"
        >
          <FilterIcon />
        </MenuToggle>
      </div>

      {isMainMenuOpen && (
        <Menu>
          <MenuContent>
            {filters.data.categories.map((category) => (
              <MenuGroup
                key={category.categoryId}
                label={category.categoryName}
              >
                <MenuList>
                  {category.categoryData.map((group, index) => {
                    // Check if this group has nested data
                    const hasNestedData = Array.isArray(group.data);

                    return (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          if (hasNestedData) {
                            toggleSubMenu(group.group || '');
                          }
                        }}
                      >
                        {/* Show group name or category name */}
                        {group.group || category.categoryName}

                        {/* Render submenu if applicable */}
                        {isSubMenuOpen === group.group && hasNestedData && (
                          <Menu>
                            <MenuContent>
                              <MenuList>
                                {group.data.map((item) => (
                                  <MenuItem key={item.id}>
                                    {item.cardLabel}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </MenuContent>
                          </Menu>
                        )}

                        {/* Handle direct data items for categories like "Content type" */}
                        {!hasNestedData &&
                          group.data.map((item) => (
                            <MenuItem key={item.id}>{item.cardLabel}</MenuItem>
                          ))}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </MenuGroup>
            ))}
          </MenuContent>
        </Menu>
      )}

      <div className="lr-c-global-learning-resources-page__filters-mobile--button">
        <Button variant="plain" className="pf-v5-u-pl-0">
          <SortAmountDownAltIcon />
        </Button>
      </div>
      <div className="lr-c-global-learning-resources-page__filters-mobile--clear">
        <Button
          variant="plain"
          className="lr-c-global-learning-resources-page__filters-mobile pf-v5-u-pl-0"
        >
          <TextContent className="lr-c-global-learning-resources-page__filters-mobile--text">
            <Text component={TextVariants.small}>Clear Filters</Text>
          </TextContent>
        </Button>
      </div>
    </div>
  );
};

export default GlobalLearningResourcesFiltersMobile;
