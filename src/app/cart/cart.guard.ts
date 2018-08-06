import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class CartGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const orderList = JSON.parse(localStorage.getItem('order'));
    if (orderList.length) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
