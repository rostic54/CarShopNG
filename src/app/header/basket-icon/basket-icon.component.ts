import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PurchaseService} from '../../shared/services/purchase.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket-icon.component.html',
  styleUrls: ['./basket-icon.component.scss']
})
export class BasketIconComponent implements OnInit, OnDestroy {
  subscribe: Subscription;
  productList: any = [];
  subscript: Subscription;
  total = 0;

  constructor(private purchaseService: PurchaseService,
              private router: Router,
              private activeRoute: ActivatedRoute,) {
  }

  ngOnInit() {

    if (this.getBasketData()) {
      this.productList = this.getBasketData();
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

  ngOnDestroy() {
    this.subscribe.unsubscribe();
    this.subscript.unsubscribe();
  }

  getTotalPrice() {
    return this.total;
  }

  rewriteLocalStor(productsList) {
    const purchaseArr = JSON.stringify(productsList);
    localStorage.setItem('order', purchaseArr);
  }

  totalCalculate() {
    this.total = 0;
    this.productList.forEach(item => {
      this.total += (+item.price);
    });
  }

  getBasketData() {
    return JSON.parse(localStorage.getItem('order'));
  }

  cartPage() {
      this.router.navigate(['./cart'], {relativeTo: this.activeRoute});

  }
}
