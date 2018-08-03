import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ToasterService} from 'angular2-toaster';

import {AuthService} from '../../shared/services/auth.service';
import {CommonService} from '../../shared/services/common.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUp: FormGroup;

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private toasterService: ToasterService,
              private commonService: CommonService) { }

  ngOnInit( ) {
    this.initForm();
  }

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

    onSignUp() {
     this.authService.signUpUser(this.signUp.value);
     this.dialog.closeAll();
    }

}
