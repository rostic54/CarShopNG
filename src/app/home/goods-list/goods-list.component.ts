import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Goods} from '../../shared/models/goods.model';
import {GoodsService} from '../../shared/services/goods.service';
import {Subscription} from 'rxjs';
import {PurchaseService} from '../../shared/services/purchase.service';


@Component({
  selector: 'app-goods',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})
export class GoodsListComponent implements OnInit, OnDestroy {
  goodsList: Goods[];
  subscribe: Subscription;
  filterData = {
    min: 0,
    max: 1600000,
    color: 'all',
    feature: 'all'
  };

  constructor(private goodsService: GoodsService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private purchaseService: PurchaseService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.goodsService.getGoods();

    this.subscribe = this.goodsService.goodsSubject.subscribe(
      (goods: Goods[]) => {
        this.goodsList = goods;
      });
  }

  showProductDescription(product: Goods, elem) {
    if (elem.target.tagName === 'BUTTON' || elem.target.tagName === 'SPAN') {
      return false;
    }
    this.router.navigate([product.id], {relativeTo: this.activeRoute});
  }

  setFilterData(data) {
    this.filterData = data;
    this.cdr.detectChanges();
  }

  addToCard(product: Goods) {
    this.purchaseService.addProduct(product);
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
