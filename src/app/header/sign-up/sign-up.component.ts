import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../shared/auth.service';
import {MatDialog} from '@angular/material';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUp: FormGroup;

  constructor(private authService: AuthService,
              private dialog: MatDialog,
  private toasterService: ToasterService) { }

  ngOnInit( ) {
    this.initForm();
  }

  initForm() {
    this.signUp = new FormGroup({
        'email': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
        'name': new FormControl('', Validators.required)
    });
  }

    onSignUp() {
     this.authService.signUpUser(this.signUp.value);
     this.dialog.closeAll();
    }

}
