export interface Filter {
  id: string;
  cardLabel: string;
  filterLabel: string;
}

export interface CategoryMap {
  [filterId: string]: Filter;
}

export interface FilterMap {
  [categoryId: string]: CategoryMap;
}

export type ValidTags = {
  'product-families': Filter[];
  'use-case': Filter[];
};
