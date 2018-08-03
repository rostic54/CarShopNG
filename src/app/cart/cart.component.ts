import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Goods} from '../shared/models/goods.model';
import {GoodsService} from '../shared/goods.service';
import {PurchaseService} from '../shared/purchase.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  shoppingList: Goods[];
  orderForm: FormGroup;
  imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9h_LLTf5LYlXd9-ho5YW4SUOFI4M6vfDVwjc2n6PTBOpCb5z';

  constructor(private goodsService: GoodsService,
              private purchaseService: PurchaseService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.shoppingList = this.getGoods();
    this.formInit();
  }

  formInit() {
    this.orderForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'tel': new FormControl('', Validators.required)
    });
  }

  getGoods() {
    return JSON.parse(localStorage.getItem('order'));
  }

  removeProduct(index: number) {
    this.shoppingList.splice(index, 1);
    this.setGoods();
    this.purchaseService.purchaseStatus({amount: this.shoppingList.length, total: this.getTotal()});
  }

  getTotal() {
    return this.shoppingList.reduce((sum, item) => {
      return sum + (+item.price);
    }, 0);
  }

  setGoods() {
    const purchaseArr = JSON.stringify(this.shoppingList);
    localStorage.setItem('order', purchaseArr);
  }

  submit() {
    this.goodsService.sendOrder({list: this.shoppingList, data: this.orderForm.value});
    this.toasterService.pop('success', 'Your order\'s just sent', 'Wait when our operator\'ll call you' );
    this.orderForm.reset();
  }

}