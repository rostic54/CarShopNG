import {Injectable} from '@angular/core';
import { Subject} from 'rxjs';
import {Product} from '@shared/models/product.model';

@Injectable()
export class PurchaseService {
  purchaseSubject = new Subject<Product>();
  changedSubject = new Subject<{amount: number, total: number}>();

  constructor() {
  }

  addProduct(product: Product) {
    this.purchaseSubject.next(product);
  }

  purchaseStatus(orderAmount: {amount: number, total: number}) {
    this.changedSubject.next(orderAmount);
  }

}
