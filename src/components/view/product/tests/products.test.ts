import { Products } from '../products';
import { productListMock } from '../../../../mocks/fakeProductList';
import { product } from '../../../../typesAndInterfaces/productTypes';

const products = new Products();

const list1: product[] = [productListMock[0]];

const list2: product[] = [productListMock[1], productListMock[2]];

products.draw(list1);

describe('adds one product element with all nested elements', () => {
  it('creates card container', () => {
    expect(document.querySelector('.prod-card')).not.toBeNull();
  });

  it('creates img element', () => {
    expect(document.querySelector('.prod-card__image_int')).not.toBeNull();
  });

  it('creates price element', () => {
    expect(document.querySelector('.prod-card__price')).not.toBeNull();
  });

  it('creates quantity element', () => {
    expect(document.querySelector('.prod-card__qty')).not.toBeNull();
  });

  it('creates name element', () => {
    expect(document.querySelector('.prod-card__name')).not.toBeNull();
  });

  it('creates type/category element', () => {
    expect(document.querySelector('.prod-card__type')).not.toBeNull();
  });

  it('creates artist element', () => {
    expect(document.querySelector('.prod-card__artist')).not.toBeNull();
  });

  it('creates year of Release element', () => {
    expect(document.querySelector('.prod-card__year')).not.toBeNull();
  });
});

products.draw(list2);

describe('clears all elements and adds two product elements', () => {
  it('removes previously shown product and show two new products', () => {
    const nodeList = document.querySelectorAll('.prod-card');
    expect(nodeList.length).toEqual(2);
  });
});
