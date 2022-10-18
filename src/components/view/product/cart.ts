import { CartObject, product } from '../../../typesAndInterfaces/productTypes';

export class Cart {
  cartCounter: Element;
  cartObj: CartObject;

  constructor() {
    this.cartCounter = document.createElement('div');
    this.cartCounter.classList.add('cart-counter');
    this.cartObj = this.checkSavedCart();
    this.cartCounter.innerHTML = String(this.checkCart());
  }

  private checkSavedCart(): CartObject {
    const savedCart: string | null = localStorage.getItem('cart');
    if (savedCart && savedCart.length > 0) {
      return JSON.parse(savedCart);
    } else {
      return {};
    }
  }

  public drawCart(parent: Element): void {
    const container: Element = document.createElement('div');
    container.classList.add('cart');

    const cartImg: HTMLImageElement = document.createElement('img');
    cartImg.src = './assets/img/basket.svg';
    cartImg.alt = 'Cart';

    container.append(cartImg);
    container.append(this.cartCounter);

    parent.append(container);
  }

  public checkCart(): number {
    if (Object.values(this.cartObj).length > 0) {
      return Object.values(this.cartObj).reduce(
        (prev: number, curr: number) => prev + curr
      );
    } else return 0;
  }

  public addToCart(item: product): void {
    const key: keyof CartObject = item.id;
    if (this.checkCart() < 20) {
      if (this.cartObj[key]) {
        this.cartObj[key] += 1;
      } else {
        this.cartObj[key] = 1;
      }
    } else {
      this.showFullCartMessage();
    }
    this.cartCounter.innerHTML = this.checkCart().toString();
    localStorage.setItem('cart', JSON.stringify(this.cartObj));
  }

  public removeFromCart(item: product): void {
    const key: keyof CartObject = item.id;
    if (this.cartObj[key] > 1) {
      this.cartObj[key] -= 1;
    } else {
      delete this.cartObj[key];
    }
    this.cartCounter.innerHTML = this.checkCart().toString();
    localStorage.setItem('cart', JSON.stringify(this.cartObj));
  }

  public showFullCartMessage(): void {
    const overlay: Element = document.createElement('div');
    overlay.classList.add('overlay');

    const modalWindow: Element = document.createElement('div');
    modalWindow.classList.add('modal-window');

    const windowText: Element = document.createElement('p');
    windowText.classList.add('overlay__text');
    windowText.innerHTML = 'Извините, все слоты заполнены';

    const closeButton: HTMLButtonElement = document.createElement('button');
    closeButton.classList.add('overlay__close-button');
    closeButton.innerHTML = 'close';

    modalWindow.append(windowText);
    modalWindow.append(closeButton);
    overlay.append(modalWindow);

    document.querySelector('body')?.append(overlay);
    closeButton.addEventListener('click', () => {
      overlay.remove();
    });
  }
}
