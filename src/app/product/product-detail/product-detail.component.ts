import { Component, OnInit } from '@angular/core';
import {Goods} from '@shared/models/goods.model';
import {GoodsService} from '@shared/services/goods.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {PurchaseService} from '@shared/services/purchase.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  goodsList: Goods[];
  id: number;
  private subscription: Subscription;

  constructor(private goodsService: GoodsService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private purchaseService: PurchaseService) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {

    this.goodsService.getGoods();

    this.goodsService.goodsSubject.subscribe(
      (goods: Goods[]) => {
        this.goodsList = goods;
      });
  }

  addToCart(product: Goods) {
    this.purchaseService.addProduct(product);
  }

  returnToProducts() {
    this.router.navigate(['../'], {relativeTo: this.activateRoute});
  }

}
