import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '@shared/services/products.service';

import {MatDialog} from '@angular/material';
import {ControlPopupComponent} from './control-popup/control-popup.component';
import {Product} from '@shared/models/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CommonService} from '@shared/services/common.service';
import {FilterModel} from '@shared/models/filter.model';

/**
 * @summary Admin component
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9h_LLTf5LYlXd9-ho5YW4SUOFI4M6vfDVwjc2n6PTBOpCb5z';
  productsList;
  order;
  subscribe: Subscription;
  subscriptionOrder: Subscription;
  subscribeFilter: Subscription;
  page: number;
  filterData = {
    min: 0,
    max: 1600000,
    color: 'all',
    feature: 'all'
  };

  /**
   * @summary Control-poUp component constructor
   * @param productsService - Product service
   * @param dialog - MatDialog service (popUp)
   * @param commonService - CommonService Service
   * @param activeRoute - Activated route Service
   * @param router -  Route Service
   */
  constructor(private productsService: ProductsService,
              public dialog: MatDialog,
              private commonService: CommonService,
              private router: Router,
              private activeRoute: ActivatedRoute,
  ) {
  }

  /**
   * @summary Call getGoods, getOrder from product service, fetch initial name & order & filter data
   * */
  ngOnInit() {
    this.getGoods();
    this.getOrderList();
    this.getFilterProperty();
  }

  /**
   * @summary Get products from product service
   * */
  getGoods() {
    this.productsService.getGoods();

    this.productsService.productsSubject.subscribe(
      (goods: Product[]) => {
        goods.forEach((item, i) => {
          item.id = i;
        });
        this.productsList = goods;
      }
    );
  }

  /**
   * @summary Open popUp window for addition new product
   * */
  addToServer() {
    this.dialog.open(ControlPopupComponent, {
      width: '450px',
      data: null
    });
  }

  /**
   * @summary Open popUp window for edition new product
   * @param index - index of product in list
   * */
  modifyProduct(index: number) {
    this.dialog.open(ControlPopupComponent, {
      width: '450px',
      data: {obj: this.productsList[index], index: index}
    });
  }

  /**
   * @summary Get fresh data from filter
   */
  getFilterProperty() {
    this.subscribeFilter = this.productsService.filterData.subscribe(
      (data: FilterModel) => {
        if (data) {
          this.filterData = data;
          // this.cdr.markForCheck();
        }
      }
    );
  }

  /**
   * @summary Get fresh order list
   */
  getOrderList() {
    this.productsService.getOrder();
    this.subscriptionOrder = this.productsService.orderSubject.subscribe(
      order => {
        this.order = order;
      }
    );
  }

  /**
   * @summary Navigate to orders list
   * */
  goToOrderList() {
    this.router.navigate(['orders'], {relativeTo: this.activeRoute});
  }

  /**
   * @summary Cleanup logic.
   * */
  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscribe);
    this.commonService.checkSubscription(this.subscriptionOrder);
    this.commonService.checkSubscription(this.subscribeFilter);
  }

}
