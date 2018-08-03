import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class PurchaseService {
  purchaseSubject = new BehaviorSubject(null);
  changedSubject = new BehaviorSubject(null);

  constructor() {
  }

  addProduct(product: any) {
    this.purchaseSubject.next(product);
  }

  purchaseStatus(orderAmount: {amount: number, total: number}) {
    this.changedSubject.next(orderAmount);
  }
}
