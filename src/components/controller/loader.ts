import { product } from '../../typesAndInterfaces/productTypes';
import jsonGoods from '../../goodsDatabase/goods.json';

export class Loader {
  productList: product[];

  constructor() {
    this.productList = jsonGoods;
  }

  public findRange(key: keyof product): [number, number] {
    if (key === 'price' || key === 'yearOfRelease' || key === 'qty') {
      let min: number = this.productList[0][key];
      let max: number = min;
      this.productList.forEach((item) => {
        if (!min || min > item[key]) {
          min = item[key];
        }
        if (!max || max < item[key]) {
          max = item[key];
        }
      });
      return [min, max];
    } else throw new Error('Impossible to find numeric range');
  }

  public findPriceRange(): [number, number] {
    return this.findRange('price');
  }

  public findYearsRange(): [number, number] {
    return this.findRange('yearOfRelease');
  }

  public findQtyRange(): [number, number] {
    return this.findRange('qty');
  }
}
