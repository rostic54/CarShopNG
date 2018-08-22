import {Component, OnInit} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {Subscription} from 'rxjs';
import {ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: false,
      tapToDismiss: true,
      timeout: 6000,
      animation: 'fade',
      newestOnTop: false,
      positionClass: 'toast-top-center'
    });
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.authInit();
  }

}
