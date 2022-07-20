/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CartItem } from './interfaces/cart-item';
import { CustomerOrder } from './interfaces/customer-protocol';
import { MsgProtocol } from './interfaces/msg-protocol';
import { SaveOrderProtocol } from './interfaces/save-order-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { Order } from './order';

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem>[] {
    return [];
  }

  addItem(item: CartItem): void {}

  removeItem(index: number): void {}

  total(): number {
    return 1;
  }

  totalWithDiscount(): number {
    return 2;
  }

  isEmpty(): boolean {
    return false;
  }

  clear(): void {}
}

class MsgMock implements MsgProtocol {
  sendMessage(): void {}
}

class SaveOrderMock implements SaveOrderProtocol {
  saveOrder() {}
}

class CustomersMock implements CustomerOrder {
  getName(): string {
    return '';
  }

  getIDN(): string {
    return '';
  }
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const msgMock = new MsgMock();
  const saveOrderMock = new SaveOrderMock();
  const customersMock = new CustomersMock();
  const sut = new Order(
    shoppingCartMock,
    msgMock,
    saveOrderMock,
    customersMock,
  );
  return {
    sut,
    shoppingCartMock,
    msgMock,
    saveOrderMock,
  };
};

describe('Order', () => {
  it('should not checkout if there are no items', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValue(true);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should checkout if there are items', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValue(false);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send an msg to customer', () => {
    const { sut, msgMock } = createSut();
    const msgMockSpy = jest.spyOn(msgMock, 'sendMessage');
    sut.checkout();
    expect(msgMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, saveOrderMock } = createSut();
    const saveOrderMockSpy = jest.spyOn(saveOrderMock, 'saveOrder');
    sut.checkout();
    expect(saveOrderMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear cart', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });
});
