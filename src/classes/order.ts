import { OrderStatus } from './interfaces/order-status';
import { CustomerOrder } from './interfaces/customer-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { MsgProtocol } from './interfaces/msg-protocol';
import { SaveOrderProtocol } from './interfaces/save-order-protocol';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly msg: MsgProtocol,
    private readonly save: SaveOrderProtocol,
    public readonly customer: CustomerOrder,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Your cart is empty!');
      return;
    }
    this._orderStatus = 'closed';
    this.msg.sendMessage(
      `Total order: ${this.cart.totalWithDiscount()}... Thank you for your order!`,
    );
    this.save.saveOrder();
    this.cart.clear();
    console.log(
      'Customer -> ',
      this.customer.getName(),
      this.customer.getIDN(),
    );
  }
}
