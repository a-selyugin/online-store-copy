import { productListMock } from '../../../mocks/fakeProductList';
import { product } from '../../../typesAndInterfaces/productTypes';
import { Filter } from './filter';

describe('should create filter with filterID and create something inside if arguments are valid', () => {
  it('creates at least one button', () => {
    const filter = new Filter('categories', 'categories__button', 'type');
    filter.draw(productListMock);
    expect(document.body.querySelector('.categories__button')).not.toBeNull();
  });

  it('creates nothing if product [key] is not valid', () => {
    const filter = new Filter(
      'categories',
      'categories__butt',
      'fakeType' as keyof product
    );
    filter.draw(productListMock);
    expect(document.body.querySelector('.categories__butt')).toBeNull();
  });
});

describe('should throw an Error if filterID is not valid', () => {
  test('throws an Error if filterID is not valid', () => {
    expect(() => {
      const filter = new Filter('fake_category', 'categories__btn', 'type');
      filter.draw(productListMock);
    }).toThrow();
  });
});
