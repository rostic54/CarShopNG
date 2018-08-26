import {RouterModule} from '@angular/router';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductModule} from '@app/product/product.module';
import {SharedModule} from '@shared/modules/shared.module';
import {ProductsService} from '@shared/services/products.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppModule} from '@app/app.module';
import {CommonService} from '@shared/services/common.service';
import {MockProductService} from '@shared/mock-services/mock-products.services';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AdminModule} from '@app/admin-panel/admin/admin.module';
import {RouterTestingModule} from '@angular/router/testing';
import {SignInComponent} from '@app/header/sign-in/sign-in.component';
import {MockAuthService} from '@shared/mock-services/mock-auth.service';
import {AuthService} from '@shared/services/auth.service';

describe('SignInComponent', () => {
  let component: any;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        AdminModule,
        AppMaterialModule,
        AppModule,
        RouterModule,
        SharedModule,
        ProductModule
      ],
      providers: [
        {provide: CommonService, useClass: CommonService},
        {provide: ProductsService, useClass: MockProductService},
        {provide: AuthService, useClass: MockAuthService},
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SignInComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
      // fixture.detectChanges();
    });

  }));

  it('Should create BasketComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {

    it('Should call initForm ', async(() => {
      const spy = spyOn(component, 'initForm');

      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    }));
  });
  describe('initForm method', () => {

    it('New form was created ', async(() => {
      component.initForm();
      const email = component.signIn.controls['email'];
      const password = component.signIn.controls['password'];
      expect(email.valid).toBeFalsy();
      expect(password.valid).toBeFalsy();
    }));
  });

  describe('initForm method', () => {

    it('New form was created ', async(() => {
      const spy = spyOn(component.authService, 'signInUser');
      component.signIn.controls['email'].setValue('test');
      component.signIn.controls['password'].setValue('123');
      component.onSignIn();
      expect(spy).toHaveBeenCalledWith('test', '123');
    }));
  });
});