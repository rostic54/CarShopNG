import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';
import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  subscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getToken() && this.authService.isAdmin()) {
      return true;
    } else {
      return new Promise((resolve, reject) => {
        this.subscription = this.authService.currentTokenSubject.subscribe(
          (token) => {
            if (!token) {
              return;
            }
            this.subscription.unsubscribe();
            return resolve(this.authService.isAdmin());
          },
          (error) => {
            this.subscription.unsubscribe();
            return resolve(false);
          }
        );
      });
    }
  }
}
