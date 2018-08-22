import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '@shared/services/products.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '@shared/services/common.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  page = 1;
  ordersList = {};
  keysList = [];
  productsList = [];
  clientInfo = [];
  subscribe: Subscription;
  defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9h_LLTf5LYlXd9-ho5YW4SUOFI4M6vfDVwjc2n6PTBOpCb5z';

  constructor(private goodsService: ProductsService,
              private commonService: CommonService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.goodsService.getOrder();
    this.subscribe = this.goodsService.orderSubject
      .subscribe(orders => {
          this.ordersList = orders;
          this.getOrders(orders);
        if (!orders) {
          this.router.navigate(['../'], {relativeTo: this.activeRoute});
        }
        }
      );
  }

  getOrders(orderLIst) {
    this.productsList.length = 0;
    this.clientInfo.length = 0;
    this.keysList.length = 0;
    for (const key in orderLIst) {
      this.keysList.push(key);
      this.clientInfo.push(orderLIst[key].data);
      this.productsList.push(orderLIst[key].list);
    }
  }

  removeOrder(index: number) {
    delete this.ordersList[this.keysList[index]];
    this.goodsService.deleteOrder(this.ordersList);
  }

  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscribe);
  }

}
