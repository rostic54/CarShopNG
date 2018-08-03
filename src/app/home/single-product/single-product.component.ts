import { Component, OnInit } from '@angular/core';
import {Goods} from '../../shared/models/goods.model';
import {GoodsService} from '../../shared/goods.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  goodsList: Goods[];
  id: number;
  private subscription: Subscription;

  constructor(private goodsService: GoodsService,
              private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {

    this.goodsService.getGoods();

    this.goodsService.goodsSubject.subscribe(
      (goods: Goods[]) => {
        this.goodsList = goods;
      });
  }

}
