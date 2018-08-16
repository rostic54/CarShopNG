import {Goods} from '@shared/models/goods.model';
import {Observable, of, Subject, Subscribable} from 'rxjs';
import {Order} from '@shared/models/order.model';

export const goods = {
  modelName: 'example',
  brande: 'example',
  price: 10,
  discount: 5,
  color: 'color',
  feature: 'feature',
  power: 15,
  url: 'url',
  description: 'example',
  id: 3,
};

export const user = {
  email: 'test@test.com',
  name: 'Alex',
  tel: 123456
};
// export const index = +2;



export class MockGoodsService {
  goodsSubject = of([goods]);
  orderSubject = of({'number': {data: goods, list: user}});

  sendOrder(order: Order) {
    return true;
  }

  getOrder() {
    return this.orderSubject ;
  }

  getCurrentGoods() {
    return [];
  }

  deleteProduct(index: number) {
  }

  addGoods(goodsList) {
  }

  getGoods() {
    return this.goodsSubject;
  }
}