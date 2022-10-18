import {
  filterObj,
  product,
  SortTypesObject,
} from '../../typesAndInterfaces/productTypes';
import { Loader } from './loader';

export class AppController extends Loader {
  filteredProductList: product[];
  filterObject: filterObj;

  constructor() {
    super();
    this.filteredProductList = this.productList;
    this.filterObject = {
      type: [],
      artist: [],
      search: /(?:)/,
      name: '',
      sizes: '',
      priceRange: [],
      qtyRange: [],
      yearOfReleaseRange: [],
      onlyPopular: false,
      colors: [],
    };
  }

  public sortProducts(arr: product[], checkLocalSettings?: boolean): product[] {
    let sortType: string;
    const selectForm: HTMLInputElement = document.querySelector(
      '.sort-select'
    ) as HTMLInputElement;

    const localSettings: string | null = localStorage.getItem('sortBy');

    const sortObj: SortTypesObject = {
      'price-low-high': () => arr.sort((a, b) => a.price - b.price),
      'price-high-low': () => arr.sort((a, b) => b.price - a.price),
      'year-new-old': () =>
        arr.sort((a, b) => b.yearOfRelease - a.yearOfRelease),
      'year-old-new': () =>
        arr.sort((a, b) => a.yearOfRelease - b.yearOfRelease),
      'name-a-z': () => arr.sort((a, b) => a.name.localeCompare(b.name)),
      'name-z-a': () => arr.sort((a, b) => b.name.localeCompare(a.name)),
    };

    const selectorValues: string[] = Object.keys(sortObj);

    if (checkLocalSettings && localSettings) {
      if (selectorValues.includes(localSettings)) {
        sortType = localSettings;
        selectForm.value = sortType;
      } else {
        localStorage.removeItem('sortBy');
        sortType = selectForm.value;
      }
    } else {
      sortType = selectForm.value;
    }

    localStorage.setItem('sortBy', sortType);

    return sortObj[sortType]();
  }

  public readFiltersFromLocal(): void {
    if (localStorage.getItem('filterObject')) {
      const localFilterObject: filterObj = JSON.parse(
        localStorage.getItem('filterObject') as string
      );

      this.filterObject.artist = localFilterObject.artist;
      this.filterObject.search = localFilterObject.search;
      this.filterObject.type = localFilterObject.type;
      this.filterObject.name = localFilterObject.name;
      this.filterObject.sizes = localFilterObject.sizes;
      this.filterObject.priceRange = localFilterObject.priceRange;
      this.filterObject.qtyRange = localFilterObject.qtyRange;
      this.filterObject.yearOfReleaseRange =
        localFilterObject.yearOfReleaseRange;
      this.filterObject.onlyPopular = localFilterObject.onlyPopular;
      this.filterObject.colors = localFilterObject.colors;
    }
  }

  public writeFiltersToLocal(): void {
    localStorage.setItem('filterObject', JSON.stringify(this.filterObject));
  }

  public resetFilterObject(): void {
    let key: keyof filterObj;

    for (key in this.filterObject) {
      if (
        key === 'artist' ||
        key === 'type' ||
        key === 'priceRange' ||
        key === 'qtyRange' ||
        key === 'yearOfReleaseRange' ||
        key === 'colors'
      ) {
        this.filterObject[key].length = 0;
      }
      if (key === 'name' || key === 'sizes') {
        this.filterObject[key] = '';
      }
      if (key === 'search') {
        this.filterObject[key] = /(?:)/;
      }
      if (key === 'onlyPopular') {
        this.filterObject[key] = false;
      }
    }

    this.writeFiltersToLocal();
  }

  public changeFilters(e: Event): void {
    const target: HTMLInputElement = e.target as HTMLInputElement;

    if (target.classList.contains('categories__button')) {
      const type: string[] = this.filterObject.type;
      const category: string = target.innerHTML;

      if (type.includes(category)) {
        type.splice(type.indexOf(category), 1);
      } else {
        type.push(category);
      }
    }

    if (target.classList.contains('artists__button')) {
      const artist: string[] = this.filterObject.artist;
      const artistName: string = target.innerHTML;

      if (artist.includes(artistName)) {
        artist.splice(artist.indexOf(artistName), 1);
      } else {
        artist.push(artistName);
      }
    }

    if (target.classList.contains('color__button')) {
      const colors: string[] = this.filterObject.colors;
      const colorName: string = target.innerHTML;

      if (colors.includes(colorName)) {
        colors.splice(colors.indexOf(colorName), 1);
      } else {
        colors.push(colorName);
      }
    }

    if (target.classList.contains('search-input')) {
      const searchQuery: string = target.value;
      this.filterObject.search = new RegExp(searchQuery, 'i');
    }

    if (target.classList.contains('popular__button')) {
      this.filterObject.onlyPopular = !this.filterObject.onlyPopular;
    }

    this.writeFiltersToLocal();
  }

  public filterProducts(arr: product[]): void {
    if (this.filterObject.type.length > 0) {
      arr = arr.filter((item: product) => {
        for (let i = 0; i < this.filterObject.type.length; i += 1) {
          if (item.type === this.filterObject.type[i]) {
            return true;
          }
        }
      });
    }

    if (this.filterObject.artist.length > 0) {
      arr = arr.filter((item: product) => {
        for (let i = 0; i < this.filterObject.artist.length; i += 1) {
          if (item.artist === this.filterObject.artist[i]) {
            return true;
          }
        }
      });
    }

    if (this.filterObject.colors.length > 0) {
      arr = arr.filter((item: product) => {
        for (let i = 0; i < this.filterObject.colors.length; i += 1) {
          if (item.color === this.filterObject.colors[i]) {
            return true;
          }
        }
      });
    }

    if (this.filterObject.search) {
      const search: RegExp = this.filterObject.search;
      arr = arr.filter((item: product) => {
        if (item.name.match(search)) {
          return true;
        }
        if (item.type.match(search)) {
          return true;
        }
        if (item.artist.match(search)) {
          return true;
        }
      });
    }

    if (this.filterObject.priceRange.length > 0) {
      const priceRange: (number | string)[] = this.filterObject.priceRange;
      arr = arr.filter((item: product) => {
        if (item.price >= +priceRange[0] && item.price <= +priceRange[1]) {
          return true;
        }
      });
    }

    if (this.filterObject.yearOfReleaseRange.length > 0) {
      const yearsRange: (number | string)[] =
        this.filterObject.yearOfReleaseRange;
      arr = arr.filter((item: product) => {
        if (
          item.yearOfRelease >= +yearsRange[0] &&
          item.yearOfRelease <= +yearsRange[1]
        ) {
          return true;
        }
      });
    }

    if (this.filterObject.qtyRange.length > 0) {
      const qtyRange: (number | string)[] = this.filterObject.qtyRange;
      arr = arr.filter((item: product) => {
        if (item.qty >= +qtyRange[0] && item.qty <= +qtyRange[1]) {
          return true;
        }
      });
    }

    if (this.filterObject.onlyPopular) {
      arr = arr.filter((item: product) => {
        if (item.popular) {
          return true;
        }
      });
    }
    this.filteredProductList = arr;
  }
}
