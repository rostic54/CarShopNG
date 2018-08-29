import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '@shared/models/product.model';
import {ProductsService} from '@shared/services/products.service';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CommonService} from '@shared/services/common.service';

/**
 * @summary Cart component
 */
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  shoppingList: Product[];
  orderForm: FormGroup;
  subscription: Subscription;
  imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9h_LLTf5LYlXd9-ho5YW4SUOFI4M6vfDVwjc2n6PTBOpCb5z';

  /**
   * @summary Control-poUp component constructor
   * @param productsService - Product service
   * @param toasterService - Toaster Service
   * @param commonService - Common Service
   * @param router -  Route Service
   */
  constructor(private productsService: ProductsService,
              private toasterService: ToasterService,
              private commonService: CommonService,
              private router: Router) {
  }

  /**
   * @summary Creating shoppingLIst by calling getGoods() & calling formInit during initializing
   *
   */
  ngOnInit() {
    this.shoppingList = this.getGoods();
    this.formInit();
  }

  /**
   * @summary Creating form for sanding order
   */
  formInit() {
    this.orderForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'tel': new FormControl('', Validators.required)
    });
  }

  /**
   * @summary delete product
   * @param index - index of product
   */
  removeProduct(index: number) {
    this.shoppingList.splice(index, 1);
    if (!this.shoppingList.length) {
      this.leaveAway();
    }
    this.setGoods(this.shoppingList);
    this.productsService.purchaseStatus({amount: this.shoppingList.length, total: this.getTotal()});
  }

  /**
   * @summary total price of the order
   */
  getTotal() {
    return this.shoppingList.reduce((sum, item) => {
      return sum + (+item.price);
    }, 0);
  }

  /**
   * @summary receiving order from Local Storage
   */
  getGoods() {
    return this.productsService.getLocalStorage();
  }

  /**
   * @summary saving of order in the local Storage
   * @param shoppingList - list of ordered products
   */
  setGoods(shoppingList) {
    this.productsService.setLocalStorage(shoppingList);
  }

  leaveAway() {
    this.router.navigate(['/']);
  }

  /**
   * @summary getting response about data sending to DB
   */
  submit() {
    this.subscription = this.productsService.sendOrder({list: this.shoppingList, data: this.orderForm.value})
      .subscribe(
      (response) => {
        this.toasterService.pop('success', 'Your order\'s just sent', 'Wait when our operator\'ll call you');
        this.cleanUpOrder();
      },
      (error) => this.toasterService.pop('error', 'Failed', 'The order didn\'t send')
    );
  }

  /**
   * @summary clearing the cart and redirect to '/'
   */
  cleanUpOrder() {
    this.shoppingList.length = 0;
    this.setGoods(this.shoppingList);
    this.productsService.purchaseStatus({amount: 0, total: 0});
    this.leaveAway();
    this.orderForm.reset();
  }

  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscription);
  }
}
