import { product } from '../../../typesAndInterfaces/productTypes';
import { Cart } from './cart';
import './products.scss';

export class CartButton {
  addToCart: HTMLButtonElement;
  removeFromCart: HTMLButtonElement;
  inCartIndicator: HTMLDivElement;

  constructor() {
    this.addToCart = document.createElement('button');
    this.removeFromCart = document.createElement('button');
    this.inCartIndicator = document.createElement('div');
  }

  public drawButton(item: product): Element {
    const buttonWrapper: HTMLDivElement = document.createElement('div');
    buttonWrapper.classList.add('prod-card__button-wrap');

    this.addToCart.classList.add('prod-card__button', 'prod-card__button_add');
    if (!item.inCart) {
      this.addToCart.innerHTML = 'Add to cart';
    } else {
      this.addToCart.innerHTML = '+';
    }

    this.removeFromCart.classList.add(
      'prod-card__button',
      'prod-card__button_remove'
    );
    this.removeFromCart.innerHTML = '-';

    this.inCartIndicator.classList.add('prod-card__button-indicator');

    buttonWrapper.appendChild(this.removeFromCart);
    buttonWrapper.appendChild(this.inCartIndicator);
    buttonWrapper.appendChild(this.addToCart);

    return buttonWrapper;
  }

  public connectCart(cart: Cart, item: product): void {
    const addToCart: HTMLButtonElement = this.addToCart;
    const removeFromCart: HTMLButtonElement = this.removeFromCart;
    const inCartIndicator: Element = this.inCartIndicator;

    addToCart.addEventListener('click', () => {
      if (cart.checkCart() < 20) {
        if (item.inCart) {
          if (item.inCart < item.qty) {
            item.inCart += 1;
            cart.addToCart(item);
          }
        } else {
          cart.addToCart(item);
          item.inCart = 1;
          addToCart.classList.add('in-cart');
          removeFromCart.classList.add('in-cart');
        }
        inCartIndicator.innerHTML = `${item.inCart}`;
        item.inCart
          ? (addToCart.innerHTML = `+`)
          : (addToCart.innerHTML = 'Add to cart');
      } else {
        cart.showFullCartMessage();
      }
    });

    removeFromCart.addEventListener('click', () => {
      if (item.inCart && item.inCart > 1) {
        item.inCart -= 1;
        cart.removeFromCart(item);
        inCartIndicator.innerHTML = `${item.inCart}`;
      } else {
        cart.removeFromCart(item);
        item.inCart = 0;
        addToCart.classList.remove('in-cart');
        addToCart.innerHTML = 'Add to cart';
        removeFromCart.classList.remove('in-cart');
        inCartIndicator.innerHTML = '';
      }
    });

    if (item.inCart) {
      addToCart.classList.add('in-cart');
      removeFromCart.classList.add('in-cart');
      addToCart.innerHTML = '+';
      inCartIndicator.innerHTML = `${item.inCart}`;
    }
  }
}
