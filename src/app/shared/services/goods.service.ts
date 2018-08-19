import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {Goods} from '../models/goods.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {ToasterService} from 'angular2-toaster';
import {Order} from '@shared/models/order.model';
import {FilterModel} from '@shared/models/filter.model';

@Injectable()
export class GoodsService {
  goodsSubject = new BehaviorSubject([]);
  orderSubject = new BehaviorSubject(null);
  priceLimit = new BehaviorSubject( null);

  filterData = new Subject<any>();
  chosenProduct = 0;
  min: number;
  max: number;

  constructor(private http: HttpClient,
              private  authService: AuthService,
              private toasterService: ToasterService) {

  }

  sendOrder(order: { list: Goods[], data: any }) {
    const token = this.authService.getToken();
    this.http.post('https://carshop-ff44a.firebaseio.com/order.json?auth=' + token, order)
      .subscribe(
        result => console.log(result),
        error => console.log(error)
      );
  }

  getOrder() {
    this.http.get('https://carshop-ff44a.firebaseio.com/order.json')
      .subscribe(
        ( response: {'key': {data: Order, list: Goods[]}})  => {
          this.orderSubject.next(response);
        }
      );
  }

  deleteOrder(order) {
    const token = this.authService.getToken();
    this.http.put('https://carshop-ff44a.firebaseio.com/order.json?auth=' + token, order)
      .subscribe(
        result => this.getOrder(),
        error => console.log(error)
      );
  }

  getCurrentGoods() {
    return this.goodsSubject.value ? this.goodsSubject.value : [];
  }


  deleteProduct(index: number) {
    const goodsList = this.getCurrentGoods();
    goodsList.splice(index, 1);
    this.addGoods(goodsList);
  }

  addGoods(goodsList) {
    const token = this.authService.getToken();
    this.http.put('https://carshop-ff44a.firebaseio.com/data.json?auth=' + token, goodsList)
      .subscribe((data: Goods[]) => {
        this.goodsSubject.next(data);
      });
  }

  getGoods() {
    let index = 0;
    this.http.get('https://carshop-ff44a.firebaseio.com/data.json')
      .subscribe((goods: Goods[]) => {
        this.min = this.max = goods[0].price; /* getting cost limit 'height' and 'low' */
        const modifiedGoods = goods.map(item => {
          item.id = index++;
          if (+item.price < this.min) {
            this.min = item.price;
          }
          if (+item.price > this.max) {
            this.max = item.price;
          }
          return item;
        });
        this.priceLimit.next({minPrice: this.min, maxPrice: this.max});
        this.goodsSubject.next(modifiedGoods);
      });
  }

  getFilterCondition(data: FilterModel) {
    this.filterData.next(data);
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
}
