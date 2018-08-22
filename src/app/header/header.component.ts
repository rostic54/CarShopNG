import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthService} from '@shared/services/auth.service';
import {Subscription} from 'rxjs';
import {ToasterService} from 'angular2-toaster';
import {CommonService} from '@shared/services/common.service';
import {ProductsService} from '@shared/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  logo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Unx05sp0wgk7iFULk9qzpxHL-krK1PfZaIKIZHJxXR2GyToypQ';
  authCondition;
  subscription: Subscription;
  email;


  constructor(public dialog: MatDialog,
              public authService: AuthService,
              private commonService: CommonService
              ) {
  }

  ngOnInit() {
    this.subscription = this.authService.currentTokenSubject.subscribe(
      (token) => {
        this.authCondition = token;
        this.email = this.authService.email;
      },
      (error) => {
        console.log(error);
      }
    );
    this.authCondition = this.authService.getToken();
  }

  openSignUp(): void {
    const popUp = this.dialog.open(SignUpComponent, {
      width: '450px',
      data: null,
      autoFocus: false
    });
  }

  openSignIn(): void {
    const popUp = this.dialog.open(SignInComponent, {
      width: '450px',
      data: null
    });
  }

  onSignOut() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscription);
  }

}
