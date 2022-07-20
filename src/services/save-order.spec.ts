import { SaveOrder } from './save-order';

describe('SaveOrder persistency', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return undefined', () => {
    // SUT = System Under Test
    const sut = new SaveOrder();
    expect(sut.saveOrder()).toBeUndefined();
  });

  it('should call console.log once', () => {
    const sut = new SaveOrder();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveOrder();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
  it('should call console.log once with "Order has been saved!"', () => {
    const sut = new SaveOrder();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveOrder();
    expect(consoleSpy).toHaveBeenCalledWith('Order has been saved!');
  });
});
