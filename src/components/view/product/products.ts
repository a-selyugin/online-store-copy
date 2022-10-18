import { CartObject, product } from '../../../typesAndInterfaces/productTypes';
import { Cart } from './cart';
import { CartButton } from './cartButton';
import './products.scss';

export class Products {
  cart: Cart;

  constructor() {
    this.cart = new Cart();
  }

  public draw(arrOfProducts: product[]): void {
    const parentNode: Element = document.querySelector('#products') as Element;
    const productTemplate: HTMLTemplateElement = document.querySelector(
      '#product-template'
    ) as HTMLTemplateElement;
    const fragment: DocumentFragment = document.createDocumentFragment();

    arrOfProducts.forEach((item: product) => {
      const newProduct: HTMLTemplateElement = productTemplate.content.cloneNode(
        true
      ) as HTMLTemplateElement;

      let key: keyof CartObject;

      for (key in this.cart.cartObj) {
        if (key === item.id) {
          item.inCart = this.cart.cartObj[key];
        }
      }
      const prodCard: Element = newProduct.querySelector(
        '.prod-card'
      ) as Element;

      (
        newProduct.querySelector('.prod-card__image_int') as HTMLImageElement
      ).src = item.imgUrl;
      (
        newProduct.querySelector('.prod-card__price') as HTMLDivElement
      ).textContent = `${item.price}$`;
      (
        newProduct.querySelector('.prod-card__qty') as HTMLDivElement
      ).textContent = `qty: ${item.qty} pcs`;
      (
        newProduct.querySelector('.prod-card__name') as HTMLDivElement
      ).textContent = `${item.name}`;
      (
        newProduct.querySelector('.prod-card__type') as HTMLDivElement
      ).textContent = `${item.type}`;
      (
        newProduct.querySelector('.prod-card__artist') as HTMLDivElement
      ).textContent = `Artist: ${item.artist}`;

      if (item.sizes) {
        let sizesStr = '';
        for (const size in item.sizes) {
          sizesStr += size + ', ';
        }
        sizesStr = sizesStr.substring(0, sizesStr.length - 2);
        (
          newProduct.querySelector('.prod-card__sizes') as HTMLDivElement
        ).textContent = `Sizes: ${sizesStr}`;
      }

      (
        newProduct.querySelector('.prod-card__year') as HTMLDivElement
      ).textContent = `Released: ${item.yearOfRelease}`;

      const cartButton: CartButton = new CartButton();
      cartButton.connectCart(this.cart, item);
      prodCard.appendChild(cartButton.drawButton(item));

      fragment.append(newProduct);
    });

    parentNode.innerHTML = '';
    parentNode.appendChild(fragment);
  }
}
