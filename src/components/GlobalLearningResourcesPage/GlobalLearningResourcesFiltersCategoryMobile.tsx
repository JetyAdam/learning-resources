import React from 'react';
import {
  MenuItem,
  DrilldownMenu,
  Divider,
  Checkbox,
} from '@patternfly/react-core';
import { FiltersCategory } from '../../utils/FiltersCategoryInterface';
import { Filter } from '../../utils/filtersInterface';
import { Filter, updateCategory } from '../../utils/filtersInterface';

interface GlobalLearningResourcesFiltersCategoryMobileProps extends FiltersCategory {
  isFilterChecked: (filterId: string) => boolean;
  updateLoaderOptions: (filter: Filter, isChecked: boolean) => void;
}

const GlobalLearningResourcesFiltersCategoryMobile: React.FC<
  GlobalLearningResourcesFiltersCategoryMobileProps
> = ({
  categoryId,
  categoryName,
  categoryData,
  setLoaderOptions,
}) => {

  const updateLoaderOptions = (filter: Filter, isChecked: boolean) => {
    const currentCategory = loaderOptions[categoryId];

    const updatedCategory = updateCategory(
      isChecked,
      filter.id,
      currentCategory
    );

    setLoaderOptions({
      ...loaderOptions,
      [categoryId]: updatedCategory,
    });
  };

  const isFilterChecked = (filterId: string) => {
    return (loaderOptions[categoryId] || []).includes(filterId);
  };

  return (
    <MenuItem
      key={categoryId}
      itemId={`category:${categoryId}`}
      direction="down"
      drilldownMenu={
        <DrilldownMenu id={`menu-${categoryId}`}>
          {/* Breadcrumb for returning to the main menu */}
          <MenuItem
            itemId={`category:${categoryId}_breadcrumb`}
            direction="up"
          >
            {categoryName}
          </MenuItem>
          <Divider component="li" />
          {/* Render Subcategories and Filters */}
          {categoryData.map((group, index) => {
            const hasGroup = !!group.group;

            // Render filters directly if no group
            if (!hasGroup && Array.isArray(group.data)) {
              return group.data.map((item) => (
                <MenuItem
                  key={item.id}
                  itemId={`item:${categoryId}-${item.id}`}
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
                    onChange={(event: React.FormEvent<HTMLInputElement>) =>
                      updateLoaderOptions(item, event.currentTarget.checked)
                    }
                  />
                </MenuItem>
              ));
            }

            // Render grouped filters
            return (
              <MenuItem
                key={index}
                itemId={`group:${categoryId}-${group.group}`}
                direction={
                  Array.isArray(group.data) ? 'down' : undefined
                }
                drilldownMenu={
                  Array.isArray(group.data) && (
                    <DrilldownMenu
                      id={`menu-group-${categoryId}-${group.group}`}
                    >
                      <MenuItem
                        itemId={`group:${categoryId}-${group.group}_breadcrumb`}
                        direction="up"
                      >
                        {group.group || 'Unnamed group'}
                      </MenuItem>
                      <Divider component="li" />
                      {group.data.map((item) => (
                        <MenuItem
                          key={item.id}
                          itemId={`item:${categoryId}-${item.id}`}
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
                            onChange={(event: React.FormEvent<HTMLInputElement>) =>
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
      {categoryName}
    </MenuItem>
  );
};

export default GlobalLearningResourcesFiltersCategoryMobile;
