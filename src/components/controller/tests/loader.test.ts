import { productListMock } from '../../../mocks/fakeProductList';
import { product } from '../../../typesAndInterfaces/productTypes';
import { Loader } from '../loader';

const realLoader: Loader = new Loader();

beforeEach(() => {
  realLoader.productList = productListMock;
});

describe('when called should return an array of 2 numbers: min and max entry', () => {
  it('should return an array of min and max price', () => {
    const result = realLoader.findPriceRange();
    expect(result).toEqual([1, 99]);
  });

  it('should return an array of min and max year of release', () => {
    const result = realLoader.findYearsRange();
    expect(result).toEqual([2000, 2099]);
  });

  it('should return an array of min and max price quantity', () => {
    const result = realLoader.findQtyRange();
    expect(result).toEqual([1, 99]);
  });
});

const nonNumericKeys: (keyof product)[] = [
  'id',
  'artist',
  'type',
  'name',
  'imgUrl',
  'popular',
  'color',
];

describe('when called with key with non-numeric type should throw an error', () => {
  nonNumericKeys.forEach((stringKey) => {
    test('throws an Error', () => {
      expect(() => {
        realLoader.findRange(stringKey);
      }).toThrow();
    });
  });
});
