import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {AppService} from './shared/services/app.service';
import {Subscription} from 'rxjs';
import { ToasterService, ToasterConfig} from 'angular2-toaster';
import {environment} from '../environments/environment';
import {CommonService} from '@shared/services/common.service';
import {GoodsService} from '@shared/services/goods.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
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
    private goodsService: GoodsService
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
      this.goodsService.checkSubscription(this.subscription);
  }
}
