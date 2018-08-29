import { of} from 'rxjs';
import {UserInfo} from '@shared/models/userInfo.model';
import {FilterModel} from '@shared/models/filter.model';
import {Product} from '@shared/models/product.model';

export const product = {
  modelName: 'example',
  brande: 'example',
  price: 5,
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

export const shoppingList = [{price: 1}, {price: 2}, {price: 3}, {price: 4}];


export class MockProductService {
  productsSubject = of([product]);
  orderSubject = of({'number': {data: product, list: user}});
  priceLimit = of({minPrice: 10, maxPrice: 50});
  purchaseSubject = of( product);
  changedSubject = of( {total: ((+product.price) * (1 - (+product.discount / 100))) * 2 , amount: 3});
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
    return [product, product];
  }

  deleteProduct(index: number) {
  }

  updateProduct(goodsList) {
  }

  getFilterCondition(data: FilterModel) {
  }
  priceLimitCalulate(products: Product[]) {

  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('order'));
  }

  setLocalStorage(order) {
    const purchaseArr = JSON.stringify([product, product]);
    localStorage.setItem('order', purchaseArr);
  }

  checkSubscription(subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
  addToBasket(elem) {}
  purchaseStatus(products) {}

  getGoods() {
    return this.productsSubject;
  }
}