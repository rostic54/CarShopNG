import { Component, OnInit } from '@angular/core';
import {Product} from '@shared/models/goods.model';
import {ProductsService} from '@shared/services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {PurchaseService} from '@shared/services/purchase.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  goodsList: Product[];
  id: number;
  private subscription: Subscription;

  constructor(private goodsService: ProductsService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private purchaseService: PurchaseService) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {

    this.goodsService.getGoods();

    this.goodsService.goodsSubject.subscribe(
      (goods: Product[]) => {
        this.goodsList = goods;
      });
  }

  addToCart(product: Product) {
    this.purchaseService.addProduct(product);
  }

  returnToProducts() {
    this.router.navigate(['../'], {relativeTo: this.activateRoute});
  }

}
