import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '@shared/models/product.model';
import {ProductsService} from '@shared/services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CommonService} from '@shared/services/common.service';

/**
 * @summary Product Detail
 */
@Component({
  selector: 'app-single-product',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productsList: Product[];
  id: number;
  subscription: Subscription;
  subscriptionProduct: Subscription;

  /**
   * @summary Control-poUp component constructor
   * @param router - Router
   * @param activateRoute - Activating route
   * @param productsService - Product Service
   * @param commonService - Common Service
   */
  constructor(private productsService: ProductsService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private commonService: CommonService
  ) {
  }

  /**
   * @summary calling getGoods method in productService & receiving products list
   */
  ngOnInit() {
    this.productsService.getGoods();
    this.subscription = this.activateRoute.params.subscribe(params => this.id = params['id']);
    this.subscriptionProduct = this.productsService.productsSubject.subscribe(
      (goods: Product[]) => {
        if (!this.id) {
          this.returnToProducts();
        }
          this.productsList = goods;
      });
  }

  /**
   * @summary addition a product to order
   * @param product - single product
   */
  addToCart(product: Product) {
    this.productsService.addToBasket(product);
  }

  /**
   * @summary navigation to '/product' from '/detail'
   */
  returnToProducts() {
    this.router.navigate(['../'], {relativeTo: this.activateRoute});
  }

  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscription);
    this.commonService.checkSubscription(this.subscriptionProduct);
  }
}

