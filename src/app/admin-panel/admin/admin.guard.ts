import {CanActivate, Router} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';
import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  subscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  /**
   * Getting promise response with(out) token & check email by coincidence with the admin
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.checkLogining()
      .then(token => {
        if (token && this.authService.isAdmin()) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      });
  }
}
