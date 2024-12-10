import React, { useState } from 'react';
import {
  Button,
  Checkbox,
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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuDrilledIn, setMenuDrilledIn] = useState<string[]>([]);
  const [drilldownPath, setDrilldownPath] = useState<string[]>([]);

  const [menuHeights, setMenuHeights] = React.useState<any>({
    rootMenu: 140,
  });

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
    console.log({ menuId, height });
    if (
      menuHeights[menuId] === undefined ||
      (menuId !== 'rootMenu' && menuHeights[menuId] !== height)
    ) {
      setMenuHeights({ ...menuHeights, [menuId]: height });
    }
  };

  return (
    <div className="lr-c-global-learning-resources-page__filters-mobile pf-v5-u-p-md">
      <div className="lr-c-global-learning-resources-page__filters-container">
        {/* Input Row, MenuToggle, and Buttons */}
        <div className="lr-c-global-learning-resources-page__filters-row">
          <TextInputGroup className="lr-c-global-learning-resources-page__filters-input">
            <TextInputGroupMain
              icon={<FilterIcon />}
              value={loaderOptions['display-name']}
              placeholder="Find by name ..."
              onChange={handleInputChange}
            />
          </TextInputGroup>
          <MenuToggle
            variant="plain"
            onClick={toggleMainMenu}
            isExpanded={activeMenu !== null}
            aria-expanded={activeMenu !== null}
            aria-label="Filter menu toggle"
          >
            <FilterIcon />
          </MenuToggle>
          <Button variant="plain" className="pf-v5-u-pl-0">
            <SortAmountDownAltIcon />
          </Button>
          <Button
            variant="plain"
            className="lr-c-global-learning-resources-page__filters-clear"
          >
            <TextContent className="lr-c-global-learning-resources-page__filters-text">
              <Text component={TextVariants.small}>Clear Filters</Text>
            </TextContent>
          </Button>
        </div>

        {/* Menu */}
        {activeMenu && (
          <div className="lr-c-global-learning-resources-page__menu-container">
            <Menu
              id="rootMenu"
              // key={`root-menu-${activeMenu}`}
              containsDrilldown
              drilldownItemPath={drilldownPath}
              drilledInMenus={menuDrilledIn}
              activeMenu={activeMenu}
              onDrillIn={drillIn}
              onDrillOut={drillOut}
              onGetMenuHeight={setHeight}
              className="lr-c-global-learning-resources-page__menu"
            >
              <MenuContent menuHeight={`${menuHeights[activeMenu]}px`}>
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
                            {category.categoryName}
                          </MenuItem>
                          <Divider component="li" />
                          {category.categoryData.map((group, index) => {
                            const hasGroup = !!group.group;

                            // Handle cases without groups (e.g., "Content type", "Use case")
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

                            // Handle grouped cases (e.g., "Product families")
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
                                      {group.data.map((item) => (
                                        <MenuItem
                                          key={item.id}
                                          itemId={`item:${category.categoryId}-${item.id}`}
                                        >
                                          <Checkbox
                                            label={
                                              <div className="lr-c-global-learning-resources-page__filters--checkbox">
                                                <div className="lr-c-global-learning-resources-page__filters--checkbox-wrapper">
                                                  {item.icon ? (
                                                    <img
                                                      className="lr-c-global-learning-resources-page__filters--checkbox-icon pf-v5-u-mr-sm"
                                                      src={item.icon}
                                                      alt={item.filterLabel}
                                                    />
                                                  ) : null}
                                                  <span className="lr-c-global-learning-resources-page__filters--checkbox-text">
                                                    {item.filterLabel}
                                                  </span>
                                                </div>
                                              </div>
                                            }
                                            id={item.id}
                                            isChecked={isFilterChecked(item.id)}
                                            onChange={(
                                              event: React.FormEvent<HTMLInputElement>
                                            ) =>
                                              updateLoaderOptions(
                                                item,
                                                event.currentTarget.checked
                                              )
                                            }
                                          />
                                        </MenuItem>
                                      ))}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalLearningResourcesFiltersMobile;
