import {async, ComponentFixture, TestBed} from '../../../../node_modules/@angular/core/testing';
import {AdminComponent} from '@app/admin-panel/admin/admin.component';
import {RouterTestingModule} from '../../../../node_modules/@angular/router/testing';
import {HttpClientModule} from '../../../../node_modules/@angular/common/http';
import {AdminModule} from '@app/admin-panel/admin/admin.module';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@shared/modules/shared.module';
import {ProductModule} from '@app/product/product.module';
import {CommonService} from '@shared/services/common.service';
import {ProductsService} from '@shared/services/products.service';
import {MockProductService} from '@shared/mock-services/mock-products.services';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SignUpComponent} from '@app/header/sign-up/sign-up.component';
import {AuthService} from '@shared/services/auth.service';
import {MockAuthService} from '@shared/mock-services/mock-auth.service';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {AppModule} from '@app/app.module';

describe('SignUpComponent', () => {
  let component: any;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AdminModule,
        AppMaterialModule,
        RouterModule,
        SharedModule,
        ProductModule,
        AppModule
      ],
      providers: [
        {provide: CommonService, useClass: CommonService},
        {provide: ProductsService, useClass: MockProductService},
        {provide: AuthService, useClass: MockAuthService},
        ToasterService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SignUpComponent);
      component = fixture.debugElement.componentInstance;
      // fixture.detectChanges();

    });

  }));
  it('Should create SignUpComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('SignUpComponent -> ngOnInit method', () => {

    it('Should call initForm method.', async(() => {
      const spy = spyOn(component, 'initForm');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    }));
  });

  describe('SignUpComponent -> ngOnInit method', () => {

    it('Should create signUp form.', async(() => {
      component.ngOnInit();
      const email = component.signUp.controls['email'];
      const name = component.signUp.controls['name'];
      const passwordFormGroup = component.signUp.controls['passwordFormGroup'];
      const password = passwordFormGroup.controls['password'];
      const password2 = passwordFormGroup.controls['password2'];
      expect(email.valid).toBeFalsy();
      expect(name.valid).toBeFalsy();
      expect(password.valid).toBeFalsy();
      expect(password2.valid).toBeFalsy();
    }));
  });

});