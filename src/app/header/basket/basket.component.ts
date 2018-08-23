import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PurchaseService} from '@shared/services/purchase.service';
import {Subscription} from 'rxjs';
import {CommonService} from '@shared/services/common.service';
import {ProductsService} from '@shared/services/products.service';

/**
 * @summary BasketIcon component
 */
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketIconComponent implements OnInit, OnDestroy {
  subscribe: Subscription;
  productList: any = [];
  subscript: Subscription;
  total = 0;

  /**
   * @summary Control-poUp component constructor
   * @param purchaseService - Purchase service
   * @param router - Router
   * @param commonService - CommonService
   * @param activeRoute - Activating route
   * @param productsService - Product Service
   */
  constructor(private purchaseService: PurchaseService,
              private router: Router,
              private commonService: CommonService,
              private activeRoute: ActivatedRoute,
              private productsService: ProductsService) {
  }

  /**
   * @summary checking & getting data from Local Storage, calculate of general summ & rewrite Local Storage, getting order length
   */
  ngOnInit() {
    const dataLocalStorage = this.getBasketData();
    if (dataLocalStorage) {
      this.productList = dataLocalStorage;
      this.totalCalculate();
    }
    this.subscribe = this.purchaseService.purchaseSubject.subscribe(
      (product) => {
        if (product) {
          this.productList.push(product);
          this.totalCalculate();
          this.rewriteLocalStor(this.productList);
        }
      }
    );
    this.subscript = this.purchaseService.changedSubject.subscribe(
      purchaseStatus => {
        if (purchaseStatus) {
          this.productList.length = purchaseStatus.amount;
          this.total = purchaseStatus.total;
        }
      }
    );
  }

  /**
   * @summary getting whole price
   */
  getTotalPrice() {
    return this.total;
  }

  /**
   * @summary saving order to Local Storage
   * @param productsList - list of products
   */
  rewriteLocalStor(productsList) {
    this.productsService.setLocalStorage(productsList);
  }

  /**
   * @summary total price calculate
   */
  totalCalculate() {
    this.total = 0;
    this.productList.forEach(item => {
      this.total += (+item.price) * (1 - (+item.discount / 100));
    });
  }

  /**
   * @summary getting order from Local Storage
   */
  getBasketData() {
    return this.productsService.getLocalStorage();
  }

  /**
   * @summary navigating to cart page
   */
  cartPage() {
    this.router.navigate(['./cart'], {relativeTo: this.activeRoute});

  }

  /**
   * clean of logic
   */
  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscribe);
    this.commonService.checkSubscription(this.subscript);
  }
}
