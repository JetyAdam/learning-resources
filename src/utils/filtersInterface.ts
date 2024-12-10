import { TagsEnum } from './tagsEnum';
import type { FetchQuickstartsOptions } from './fetchQuickstarts';

const loaderOptions: FetchQuickstartsOptions = {};

export interface Filter {
  id: string;
  cardLabel: string;
  filterLabel: string;
  icon?: string;
}

export interface CategoryMap {
  [filterId: string]: Filter;
}

export interface FilterMap {
  [categoryId: string]: CategoryMap;
}

export type ValidTags = {
  [TagsEnum.ProductFamilies]: Filter[];
  [TagsEnum.UseCase]: Filter[];
};

export const updateCategory = (
  isChecked: boolean,
  filterId: string,
  currentCategory: string | string[] | undefined
) => {
  if (isChecked) {
    return [
      ...(Array.isArray(currentCategory) ? currentCategory : []),
      filterId,
    ];
  } else if (Array.isArray(currentCategory)) {
    return currentCategory.filter((id) => id !== filterId);
  }

  return currentCategory;
};
