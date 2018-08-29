import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '@shared/services/products.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '@shared/services/common.service';
import {Product} from '@shared/models/product.model';
import {UserInfo} from '@shared/models/userInfo.model';
import {ToasterService} from 'angular2-toaster';

/**
 * @summary UserInfo component
 * */
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  page = 1;
  productShow = 1;
  ordersList = {};
  keysList = [];
  productsList = [];
  clientInfo = [];
  subscription: Subscription;
  subscriptionOrder: Subscription;
  defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9h_LLTf5LYlXd9-ho5YW4SUOFI4M6vfDVwjc2n6PTBOpCb5z';

  /**
   * @summary Control-poUp component constructor
   * @param productsService - Product service
   * @param commonService - CommonService Service
   * @param activeRoute - Activated route Service
   * @param router -  Route Service
   * @param toasterService -  Toaster Service
   */
  constructor(private productsService: ProductsService,
              private commonService: CommonService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private toasterService: ToasterService) {
  }

  /**
   * @summary Control-poUp component
   * */
  ngOnInit() {
    this.productsService.getOrder();
    this.subscription = this.productsService.orderSubject
      .subscribe(orders => {
          this.ordersList = orders;
          this.getOrders(orders);
        }
      );
  }

  /**
   * @summary creating orders, products list & info
   * @param orderList - ordered products
   * */
  getOrders(orderList: { data: UserInfo, list: Product[] }) {
    this.productsList.length = 0;
    this.clientInfo.length = 0;
    this.keysList.length = 0;
    for (const key in orderList) {
      this.keysList.push(key);
      this.clientInfo.push(orderList[key].data);
      this.productsList.push(orderList[key].list);
    }
  }

  /**
   * @summary delete of order from DB by passing changed orders array to product Server
   * @param index of deleted order
   * */
  removeOrder(index: number) {
    delete this.ordersList[this.keysList[index]];
    this.subscriptionOrder = this.productsService.deleteOrder(this.ordersList)
      .subscribe(
        () => {
          this.productsService.getOrder();
          this.toasterService.pop('success', 'Success', 'Order was just deleted');
          if (!Object.keys(this.ordersList).length) {
            this.goToAdmin();
          }
        },
        () => {
          this.toasterService.pop('error', 'Error', 'Order wasn\'t just deleted');
        }
      );

  }

  /**
   * @summary Make relocate to admin panel
   */
  goToAdmin() {
    this.router.navigate(['../'], {relativeTo: this.activeRoute});
  }

  /**
   * @summary cleanUp logic
   * */
  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscription);
    this.commonService.checkSubscription(this.subscriptionOrder);
  }

}
