import {Observable, of, Subject, Subscribable} from 'rxjs';
import {UserInfo} from '@shared/models/userInfo.model';
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
  index: 3
};

export const user = {
  email: 'admin@admin.com',
  name: 'Alex',
  tel: 123456
};
// export const index = +2;

export const shoppingList = [{price: 1}, {price: 2}, {price: 3}, {price: 4}];


export class MockGoodsService {
  goodsSubject = of([goods]);
  orderSubject = of({'number': {data: goods, list: user}});
  priceLimit = of({minPrice: 10, maxPrice: 50});
  chosenProduct = 0;
  filterData = of({
    min: 0,
    max: 1600000,
    color: 'all',
    feature: 'all'
  });

  sendOrder(order: UserInfo) {
    return true;
  }

  getOrder() {
    return this.orderSubject ;
  }

  getCurrentGoods() {
    return [goods, goods];
  }

  deleteProduct(index: number) {
  }

  addGoods(goodsList) {
  }

  getFilterCondition(data: FilterModel) {
    // this.filterData.next(data);
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('order'));
  }

  setLocalStorage(shoppingList) {
    const purchaseArr = JSON.stringify(shoppingList);
    localStorage.setItem('order', purchaseArr);
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