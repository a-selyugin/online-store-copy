import { Cart } from '../cart';
import { productListMock } from '../../../../mocks/fakeProductList';

describe('creates cart with indicator', () => {
  const cart = new Cart();
  cart.drawCart(document.body);

  it('creates cart element', () => {
    expect(document.querySelector('.cart')).not.toBeNull();
  });

  it('creates cart indicator', () => {
    expect(document.querySelector('.cart-counter')).not.toBeNull();
  });
});

const cart = new Cart();

cart.drawCart(document.body);

const key0 = productListMock[0].id;
const key1 = productListMock[1].id;

cart.addToCart(productListMock[0]);

cart.addToCart(productListMock[1]);
cart.addToCart(productListMock[1]);

describe('adds elements to cart', () => {
  it('adds one element to cart', () => {
    expect(cart.cartObj[key0]).toEqual(1);
  });

  it('adds same elements to cart', () => {
    expect(cart.cartObj[key1]).toEqual(2);
  });
});

const itemsInCart = cart.checkCart();

describe('shows number of items in cart', () => {
  it('returns the number of items in cart', () => {
    expect(itemsInCart).toEqual(3);
  });
});

const key3 = productListMock[3].id;
const item3 = productListMock[3];
for (let i = 0; i < 3; i += 1) {
  cart.addToCart(item3);
}
for (let i = 0; i < 3; i += 1) {
  cart.removeFromCart(item3);
}

describe('removes elements from cart', () => {
  it('removes item property from cart', () => {
    expect(cart.cartObj[key3]).toBeUndefined;
  });
});

cart.showFullCartMessage();
describe('shows full cart message', () => {
  it('creates overlay', () => {
    expect(document.querySelector('.overlay')).not.toBeNull();
  });

  it('creates modal-window', () => {
    expect(document.querySelector('.modal-window')).not.toBeNull();
  });

  it('shows some text', () => {
    const text = document.querySelector('.overlay__text');
    expect(text).not.toBeNull();
    expect(text?.innerHTML.length).toBeGreaterThan(0);
  });
});
