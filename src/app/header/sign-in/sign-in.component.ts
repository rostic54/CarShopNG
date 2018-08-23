import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@shared/services/auth.service';
import {MatDialog} from '@angular/material';

/**
 * @summary Singn-In component
 */
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signIn: FormGroup;

  /**
   * @param authService - Auth Service
   * @param dialog -  MAtdialog Service (popUp)
   */
  constructor(private authService: AuthService,
              private dialog: MatDialog) {
  }

  /**
   * @summary calling initForm
   */
  ngOnInit() {
    this.initForm();
  }

  /**
   * @summary creating of form
   */
  initForm() {
    this.signIn = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  /**
   * @summary getting values of form field & passing to AuthService for checking
   */
  onSignIn() {
    const email = this.signIn.value.email;
    const password = this.signIn.value.password;
    this.authService.signInUser(email, password);
    this.dialog.closeAll();
  }
}
