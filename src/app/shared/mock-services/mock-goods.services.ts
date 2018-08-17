import {Goods} from '@shared/models/goods.model';
import {Observable, of, Subject, Subscribable} from 'rxjs';
import {Order} from '@shared/models/order.model';
import {FilterModel} from '@shared/models/filter.model';

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
  priceLimit = of({minPrice: 10, maxPrice: 50});
  filterData = of({
    min: 0,
    max: 1600000,
    color: 'all',
    feature: 'all'
  });

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

  getFilterCondition(data: FilterModel) {
    // this.filterData.next(data);
  }

  checkSubscription(subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  getGoods() {
    return this.goodsSubject;
  }
}