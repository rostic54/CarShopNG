import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { Subscription} from 'rxjs';
import {Goods} from '@shared/models/goods.model';
import {GoodsService} from '@shared/services/goods.service';
import {PurchaseService} from '@shared/services/purchase.service';
import {CommonService} from '@shared/services/common.service';
import {FilterModel} from '@shared/models/filter.model';


@Component({
  selector: 'app-goods',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss'],
})
export class GoodsListComponent implements OnInit, OnDestroy {
  goodsList: Goods[];
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

  constructor(
    private goodsService: GoodsService,
    private router: Router,
    private commonService: CommonService,
    private activeRoute: ActivatedRoute,
    private purchaseService: PurchaseService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.page = Math.ceil(this.goodsService.chosenProduct / this.viewProducts);
    this.goodsService.getGoods();

    this.subscribe = this.goodsService.goodsSubject.subscribe(
      (goods: Goods[]) => {
        this.goodsList = goods;
      }
    );

    this.subscribeFilter = this.goodsService.filterData.subscribe(
      (data: FilterModel) => {
        if (data) {
          this.filterData = data;
          // this.cdr.markForCheck();
        }
      }
    );
  }

  showProductDescription(product: Goods) {
    this.goodsService.chosenProduct = product.id + 1;
    this.router.navigate([product.id], {relativeTo: this.activeRoute});
  }

  addToCart(product: Goods) {
    this.purchaseService.addProduct(product);
  }

  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscribe);
    this.commonService.checkSubscription(this.subscribeFilter);
  }
}
