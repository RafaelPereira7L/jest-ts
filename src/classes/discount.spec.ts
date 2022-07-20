import {
  Discount,
  FiftyPercentDiscount,
  FortyPercentDiscount,
  NoDiscount,
} from './discount';

const createSut = (className: new () => Discount): Discount => {
  return new className();
};

describe('Discount', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have no discount', () => {
    const sut = createSut(NoDiscount);
    expect(sut.calculate(10)).toBe(10);
  });

  it('should have fifty percent discount(50%) on price', () => {
    const sut = createSut(FiftyPercentDiscount);
    expect(sut.calculate(10)).toBe(5);
  });

  it('should have forty percent discount(40%) on price', () => {
    const sut = createSut(FortyPercentDiscount);
    expect(sut.calculate(10)).toBe(6);
  });
});
