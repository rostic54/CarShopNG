import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { Subscription} from 'rxjs';
import {Product} from '@shared/models/product.model';
import {ProductsService} from '@shared/services/products.service';
import {PurchaseService} from '@shared/services/purchase.service';
import {CommonService} from '@shared/services/common.service';
import {FilterModel} from '@shared/models/filter.model';

/**
 * Goods List component
 */
@Component({
  selector: 'app-goods',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss'],
})
export class GoodsListComponent implements OnInit, OnDestroy {
  goodsList: Product[];
  subscribe: Subscription;
  subscribeFilter: Subscription;
  page: number;
  viewProducts = 6;
  filterData = {
    min: 0,
    max: 1600000,
    color: 'all',
    feature: 'all'
  };

  /**
   * @summary Control-poUp component constructor
   * @param purchaseService - Purchase service
   * @param router - Router
   * @param commonService - CommonService
   * @param activeRoute - Activating route
   * @param productsService - Product Service
   */
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private commonService: CommonService,
    private activeRoute: ActivatedRoute,
    private purchaseService: PurchaseService) {
  }

  /**
   * @summary saving number of page for return after detail looking, call getGoods in Product Server and receiving Products
   */
  ngOnInit() {
    this.page = Math.ceil(this.productsService.chosenProduct / this.viewProducts);
    this.productsService.getGoods();

    this.subscribe = this.productsService.productsSubject.subscribe(
      (goods: Product[]) => {
        this.goodsList = goods;
      }
    );

    this.subscribeFilter = this.productsService.filterData.subscribe(
      (data: FilterModel) => {
        if (data) {
          this.filterData = data;
        }
      }
    );
  }

  /**
   * @summary Show single product detail
   * @param product - one product
   */
  showProductDescription(product: Product) {
    this.productsService.chosenProduct = product.id + 1;
    this.router.navigate([product.id], {relativeTo: this.activeRoute});
  }

  /**
   * @summary Addition of product to cart
   * @param product - single product
   */
  addToCart(product: Product) {
    this.purchaseService.addProduct(product);
  }

  /**
   * @summary clean logic
   */
  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscribe);
    this.commonService.checkSubscription(this.subscribeFilter);
  }
}
