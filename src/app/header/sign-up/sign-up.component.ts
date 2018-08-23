import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ToasterService} from 'angular2-toaster';

import {AuthService} from '@shared/services/auth.service';
import {CommonService} from '@shared/services/common.service';

/**
 * @summary SignUp component
 */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUp: FormGroup;

  /**
   * @summary Control-poUp component constructor
   * @param authService - Auth service
   * @param commonService - CommonService
   * @param dialog - Matdialog Service (popUp)
   * @param toasterService - Toaster Service
   */
  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private toasterService: ToasterService,
              private commonService: CommonService) {
  }

  /**
   * @summary calling of initForm during initialization
   */
  ngOnInit() {
    this.initForm();
  }

  /**
   * @summary creating new form
   */
  initForm() {
    this.signUp = new FormGroup({
      'name': new FormControl('', [Validators.required,
        Validators.minLength(2),
        this.commonService.antiAdmin]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'passwordFormGroup': new FormGroup({
        'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
        'password2': new FormControl('', [Validators.required, Validators.minLength(6)]),
      }, {
        validators: this.commonService.validate.bind(this)
      })
    });
  }

  /**
   * @summary pass form data to Auth Service
   */
  onSignUp() {
    this.authService.signUpUser({email: this.signUp.value.email, password: this.signUp.value.passwordFormGroup.password});
    this.dialog.closeAll();
  }

}
