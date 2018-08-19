import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GoodsService} from '@shared/services/goods.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {Goods} from '@shared/models/goods.model';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-addition-popup',
  templateUrl: './control-popup.component.html',
  styleUrls: ['./control-popup.component.scss']
})
export class ControlPopupComponent implements OnInit {
  addGoodsForm: FormGroup;
  product: Goods;
  productsList: Goods[];
  index: number;

  constructor(private goodsService: GoodsService,
              private dialog: MatDialog,
              private toasterService: ToasterService,
              @Inject(MAT_DIALOG_DATA) public data: { obj: Goods, index: number }) {
  }

  ngOnInit() {
    if (this.data !== null) {
      this.product = this.data.obj;
      this.index = this.data.index;
    }
    this.initForm();
  }

  initForm() {
    this.addGoodsForm = new FormGroup({
      'brande': new FormControl(this.getKey('brande'), Validators.required),
      'modelName': new FormControl(this.getKey('modelName'), Validators.required),
      'power': new FormControl(this.getKey('power'), Validators.required),
      'color': new FormControl(this.getKey('color'), Validators.required),
      'feature': new FormControl(this.getKey('feature'), Validators.required),
      'url': new FormControl(this.getKey('url')),
      'description': new FormControl(this.getKey('description'), Validators.required),
      'price': new FormControl(this.getKey('price'), Validators.required),
      'discount': new FormControl(this.getKey('discount'), Validators.required)
    });
  }

  getKey(key: string) {
    return this.product ? this.product[key] : '';
  }

  cleanUpForm() {
    this.addGoodsForm.reset();
  }

  deleteProduct() {
    this.goodsService.deleteProduct(this.index);
    this.toasterService.pop('error', 'The product was deleted');
    this.dialog.closeAll();
  }


  modifyProductsList(goods: Goods, index: number) {
    this.productsList.splice(index, 1, goods);
  }

  onAddGoods() {
    this.productsList = this.goodsService.getCurrentGoods();
    if (this.data) {
      this.modifyProductsList(this.addGoodsForm.value, this.data.index);
      this.toasterService.pop('success', 'The changes\'s saved', 'You\'ve recently done some changes!');
    } else {
      const product = this.addGoodsForm.value;
      product.id = this.productsList.length;
      this.productsList.push(product);
      this.toasterService.pop('success', 'You\'ve recently added new car!', 'Brande: ' + product.brande);
    }
    this.goodsService.addGoods(this.productsList);
    this.dialog.closeAll();
  }

}
