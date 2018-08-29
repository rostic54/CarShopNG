import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {UserInfo} from '@shared/models/userInfo.model';
import {FilterModel} from '@shared/models/filter.model';
import {ToasterService} from 'angular2-toaster';

/**
 * @summary Product Service
 */
@Injectable()
export class ProductsService {
  productsSubject = new BehaviorSubject([]);
  orderSubject = new BehaviorSubject(null);
  priceLimit = new BehaviorSubject(null);
  purchaseSubject = new Subject<Product>();
  changedSubject = new Subject<{ amount: number, total: number }>();

  filterData = new Subject<any>();
  chosenProduct = 0;
  min: number;
  max: number;

  /**
   * @param http - HttpClient
   * @param authService - Auth Service
   * @param toasterService - Toaster Service
   */
  constructor(private http: HttpClient,
              private  authService: AuthService,
              private  toasterService: ToasterService) {
  }

  /**
   * Adding new order to data base
   * @param order - list of products & customer connect info
   */
  sendOrder(order: { list: Product[], data: any }): Observable<any> {
    const token = this.authService.getToken();
    return this.http.post('https://carshop-ff44a.firebaseio.com/order.json?auth=' + token, order);
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
  deleteOrder(order): Observable<any> {
    const token = this.authService.getToken();
    return this.http.put('https://carshop-ff44a.firebaseio.com/order.json?auth=' + token, order);
  }

  /**
   * @summary getting list of products from DB
   * @return the productList or empty array
   */
  getCurrentGoods(): Product[] {
    return this.productsSubject.value ? this.productsSubject.value : [];
  }

  /**
   * @summary remove desired product from ProductList and pass this List to addToBasket
   * @param index - index of product witch need delete
   */
  deleteProduct(index: number) {
    const productsList = this.getCurrentGoods();
    productsList.splice(index, 1);
    this.updateProduct(productsList, 'The product was deleted');

  }

  /**
   * @summary rewrite products list in DB & getting the value of updated productList for shown to clients
   * @param productsList - whole arr of product
   * @param message - text of message
   */
  updateProduct(productsList: Product[], message: string) {
    const token = this.authService.getToken();
    this.http.put('https://carshop-ff44a.firebaseio.com/data.json?auth=' + token, productsList)
      .subscribe((products: Product[]) => {
        const modifiedProduct = this.priceLimitCalulate(products);
        this.productsSubject.next(modifiedProduct);
        this.priceLimit.next({minPrice: this.min, maxPrice: this.max});
        this.toasterService.pop('success', `${message}`);
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

  /**
   * @summary call by 'BUY' button and pass the checked product to basket component & show in header
   * @param product - ordered product
   */
  addToBasket(product: Product) {
    this.purchaseSubject.next(product);
  }

  /**
   * @summary Changing and passing orderList length & total price after removing a product from cart
   * @param orderAmount - orderList length & total price
   */
  purchaseStatus(orderAmount: { amount: number, total: number }) {
    this.changedSubject.next(orderAmount);
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
