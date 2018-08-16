import {RouterModule} from '@angular/router';
import {ProductModule} from '@app/product/product.module';
import {SharedModule} from '@shared/modules/shared.module';
import {GoodsService} from '@shared/services/goods.service';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonService} from '@shared/services/common.service';
import {MockGoodsService} from '@shared/mock-services/mock-goods.services';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AdminModule} from '@app/admin-panel/admin/admin.module';
import {RouterTestingModule} from '@angular/router/testing';
import {CartComponent} from '@app/cart/cart.component';
import {PurchaseService} from '@shared/services/purchase.service';
import {MockPurchaseService} from '@shared/mock-services/mock-purchase.service';
import {HeaderComponent} from '@app/header/header.component';
import {ToasterService} from 'angular2-toaster';
import {AppModule} from '@app/app.module';
import {APP_BASE_HREF} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

describe('CartComponent', () => {
  let component: any;
  let fixture: ComponentFixture<CartComponent>;

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
        {provide: PurchaseService, useClass: MockPurchaseService},
        ToasterService,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CartComponent);
      component = fixture.debugElement.componentInstance;
      // fixture.detectChanges();

    });

  }));
  fit('Should create CartComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {

    fit('Should call getGoods method.', async(() => {
      const spy = spyOn(component, 'getGoods');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith();
    }));
  });

  describe('ngOnInit method', () => {

    fit('Should call formInit method.', async(() => {
      const spy = spyOn(component, 'formInit');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith();
    }));
  });

  describe('formInit method', () => {

    fit('Should call formInit method which create empty form.', async(() => {
      component.formInit();
      expect(component.orderForm.valid).toBeFalsy();
    }));
  });

  describe('getGoods method', () => {

    fit('Should call getGoods method and get data from LocalStorage.', async(() => {
      const purchaseArr = JSON.stringify({data: 'information'});
      localStorage.setItem('order', purchaseArr);
      const localData = component.getGoods();
      expect(localData).toBeTruthy();
    }));
  });

  describe('removeProduct method', () => {

    fit('Should call with index and remove element from arr by index.', async(() => {
      component.shoppingList = [1, 2, 3, 4];
      component.removeProduct(1);
      expect(component.shoppingList.length).toBe(3);
    }));
  });

  describe('removeProduct method', () => {

    fit('Should call removeProduct method.', async(() => {
      const spy = spyOn(component, 'setGoods');
      component.shoppingList = [{price: 1}, {price: 2}, {price: 3}, {price: 4}];
      component.removeProduct(1);
      expect(spy).toHaveBeenCalled();
    }));
  });

  describe('removeProduct method', () => {

    fit('Should call PurchaseService  method -> purchaseStatus.', async(() => {
      const spy = spyOn(component.purchaseService, 'purchaseStatus');
      component.shoppingList = [{price: 1}, {price: 2}, {price: 3}, {price: 4}];
      component.removeProduct(1);
      expect(spy).toHaveBeenCalled();
    }));
  });

  describe('removeProduct method', () => {

    fit('Should call  method -> getTotal.', async(() => {
      component.shoppingList = [{price: 1}, {price: 2}, {price: 3}, {price: 4}];
      expect(component.getTotal()).toBe(10);
    }));
  });
});

