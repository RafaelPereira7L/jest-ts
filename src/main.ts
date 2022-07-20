/*
  Módulos de alto nível não devemm depender de módulos de baixo nível. Ambos devem depender de abstrações.
  Dependa de abstrações, não de implementações.
  Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.

  Classes de baixo nível são classes que executam tarefas (detalhes).
  Classes de alto nível são classes que gerenciam as classes de baixo nível.
*/

import { Msg } from './services/msg';
import { Order } from './classes/order';
import { Product } from './classes/product';
import { SaveOrder } from './services/save-order';
import { ShoppingCart } from './classes/shopping-cart';
import { FiftyPercentDiscount } from './classes/discount';
import {
  // EnterpriseCustomer,
  IndividualCustomer,
} from './classes/customer';

const fiftyPercentDiscount = new FiftyPercentDiscount();
// const noDiscount = new NoDiscount();
const cart = new ShoppingCart(fiftyPercentDiscount);
const msg = new Msg();
const save = new SaveOrder();
const individualCustomer = new IndividualCustomer(
  'Rafael',
  'Pereira',
  '133.713.371-33',
);

// const enterpriseCustomer = new EnterpriseCustomer('AAAAAA', '133.713.371-33');

const order = new Order(cart, msg, save, individualCustomer);

cart.addItem(new Product('Smarphone', 1000));
cart.addItem(new Product('Hat', 50));
cart.addItem(new Product('T-shirt', 40));
cart.addItem(new Product('Belt', 2000));

console.log(cart.items);
console.log(cart.total());
console.log(cart.totalWithDiscount());
console.log('Order status -> ', order.orderStatus);
order.checkout();
console.log('Order status -> ', order.orderStatus);
