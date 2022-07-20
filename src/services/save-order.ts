import { SaveOrderProtocol } from '../classes/interfaces/save-order-protocol';

export class SaveOrder implements SaveOrderProtocol {
  saveOrder(): void {
    console.log('Order has been saved!');
  }
}
