import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
}
