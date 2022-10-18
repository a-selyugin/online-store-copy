import { CartButton } from '../cartButton';
import { productListMock } from '../../../../mocks/fakeProductList';

describe('creates Element', () => {
  const cartButton = new CartButton();
  const returnedElement = cartButton.drawButton(productListMock[0]);
  it('creates add to cart button inside returned element', () => {
    expect(
      returnedElement.querySelector('.prod-card__button_add')
    ).not.toBeNull();
  });

  it('creates remove from cart button inside returned element', () => {
    expect(
      returnedElement.querySelector('.prod-card__button_remove')
    ).not.toBeNull();
  });

  it('creates in cart indicator inside returned element', () => {
    expect(
      returnedElement.querySelector('.prod-card__button-indicator')
    ).not.toBeNull();
  });
});
