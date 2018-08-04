import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {PurchaseService} from '../shared/services/purchase.service';
import {isBoolean} from 'util';

@Injectable()
export class CartGuard implements CanActivate, OnDestroy, OnInit {
  subscribe: Subscription;

  constructor(private purchaseService: PurchaseService,
              private router: Router) {
  }

  ngOnInit() {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    //
    // this.subscribe = this.purchaseService.changedSubject.subscribe(
    //   (response: { amount: number, total: number }) => {
    //     console.log(response);
    //     if (response.amount > 0) {
    //       console.log(this.orderList);
    //       this.orderList = response.amount;
    //       return true;
    //     }
    //     return false;
    //   });
    //  this.router.navigate(['/']);
    //  return false

    // this.purchaseService.purchaseList.subscribe(
    //   data => console.log(data)
    // );
    return true
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
