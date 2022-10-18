import { filterObj, product } from '../../typesAndInterfaces/productTypes';
import { Products } from './product/products';
import { Slider } from './slider/slider';
import { Filter } from './filters/filter';

export class AppView {
  readonly products: Products;
  readonly artists: Filter;
  readonly categories: Filter;
  readonly color: Filter;
  readonly priceSlider: Slider;
  readonly yearsSlider: Slider;
  readonly qtySlider: Slider;
  readonly popular: Filter;

  constructor(
    slidersContainerID: string,
    slidersNames: string[],
    slidersRanges: [number, number][]
  ) {
    this.products = new Products();

    this.categories = new Filter('categories', 'categories__button', 'type');

    this.artists = new Filter('artists', 'artists__button', 'artist');

    this.color = new Filter('color', 'color__button', 'color');

    this.priceSlider = new Slider(
      slidersContainerID,
      slidersNames[0],
      slidersRanges[0]
    );

    this.yearsSlider = new Slider(
      slidersContainerID,
      slidersNames[1],
      slidersRanges[1]
    );

    this.qtySlider = new Slider(
      slidersContainerID,
      slidersNames[2],
      slidersRanges[2]
    );

    this.popular = new Filter('popular', 'popular__button', 'popular');
  }

  public initPage(
    listOfProducts: product[],
    filterObject: filterObj,
    filteredListOfProducts: product[],
    foundProducts: number
  ): void {
    this.drawFilters(listOfProducts);
    this.markActiveFilters(filterObject);
    this.drawProducts(filteredListOfProducts);
    this.drawCart();
    this.displayProductQty(foundProducts);
    this.drawHardResetButton();
  }

  public drawProducts(arr: product[]): void {
    this.products.draw(arr);
  }

  public drawCart(): void {
    const header: Element = document.getElementById('header') as Element;
    this.products.cart.drawCart(header);
  }

  public resetSlidersAndFilters(): void {
    this.priceSlider.reset();
    this.yearsSlider.reset();
    this.qtySlider.reset();
    this.artists.reset();
    this.categories.reset();
    this.popular.reset();
    this.color.reset();
  }

  public drawFilters(arr: product[]): void {
    this.artists.draw(arr);
    this.categories.draw(arr);
    this.color.draw(arr);
    this.priceSlider.draw();
    this.yearsSlider.draw();
    this.qtySlider.draw();
    this.popular.draw(arr);
  }

  public markActiveFilters(filterObject: filterObj): void {
    // не лучшее решение, с чекбоксами все было бы проще и быстрее, но для небольшого количества фильтров пусть будет так
    this.artists.reset();
    this.categories.reset();
    this.popular.reset();
    this.color.reset();

    if (filterObject.artist.length > 0) {
      const artistButtons: NodeListOf<Element> =
        document.querySelectorAll('.artists__button');
      for (let i = 0; i < filterObject.artist.length; i += 1) {
        artistButtons.forEach((item) => {
          if (item.innerHTML === filterObject.artist[i]) {
            item.classList.add('button_active');
          }
        });
      }
    }

    if (filterObject.type.length > 0) {
      const categoryButtons: NodeListOf<Element> = document.querySelectorAll(
        '.categories__button'
      );
      for (let i = 0; i < filterObject.type.length; i += 1) {
        categoryButtons.forEach((item) => {
          if (item.innerHTML === filterObject.type[i]) {
            item.classList.add('button_active');
          }
        });
      }
    }

    if (filterObject.colors.length > 0) {
      const colorButtons: NodeListOf<Element> =
        document.querySelectorAll('.color__button');
      for (let i = 0; i < filterObject.colors.length; i += 1) {
        colorButtons.forEach((item) => {
          if (item.innerHTML === filterObject.colors[i]) {
            item.classList.add('button_active');
          }
        });
      }
    }

    if (filterObject.onlyPopular) {
      const popularButton: HTMLInputElement = document.querySelector(
        '.popular__button'
      ) as HTMLInputElement;
      popularButton.classList.add('button_active');
    }

    if (filterObject.priceRange.length > 0) {
      this.priceSlider.slider.noUiSlider?.setHandle(
        0,
        filterObject.priceRange[0]
      );
      this.priceSlider.slider.noUiSlider?.setHandle(
        1,
        filterObject.priceRange[1]
      );
    }
    if (filterObject.qtyRange.length > 0) {
      this.qtySlider.slider.noUiSlider?.setHandle(0, filterObject.qtyRange[0]);
      this.qtySlider.slider.noUiSlider?.setHandle(1, filterObject.qtyRange[1]);
    }
    if (filterObject.yearOfReleaseRange.length > 0) {
      this.yearsSlider.slider.noUiSlider?.setHandle(
        0,
        filterObject.yearOfReleaseRange[0]
      );
      this.yearsSlider.slider.noUiSlider?.setHandle(
        1,
        filterObject.yearOfReleaseRange[1]
      );
    }
  }

  public displayProductQty(n: number): void {
    const foundItems: Element | null = document.getElementById('found-items');
    if (foundItems) foundItems.innerHTML = `Found ${n} items`;
  }

  // Так как эта кнопка достаточно искусственная, сделал не очень красиво и в лоб
  public drawHardResetButton(): void {
    const parent: Element = document.querySelector('.filters') as Element;

    const hardResetButton: Element = document.createElement('button');
    hardResetButton.innerHTML = 'FULL RESET';
    hardResetButton.classList.add('reset-button', 'full-reset');

    hardResetButton.addEventListener('click', () => {
      localStorage.clear();
      document.location.reload();
    });

    parent.append(hardResetButton);
  }
}
