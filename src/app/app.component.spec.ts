import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {ProductModule} from '@app/product/product.module';
import {ProductDetailComponent} from '@app/product/product-detail/product-detail.component';
import {CommonService} from '@shared/services/common.service';
import {ProductComponent} from '@app/product/product.component';
import {HttpClientModule} from '@angular/common/http';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {SharedModule} from '@shared/modules/shared.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {GoodsListComponent} from '@app/product/goods-list/goods-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from '@app/app.component';
import {AuthService} from '@shared/services/auth.service';
import {MockAuthService} from '@shared/mock-services/mock-auth.service';

describe('AppComponent', () => {
  let component: any;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AppMaterialModule,
        RouterModule,
        SharedModule,
      ],
      providers: [
        {provide: CommonService, useClass: CommonService},
        {provide: AuthService, useClass: MockAuthService}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.debugElement.componentInstance;
      // component.ngOnInit();
      // fixture.detectChanges();

    });

  }));

  fit('Should create AppComponent', async(() => {
    expect(component).toBeTruthy();
  }));
  //
  // describe('AppComponent', () => {
  //   fit('ngOnInit call  method.', async(() => {
  //     console.log(component);
  //     // const spy = spyOn(component.authService, 'authInit');
  //     //
  //     // expect(spy).toHaveBeenCalledWith();
  //   }));
  // });

});