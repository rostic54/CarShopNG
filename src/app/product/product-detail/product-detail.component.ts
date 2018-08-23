import { Component, OnInit } from '@angular/core';
import {Product} from '@shared/models/product.model';
import {ProductsService} from '@shared/services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {PurchaseService} from '@shared/services/purchase.service';

/**
 * @summary Product Detail
 */
@Component({
  selector: 'app-single-product',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  goodsList: Product[];
  id: number;
  private subscription: Subscription;

  /**
   * @summary Control-poUp component constructor
   * @param purchaseService - Purchase service
   * @param router - Router
   * @param activateRoute - Activating route
   * @param productsService - Product Service
   */
  constructor(private productsService: ProductsService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private purchaseService: PurchaseService) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
  }

  /**
   * @summary calling getGoods method in productService & receiving products list
   */
  ngOnInit() {
    this.productsService.getGoods();
    this.productsService.productsSubject.subscribe(
      (goods: Product[]) => {
        this.goodsList = goods;
      });
  }

  /**
   * @summary addition a product to order
   * @param product - single product
   */
  addToCart(product: Product) {
    this.purchaseService.addProduct(product);
  }

  /**
   * @summary navigation to '/product' from '/detail'
   */
  returnToProducts() {
    this.router.navigate(['../'], {relativeTo: this.activateRoute});
  }

}
