import {Component, OnDestroy, OnInit} from '@angular/core';
import {GoodsService} from '../../shared/goods.service';
import {Subscription} from 'rxjs';
import {isObject} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  orderList = [];
  clientInfo = [];
  subscribe: Subscription;
  imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9h_LLTf5LYlXd9-ho5YW4SUOFI4M6vfDVwjc2n6PTBOpCb5z';

  constructor(private goodsService: GoodsService) {
  }

  ngOnInit() {
    this.goodsService.getOrder();
    this.subscribe = this.goodsService.orderSubject
      .subscribe(
        orders => {
          if (orders) {
            this.getOrders(orders);
          }
        }
      );
  }

  getOrders(orderLIst) {
    // console.log(orderLIst);
    for (const key in orderLIst) {
      this.clientInfo.push(orderLIst[key].data);
      this.orderList.push(orderLIst[key].list);
    }
    console.log(this.clientInfo);
    console.log(this.orderList);
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}
