import {RouterModule} from '@angular/router';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductModule} from '@app/product/product.module';
import {SharedModule} from '@shared/modules/shared.module';
import {GoodsService} from '@shared/services/goods.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppModule} from '@app/app.module';
import {CommonService} from '@shared/services/common.service';
import {MockGoodsService} from '@shared/mock-services/mock-goods.services';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AdminModule} from '@app/admin-panel/admin/admin.module';
import {FilterComponent} from '@shared/filter/filter.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BasketIconComponent} from '@app/header/basket-icon/basket-icon.component';

describe('BasketIconComponent', () => {
  let component: any;
  let fixture: ComponentFixture<BasketIconComponent>;

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
        {provide: GoodsService, useClass: MockGoodsService},
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(BasketIconComponent);
      component = fixture.debugElement.componentInstance;
      component.initForm();
      // fixture.detectChanges();

    });

  }));
  //
  // fit('Should create BasketIconComponent', async(() => {
  //   expect(component).toBeTruthy();
  // }));

  // describe('ngOnInit method', () => {
  //
  //   fit('Should call initForm ', async(() => {
  //     const spy = spyOn(component, 'getBasketData');
  //     const order = JSON.parse(localStorage.getItem('order'));
  //     component.ngOnInit();
  //     console.log(spy);
  //     expect(spy).toHaveBeenCalled();
  //     expect(component.productList).toBe(order);
  //   }));
  // });
});
