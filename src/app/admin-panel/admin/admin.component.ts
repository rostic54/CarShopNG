import {Component, OnDestroy, OnInit} from '@angular/core';
import {GoodsService} from '@shared/services/goods.service';

import {MatDialog} from '@angular/material';
import {AdditionPopupComponent} from './addition-popup/addition-popup.component';
import {Goods} from '@shared/models/goods.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CommonService} from '@shared/services/common.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9h_LLTf5LYlXd9-ho5YW4SUOFI4M6vfDVwjc2n6PTBOpCb5z';
  goodsList;
  subscribe: Subscription;
  name: string;
  page: number;

  constructor(private goodsService: GoodsService,
              public dialog: MatDialog,
              private commonService: CommonService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getGoods();
    this.subscribe = this.activeRoute.data.subscribe(
      (value: { name: string }) => {

        this.name = value.name;
      }
    );
  }

  getGoods() {
    this.goodsService.getGoods();

    this.goodsService.goodsSubject.subscribe(
      (goods: Goods[]) => {
        this.goodsList = goods;
      }
    );
  }

  addToServer() {
    this.dialog.open(AdditionPopupComponent, {
      width: '450px',
      data: null
    });
  }

  modificProduct(index: number) {
    this.dialog.open(AdditionPopupComponent, {
      width: '450px',
      data: {obj: this.goodsList[index], index: index}
    });
  }

  orderList() {
    this.router.navigate(['orders'], {relativeTo: this.activeRoute});
  }

  ngOnDestroy() {
    this.goodsService.checkSubscription(this.subscribe);
  }

}
