import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    signIn: FormGroup;

  constructor(private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.signIn = new FormGroup({
        'email': new FormControl( '', Validators.required),
        'password': new FormControl( '', Validators.required)
    });
  }
  onSignIn() {
      const email = this.signIn.value.email;
      const password = this.signIn.value.password;
      this.authService.signInUser(email, password);
      this.dialog.closeAll();
  }
}
