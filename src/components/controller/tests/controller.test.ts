import { AppController } from '../controller';
import { product } from '../../../typesAndInterfaces/productTypes';
import { productListMock } from '../../../mocks/fakeProductList';

const realAppController = new AppController();

beforeEach(() => {
  realAppController.productList = productListMock;
});

describe('when called should nullify filter', () => {
  it('should nullify filterObject', () => {
    realAppController.resetFilterObject();

    expect(realAppController.filterObject.artist).toEqual([]);
    expect(realAppController.filterObject.colors).toEqual([]);
    expect(realAppController.filterObject.priceRange).toEqual([]);
    expect(realAppController.filterObject.qtyRange).toEqual([]);
    expect(realAppController.filterObject.yearOfReleaseRange).toEqual([]);
    expect(realAppController.filterObject.type).toEqual([]);

    expect(realAppController.filterObject.name).toEqual('');
    expect(realAppController.filterObject.sizes).toEqual('');

    expect(realAppController.filterObject.search).toEqual(/(?:)/);

    expect(realAppController.filterObject.onlyPopular).toEqual(false);
  });
});

describe('if local sortBy value is not valid should return default sort: price-low-high', () => {
  it('should return array of products sorted by price', () => {
    localStorage.setItem('sortBy', 'this is invalid value');

    const sortedByInvalidKey: product[] = JSON.parse(
      JSON.stringify(
        realAppController.sortProducts(realAppController.productList, true)
      )
    );

    const savedSortingType = localStorage.getItem('sortBy');

    // для уверенности перезапишем SortBy
    localStorage.setItem('sortBy', 'price-low-high');

    const sortedByPrice: product[] = realAppController.sortProducts(
      realAppController.productList,
      true
    );

    expect(savedSortingType).toEqual('price-low-high');
    expect(sortedByInvalidKey).toEqual(sortedByPrice);
  });
});

describe('checking filtering function for each filterObject key', () => {
  it('should modify filtered list to array with single element with Fake Artist', () => {
    realAppController.resetFilterObject();
    realAppController.filterObject.artist = ['Fake Artist'];
    realAppController.filterProducts(productListMock);
    expect(realAppController.filteredProductList.length).toEqual(1);
    expect(realAppController.filteredProductList[0].artist).toEqual(
      'Fake Artist'
    );
  });

  it('should modify filtered list to array with two element with type = CD', () => {
    realAppController.resetFilterObject();
    realAppController.filterObject.type = ['CD'];
    realAppController.filterProducts(productListMock);
    expect(realAppController.filteredProductList.length).toEqual(2);
    expect(realAppController.filteredProductList[0].type).toEqual('CD');
    expect(realAppController.filteredProductList[1].type).toEqual('CD');
  });

  it('should modify filtered list to array with one element with White color', () => {
    realAppController.resetFilterObject();
    realAppController.filterObject.colors = ['White'];
    realAppController.filterProducts(productListMock);
    expect(realAppController.filteredProductList.length).toEqual(1);
    expect(realAppController.filteredProductList[0].color).toEqual('White');
  });

  it('should modify filtered list to array with one element with price = 1', () => {
    realAppController.resetFilterObject();
    realAppController.filterObject.priceRange = [1, 2];
    realAppController.filterProducts(productListMock);
    expect(realAppController.filteredProductList.length).toEqual(1);
    expect(realAppController.filteredProductList[0].price).toEqual(1);
  });

  it('should modify filtered list to array with one element with yearOfRelease = 2099', () => {
    realAppController.resetFilterObject();
    realAppController.filterObject.yearOfReleaseRange = [2099, 2099];
    realAppController.filterProducts(productListMock);
    expect(realAppController.filteredProductList.length).toEqual(1);
    expect(realAppController.filteredProductList[0].yearOfRelease).toEqual(
      2099
    );
  });

  it('should modify filtered list to array with one element with qty = 99', () => {
    realAppController.resetFilterObject();
    realAppController.filterObject.qtyRange = [99, 99];
    realAppController.filterProducts(productListMock);
    expect(realAppController.filteredProductList.length).toEqual(1);
    expect(realAppController.filteredProductList[0].qty).toEqual(99);
  });

  it('should modify filtered list to array with only one popular item', () => {
    realAppController.resetFilterObject();
    realAppController.filterObject.onlyPopular = true;
    realAppController.filterProducts(productListMock);
    expect(realAppController.filteredProductList.length).toEqual(1);
    expect(realAppController.filteredProductList[0].popular).toEqual(true);
  });

  it('should be able to search modifying the list to 1 element', () => {
    realAppController.resetFilterObject();
    realAppController.filterObject.search = new RegExp('Fake Artist', 'i');
    realAppController.filterProducts(productListMock);
    expect(realAppController.filteredProductList.length).toEqual(1);
    expect(realAppController.filteredProductList[0].artist).toEqual(
      'Fake Artist'
    );
  });

  it('should be able to collect filters modifying the list to []', () => {
    realAppController.resetFilterObject();
    realAppController.filterObject.type = ['CD'];
    realAppController.filterObject.search = new RegExp('Fake Artist', 'i');
    realAppController.filterObject.colors = ['White'];
    realAppController.filterProducts(productListMock);
    expect(realAppController.filteredProductList.length).toEqual(0);
  });

  it('should be able to collect filters modifying the list to one element', () => {
    realAppController.resetFilterObject();
    realAppController.filterObject.type = ['CD'];
    realAppController.filterObject.search = new RegExp('Fake Artist', 'i');
    realAppController.filterObject.artist = ['Fake Artist'];
    realAppController.filterObject.colors = ['Gray'];
    realAppController.filterObject.yearOfReleaseRange = [2000, 2000];
    realAppController.filterObject.priceRange = [10, 10];
    realAppController.filterObject.qtyRange = [13, 13];
    realAppController.filterProducts(productListMock);
    expect(realAppController.filteredProductList.length).toEqual(1);
    expect(realAppController.filteredProductList[0].artist).toEqual(
      'Fake Artist'
    );
  });
});
