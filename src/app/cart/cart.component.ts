import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Goods} from '@shared/models/goods.model';
import {GoodsService} from '@shared/services/goods.service';
import {PurchaseService} from '@shared/services/purchase.service';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';

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
              private toasterService: ToasterService,
              private router: Router) {
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

  removeProduct(index: number) {
    this.shoppingList.splice(index, 1);
    if (!this.shoppingList.length) {
      this.router.navigate(['/']);
    }
    this.setGoods(this.shoppingList);
    this.purchaseService.purchaseStatus({amount: this.shoppingList.length, total: this.getTotal()});
  }

  getTotal() {
    return this.shoppingList.reduce((sum, item) => {
      return sum + (+item.price);
    }, 0);
  }
  getGoods() {
    return this.goodsService.getLocalStorage();
  }

  setGoods(shoppingList) {
    this.goodsService.setLocalStorage(shoppingList);
  }

  submit() {
    this.goodsService.sendOrder({list: this.shoppingList, data: this.orderForm.value});
    this.toasterService.pop('success', 'Your order\'s just sent', 'Wait when our operator\'ll call you');
    this.orderForm.reset();
  }

}
