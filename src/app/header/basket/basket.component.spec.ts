import {RouterModule} from '@angular/router';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductModule} from '@app/product/product.module';
import {SharedModule} from '@shared/modules/shared.module';
import {ProductsService} from '@shared/services/products.service';
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
import {BasketIconComponent} from '@app/header/basket/basket.component';

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
        {provide: ProductsService, useClass: MockGoodsService},
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(BasketIconComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
      // fixture.detectChanges();
    });

  }));

  it('Should create BasketIconComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {

    it('Should call initForm ', async(() => {
      const spy = spyOn(component, 'getBasketData');
      const order = JSON.parse(localStorage.getItem('order'));
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
      expect(component.productList).toEqual(order);
    }));
  });

  describe('ngOnInit method', () => {

    it('Should call initForm ', async(() => {
      const spy = spyOn(component, 'totalCalculate');
      const orderArr = JSON.parse(localStorage.getItem('order'));
      component.ngOnInit();
      let total = 0 ;
      orderArr.forEach( (item) => {
        total += (+item.price) * (1 - (+item.discount / 100));
      });
      expect(spy).toHaveBeenCalled();
      expect(component.total).toEqual(total);
    }));
  });

  describe('getTotalPrice method', () => {

    it('Should call total ', async(() => {
      // const spy = spyOn(component, 'getBasketData');
      const orderArr = JSON.parse(localStorage.getItem('order'));
      let total = 0 ;
      orderArr.forEach( (item) => {
        total += (+item.price) * (1 - (+item.discount / 100));
      });
      const result = component.getTotalPrice();
      expect(result).toEqual(total);
    }));
  });

  describe('rewriteLocalStor and getBasketData method', () => {

    it('Should rewrite and get data from LocalStorage', async(() => {
      // const orderArr = JSON.parse(localStorage.getItem('order'));
      const orderArr = component.getBasketData();
      orderArr.forEach( (item) => {
        item.price = (+item.price + 1 );
      });
      component.rewriteLocalStor(orderArr);
      const editedrArr = component.getBasketData();
      expect(editedrArr).toEqual(orderArr);
    }));
  });

});
