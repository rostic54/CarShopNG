import {Component, OnInit} from '@angular/core';
import {GoodsService} from '../../shared/goods.service';

import {MatDialog} from '@angular/material';
import {AdditionPopupComponent} from './addition-popup/addition-popup.component';
import {Goods} from '../../shared/models/goods.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9h_LLTf5LYlXd9-ho5YW4SUOFI4M6vfDVwjc2n6PTBOpCb5z';
  goodsList;

  constructor(private goodsService: GoodsService,
              private dialog: MatDialog,
              private router: Router,
              private activeRoute: ActivatedRoute ) {
  }

  ngOnInit() {
    this.getGoods();
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


}
