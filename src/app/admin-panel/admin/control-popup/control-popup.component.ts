import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '@shared/services/products.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {Product} from '@shared/models/product.model';
import {ToasterService} from 'angular2-toaster';

/**
 * @summary Control-poUp component
 */
@Component({
  selector: 'app-addition-popup',
  templateUrl: './control-popup.component.html',
  styleUrls: ['./control-popup.component.scss']
})
export class ControlPopupComponent implements OnInit {
  addGoodsForm: FormGroup;
  product: Product;
  productsList: Product[];
  index: number;

  /**
   * @summary Control-poUp component constructor
   * @param productsService - Product service
   * @param dialog - MatDialog service (popUp)
   * @param toasterService - Toaster Service for Information
   * @param data - Selected plan information
   */
  constructor(private productsService: ProductsService,
              private dialog: MatDialog,
              public toasterService: ToasterService,
              @Inject(MAT_DIALOG_DATA) public data: { obj: Product, index: number }) {
  }

  /**
   * @summary Call initForm fetch initial product & index if data exist when payment plan component init.
   */
  ngOnInit() {
    if (this.data !== null) {
      this.product = this.data.obj;
      this.index = this.data.index;
    }
    this.initForm();
  }

  /**
   * @summary Call initForm and create form with data or empty, it depends on add or edit product.
   */
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

  /**
   * @summary Call getKey and create form with data or empty, it depends on add or edit product.
   * @param key - key of product property
   * @return value of this key if it exict or empty string
   */
  getKey(key: string) {
    return this.product ? this.product[key] : '';
  }

  /**
   * @summary Call cleanUpForm and clean all fields.
   */
  cleanUpForm() {
    this.addGoodsForm.reset();
  }

  /**
   * @summary Call deleteProduct and delete the product from data base.
   */
  deleteProduct() {
    this.productsService.deleteProduct(this.index);
    this.toasterService.pop('error', 'The product was deleted');
    this.dialog.closeAll();
  }

  /**
   * @summary Call modifyProductsList and rewrite corrected  product.
   * @param products - array of all products
   * @param index - index of the modify product in the array
   */
  modifyProductsList(products: Product, index: number) {
    this.productsList.splice(index, 1, products);
  }

  /**
   * @summary Call onAddGoods and if data passed when form was created,
   *          then modify and show chang toaster if data was absent new product create and show add toaster.
   */
  onAddGoods() {
    this.productsList = this.productsService.getCurrentGoods();

    if (this.data) {
      this.modifyProductsList(this.addGoodsForm.value, this.data.index);
      this.toasterService.pop('success', 'The changes\'s saved', 'You\'ve recently done some changes!');
    } else {
      const product = this.addGoodsForm.value;
      product.id = this.productsList.length;
      this.productsList.push(product);
      this.toasterService.pop('success', 'You\'ve recently added new car!', 'Brande: ' + product.brande);
    }
    this.productsService.addProduct(this.productsList);
    this.dialog.closeAll();
  }

}
