import { Discount } from './discount';
import { CartItem } from './interfaces/cart-item';
import { ShoppingCart } from './shopping-cart';

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
};

const createDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock();
};

const createCartItem = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }
  return new CartItemMock(name, price);
};

const createSutWithProducts = () => {
  const { sut, discountMock } = createSut();
  const item1 = createCartItem('item 1', 10);
  const item2 = createCartItem('item 2', 20);
  sut.addItem(item1);
  sut.addItem(item2);
  return { sut, discountMock };
};

describe('Shopping cart', () => {
  it('should be empty if no products is added', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it('should cart have 2 items', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
  });

  it('should test total and total with discount', () => {
    const { sut } = createSutWithProducts();
    expect(sut.total()).toBe(30);
    expect(sut.totalWithDiscount()).toBe(30);
  });

  it('should add products and clear', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.clear();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should remove products', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.removeItem(1);
    expect(sut.items.length).toBe(1);
    sut.removeItem(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should call discount.calculate() once totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const spy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call discount.calculate with total price when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const spy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(spy).toHaveBeenCalledWith(sut.total());
  });
});
