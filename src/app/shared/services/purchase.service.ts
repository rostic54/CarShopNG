import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Goods} from '@shared/models/goods.model';

@Injectable()
export class PurchaseService {
//  purchaseSubject = new BehaviorSubject(null);
//  changedSubject = new BehaviorSubject(null);
  purchaseSubject = new Subject<Goods>();
  changedSubject = new Subject<{amount: number, total: number}>();

  constructor() {
  }

  addProduct(product: Goods) {
    this.purchaseSubject.next(product);
  }

  purchaseStatus(orderAmount: {amount: number, total: number}) {
    this.changedSubject.next(orderAmount);
  }

}
