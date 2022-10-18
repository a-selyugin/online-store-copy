import { product } from '../../../typesAndInterfaces/productTypes';
import './filters.scss';

export class Filter {
  filterId: string;
  buttonClass: string;
  key: keyof product;

  constructor(filterId: string, buttonClass: string, key: keyof product) {
    this.filterId = filterId;
    this.buttonClass = buttonClass;
    this.key = key as keyof product;
  }

  public draw(arrOfProducts: product[]): void {
    const parentNode: Element = document.getElementById(
      this.filterId
    ) as Element;

    if (parentNode) {
      const stringFilters = ['artist', 'type', 'color'];

      if (stringFilters.includes(this.key)) {
        let arr: string[] = [];

        arrOfProducts.forEach((item: product) => {
          if (arr.indexOf(item[this.key] as string) < 0) {
            arr.push(item[this.key] as string);
          }
        });

        arr = arr.sort();

        arr.forEach((item: string) => {
          const newButton: HTMLButtonElement = document.createElement('button');

          newButton.classList.add(this.buttonClass);
          if (this.key === 'color') {
            newButton.classList.add(item.toLowerCase());
          }
          newButton.innerHTML = item;
          parentNode.appendChild(newButton);
        });
      }

      if (this.key === 'popular') {
        const newButton: HTMLButtonElement = document.createElement('button');
        newButton.classList.add(this.buttonClass);
        newButton.innerHTML = 'Show popular';
        parentNode.appendChild(newButton);
      }
    } else {
      throw new Error('Invalid filterID');
    }
  }

  public reset(): void {
    const filterButtons: NodeListOf<Element> = document.querySelectorAll(
      `.${this.buttonClass}`
    );
    if (filterButtons) {
      filterButtons.forEach((item) => {
        item.classList.remove('button_active');
      });
    }
  }
}
