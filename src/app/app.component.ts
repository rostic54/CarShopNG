import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './shared/auth.service';
import {AppService} from './shared/app.service';
import {Subscription} from 'rxjs';
import { ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  goodsList;
  subscription: Subscription;

  toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: false,
      tapToDismiss: true,
      timeout: 6000,
      animation: 'fade',
      newestOnTop: false,
      positionClass : 'toast-top-center'
    });

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService
  ) {
  }

  ngOnInit() {
    this.subscription = this.authService.currentTokenSubject
      .subscribe((token) => {
          if (!token) {
            return;
          }
        }
      );
    this.authService.authInit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
