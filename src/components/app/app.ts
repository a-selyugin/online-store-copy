import { filterObj, product } from '../../typesAndInterfaces/productTypes';
import { AppController } from '../controller/controller';
import { AppView } from '../view/appView';

export class App {
  view: AppView;
  controller: AppController;
  priceRange: [number, number];
  yearsRange: [number, number];
  qtyRange: [number, number];

  constructor() {
    this.controller = new AppController();
    this.priceRange = this.controller.findPriceRange();
    this.yearsRange = this.controller.findYearsRange();
    this.qtyRange = this.controller.findQtyRange();

    this.view = new AppView(
      'sliders',
      ['Price', 'Year of Release', 'Left on stock'],
      [this.priceRange, this.yearsRange, this.qtyRange]
    );
  }

  private refreshProducts(): void {
    this.view.markActiveFilters(this.controller.filterObject);
    this.controller.filterProducts(this.controller.productList);
    this.view.drawProducts(
      this.controller.sortProducts(this.controller.filteredProductList)
    );
    this.view.displayProductQty(this.controller.filteredProductList.length);
  }

  public start(): void {
    this.controller.readFiltersFromLocal();
    this.controller.filterProducts(this.controller.productList);

    const productList: product[] = this.controller.productList;
    const filterObject: filterObj = this.controller.filterObject;
    const filteredProductList: product[] = this.controller.filteredProductList;

    this.view.initPage(
      productList,
      filterObject,
      this.controller.sortProducts(this.controller.filteredProductList, true),
      filteredProductList.length
    );

    (
      document.querySelector('.sort-select') as HTMLInputElement
    ).addEventListener('change', () => this.refreshProducts());

    const filterIDs: string[] = [
      '#artists',
      '#categories',
      '#color',
      '#popular',
    ];

    filterIDs.forEach((id) => {
      (document.querySelector(id) as HTMLInputElement).addEventListener(
        'click',
        (e) => {
          this.controller.changeFilters(e);
          this.refreshProducts();
        }
      );
    });

    (
      document.querySelector('#search-input') as HTMLInputElement
    ).addEventListener('input', (e) => {
      this.controller.changeFilters(e);
      this.refreshProducts();
    });

    this.view.priceSlider.slider.noUiSlider?.on('set', (values) => {
      this.controller.filterObject.priceRange = values;
      this.controller.writeFiltersToLocal();
      this.refreshProducts();
    });

    this.view.yearsSlider.slider.noUiSlider?.on('set', (values) => {
      this.controller.filterObject.yearOfReleaseRange = values;
      this.controller.writeFiltersToLocal();
      this.refreshProducts();
    });

    this.view.qtySlider.slider.noUiSlider?.on('set', (values) => {
      this.controller.filterObject.qtyRange = values;
      this.controller.writeFiltersToLocal();
      this.refreshProducts();
    });

    const resetButton: Element | null = document.querySelector('#reset-button');
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        this.controller.resetFilterObject();
        this.view.resetSlidersAndFilters();
      });
    }
  }
}
