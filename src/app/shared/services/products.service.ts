import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {UserInfo} from '@shared/models/userInfo.model';
import {FilterModel} from '@shared/models/filter.model';

/**
 * @summary Product Service
 */
@Injectable()
export class ProductsService {
  productsSubject = new BehaviorSubject([]);
  orderSubject = new BehaviorSubject(null);
  priceLimit = new BehaviorSubject(null);
  purchaseSubject = new Subject<Product>();
  changedSubject = new Subject<{amount: number, total: number}>();

  filterData = new Subject<any>();
  chosenProduct = 0;
  min: number;
  max: number;

  /**
   * @param http - HttpClient
   * @param authService - Auth Service
   */
  constructor(private http: HttpClient,
              private  authService: AuthService) {
  }

  /**
   * Adding new order to data base
   * @param order - list of products & customer connect info
   */
  sendOrder(order: { list: Product[], data: any }) {
    const token = this.authService.getToken();
    this.http.post('https://carshop-ff44a.firebaseio.com/order.json?auth=' + token, order)
      .subscribe(
        result => console.log(result),
        error => console.log(error)
      );
  }

  /**
   * @summary getting orders & user info from data base
   */
  getOrder() {
    this.http.get('https://carshop-ff44a.firebaseio.com/order.json')
      .subscribe(
        (response: { 'key': { data: UserInfo, list: Product[] } }) => {
          this.orderSubject.next(response);
        }
      );
  }

  /**
   * @summary rewriting the order in DB
   * @param order - customer info & order data
   */
  deleteOrder(order) {
    const token = this.authService.getToken();
    this.http.put('https://carshop-ff44a.firebaseio.com/order.json?auth=' + token, order)
      .subscribe(
        result => this.getOrder(),
        error => console.log(error)
      );
  }

  /**
   * @summary getting list of products from DB
   * @return the productList or empty array
   */
  getCurrentGoods() {
    return this.productsSubject.value ? this.productsSubject.value : [];
  }

  /**
   * @summary remove desired product from ProductList and pass this List to addProduct
   * @param index - index of product witch need delete
   */
  deleteProduct(index: number) {
    const productsList = this.getCurrentGoods();
    productsList.splice(index, 1);
    this.addProduct(productsList);
  }

  /**
   * @summary rewrite products list in DB & getting the value of updated productList for shown to clients
   * @param productsList - whole arr of product
   */
  addProduct(productsList) {
    const token = this.authService.getToken();
    this.http.put('https://carshop-ff44a.firebaseio.com/data.json?auth=' + token, productsList)
      .subscribe((products: Product[]) => {
        const modifiedProduct = this.priceLimitCalulate(products);
        this.productsSubject.next(modifiedProduct);
        this.priceLimit.next({minPrice: this.min, maxPrice: this.max});
      });
  }

  /**
   * @summary getting cost limit 'max' and 'min'
   */
  priceLimitCalulate(products: Product[]) {
    let index = 0;
    this.min = this.max = products[0].price;
    return products.map(item => {
      item.id = index++;
      if (+item.price < this.min) {
        this.min = item.price;
      }
      if (+item.price > this.max) {
        this.max = item.price;
      }
      return item;
    });
  }

  /**
   * @summary getting Product list from DB
   */
  getGoods() {
    this.http.get('https://carshop-ff44a.firebaseio.com/data.json')
      .subscribe((products: Product[]) => {
        const modifiedProduct = this.priceLimitCalulate(products);
        this.priceLimit.next({minPrice: this.min, maxPrice: this.max});
        this.productsSubject.next(modifiedProduct);
      });
  }

  /**
   * @summary getting filter params and passing it to needed component
   * @param data - filter values
   */
  getFilterCondition(data: FilterModel) {
    this.filterData.next(data);
  }

  addToCart() {

  }

  /**
   * @summary receiving order data from Local Storage
   * @return array of ordered products
   */
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('order'));
  }

  /**
   * @summary saving orders to Local Storage
   * @param shoppingList - ordered products
   */
  setLocalStorage(shoppingList) {
    const purchaseArr = JSON.stringify(shoppingList);
    localStorage.setItem('order', purchaseArr);
  }

}
