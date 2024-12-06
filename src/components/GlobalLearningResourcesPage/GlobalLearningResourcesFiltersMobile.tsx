import React, { useState } from 'react';
import {
  Button,
  Divider,
  DrilldownMenu,
  Menu,
  MenuContent,
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
import './GlobalLearningResourcesFiltersMobile.scss';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { loaderOptionsFalllback } from '../../utils/fetchQuickstarts';
import type { GlobalLearningResourcesFiltersProps } from './GlobalLearningResourcesFilters';

const GlobalLearningResourcesFiltersMobile: React.FC<
  GlobalLearningResourcesFiltersProps
> = ({ loader, loaderOptions, setLoaderOptions }) => {
  const chrome = useChrome();
  const [filters] = loader(chrome.auth.getUser);
  console.log(filters);
  console.log(
    `This is filters.data.categories: ${JSON.stringify(
      filters.data.categories
    )}`
  );

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuDrilledIn, setMenuDrilledIn] = useState<string[]>([]);
  const [drilldownPath, setDrilldownPath] = useState<string[]>([]);
  const [menuHeights, setMenuHeights] = useState<any>({});

  const toggleMainMenu = () => {
    if (activeMenu === null) {
      // Reset to the main menu when reopening
      setActiveMenu('rootMenu');
      setMenuDrilledIn([]);
      setDrilldownPath([]);
    } else {
      setActiveMenu(null); // Close the menu
    }
  };

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

  const drillIn = (
    _event: React.KeyboardEvent | React.MouseEvent,
    fromMenuId: string,
    toMenuId: string,
    pathId: string
  ) => {
    setMenuDrilledIn([...menuDrilledIn, fromMenuId]);
    setDrilldownPath([...drilldownPath, pathId]);
    setActiveMenu(toMenuId);
  };

  const drillOut = (
    _event: React.KeyboardEvent | React.MouseEvent,
    toMenuId: string
  ) => {
    setMenuDrilledIn(menuDrilledIn.slice(0, -1));
    setDrilldownPath(drilldownPath.slice(0, -1));
    setActiveMenu(toMenuId);
  };

  const setHeight = (menuId: string, height: number) => {
    if (!menuHeights[menuId] || menuHeights[menuId] !== height) {
      setMenuHeights({ ...menuHeights, [menuId]: height });
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
          isExpanded={activeMenu !== null}
          aria-expanded={activeMenu !== null}
          aria-label="Filter menu toggle"
        >
          <FilterIcon />
        </MenuToggle>
      </div>

      {activeMenu && (
        <Menu
          id="rootMenu"
          containsDrilldown
          drilldownItemPath={drilldownPath}
          drilledInMenus={menuDrilledIn}
          activeMenu={activeMenu}
          onDrillIn={drillIn}
          onDrillOut={drillOut}
          onGetMenuHeight={setHeight}
        >
          <MenuContent menuHeight={`${menuHeights[activeMenu] || 216}px`}>
            <MenuList>
              {filters.data.categories.map((category) => (
                <MenuItem
                  key={category.categoryId}
                  itemId={`category:${category.categoryId}`}
                  direction="down"
                  drilldownMenu={
                    <DrilldownMenu id={`menu-${category.categoryId}`}>
                      <MenuItem
                        itemId={`category:${category.categoryId}_breadcrumb`}
                        direction="up"
                      >
                        {/* Product families/Content type/Use case */}
                        {category.categoryName}
                      </MenuItem>
                      <Divider component="li" />
                      {category.categoryData.map((group, index) => {
                        const hasGroup = !!group.group;

                        // Directly render the submenu items if there’s no group and data exists
                        if (!hasGroup && Array.isArray(group.data)) {
                          return group.data.map((item) => (
                            <MenuItem
                              key={item.id}
                              itemId={`item:${category.categoryId}-${item.id}`}
                            >
                              {item.cardLabel}
                            </MenuItem>
                          ));
                        }

                        // Render the standard drilldown logic for grouped items
                        return (
                          <MenuItem
                            key={index}
                            itemId={`group:${category.categoryId}-${group.group}`}
                            direction={
                              Array.isArray(group.data) ? 'down' : undefined
                            }
                            drilldownMenu={
                              Array.isArray(group.data) && (
                                <DrilldownMenu
                                  id={`menu-group-${category.categoryId}-${group.group}`}
                                >
                                  <MenuItem
                                    itemId={`group:${category.categoryId}-${group.group}_breadcrumb`}
                                    direction="up"
                                  >
                                    {group.group || 'Unnamed group'}
                                  </MenuItem>
                                  <Divider component="li" />
                                  {group.data.length > 0 ? (
                                    group.data.map((item) => (
                                      <MenuItem
                                        key={item.id}
                                        itemId={`item:${category.categoryId}-${item.id}`}
                                      >
                                        {item.cardLabel}
                                      </MenuItem>
                                    ))
                                  ) : (
                                    <MenuItem key="no-data">
                                      No items available
                                    </MenuItem>
                                  )}
                                </DrilldownMenu>
                              )
                            }
                          >
                            {group.group || 'Unnamed group'}
                          </MenuItem>
                        );
                      })}
                    </DrilldownMenu>
                  }
                >
                  {category.categoryName}
                </MenuItem>
              ))}
            </MenuList>
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
