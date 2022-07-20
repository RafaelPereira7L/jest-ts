import { Product } from './product';

const createSut = (name: string, price: number): Product => {
  return new Product(name, price);
};

describe('Product', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have properties name and price', () => {
    const sut = createSut('MF DOOM T-shirt', 27);
    expect(sut).toHaveProperty('name', 'MF DOOM T-shirt');
    expect(sut.price).toBe(27);
  });
});
