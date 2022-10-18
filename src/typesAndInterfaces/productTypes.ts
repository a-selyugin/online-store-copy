export type product = {
  id: string;
  artist: string;
  name: string;
  type: string;
  qty: number;
  price: number;
  imgUrl: string;
  sizes?: sizes;
  yearOfRelease: number;
  inCart?: number;
  popular: boolean;
  color: string;
};

export type filterObj = {
  artist: string[];
  search: RegExp;
  name: string;
  type: string[];
  qtyRange: (number | string)[];
  priceRange: (number | string)[];
  sizes: string;
  yearOfReleaseRange: (number | string)[];
  onlyPopular: boolean;
  colors: string[];
};

export type sizes = {
  XS?: number;
  S?: number;
  M?: number;
  L?: number;
  XL?: number;
  XXL?: number;
};

export interface SortTypesObject {
  [index: string]: () => product[];
}

export interface CartObject {
  [index: string]: number;
}
