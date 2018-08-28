import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '@shared/services/products.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '@shared/services/common.service';
import {Product} from '@shared/models/product.model';
import {UserInfo} from '@shared/models/userInfo.model';

/**
 * @summary UserInfo component constructor
 * */
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  page = 1;
  ordersList = {};
  keysList = [];
  productsList = [];
  clientInfo = [];
  subscribe: Subscription;
  defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9h_LLTf5LYlXd9-ho5YW4SUOFI4M6vfDVwjc2n6PTBOpCb5z';

  /**
   * @summary Control-poUp component constructor
   * @param productsService - Product service
   * @param commonService - CommonService Service
   * @param activeRoute - Activated route Service
   * @param router -  Route Service
   */
  constructor(private productsService: ProductsService,
              private commonService: CommonService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  /**
   * @summary Control-poUp component constructor
   * */
  ngOnInit() {
    this.productsService.getOrder();
    this.subscribe = this.productsService.orderSubject
      .subscribe(orders => {
          if (!orders) {
            this.router.navigate(['../'], {relativeTo: this.activeRoute});
          }
          this.ordersList = orders;
        console.log(this.ordersList);
          this.getOrders(orders);
        }
      );
  }

  /**
   * @summary creating orders, products list & info
   * @param orderList - ordered products
   * */
  getOrders(orderLIst: [{ data: UserInfo, list: Product[] }]) {
    this.productsList.length = 0;
    this.clientInfo.length = 0;
    this.keysList.length = 0;
    for (const key in orderLIst) {
      this.keysList.push(key);
      this.clientInfo.push(orderLIst[key].data);
      this.productsList.push(orderLIst[key].list);
    }
  }

  /**
   * @summary delete of order from DB by passing changed orders array to product Server
   * @param index of deleted order
   * */
  removeOrder(index: number) {
    delete this.ordersList[this.keysList[index]];
    this.productsService.deleteOrder(this.ordersList);
  }

  /**
   * @summary logic clean
   * */
  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscribe);
  }

}
