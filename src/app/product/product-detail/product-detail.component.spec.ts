import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from '@app/app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {SharedModule} from '@shared/modules/shared.module';
import {CommonService} from '@shared/services/common.service';
import {AuthService} from '@shared/services/auth.service';
import {MockAuthService} from '@shared/mock-services/mock-auth.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ProductDetailComponent} from '@app/product/product-detail/product-detail.component';
import {ProductsService} from '@shared/services/products.service';
import {PurchaseService} from '@shared/services/purchase.service';
import {goods, MockGoodsService} from '@shared/mock-services/mock-goods.services';
import {MockPurchaseService} from '@shared/mock-services/mock-purchase.service';
import {RouterTestingModule} from '../../../../node_modules/@angular/router/testing';
import {RouterModule} from '@angular/router';

describe('AppComponent', () => {
  let component: any;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AppMaterialModule,
        RouterModule,
        SharedModule,
      ],
      providers: [
        {provide: CommonService, useClass: CommonService},
        {provide: ProductsService, useClass: MockGoodsService},
        {provide: PurchaseService, useClass: MockPurchaseService}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductDetailComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
      // fixture.detectChanges();

    });

  }));

  it('Should create ProductDetailComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ProductDetailComponent', () => {
    it('ngOnInit call  method getGoods.', async(() => {
      const spy = spyOn(component.goodsService, 'getGoods');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    }));
  });

  describe('ProductDetailComponent', () => {
    it('ngOnInit call  method getGoods.', async(() => {
      component.ngOnInit();
      expect(component.goodsList[0]).toEqual(goods);
    }));
  });

  describe('ProductDetailComponent', () => {
    it('addToCart call method addProduct with product.', async(() => {
      const spy = spyOn(component.purchaseService, 'addProduct');
      component.addToCart(goods);
      expect(spy).toHaveBeenCalledWith(goods);
    }));
  });

  describe('returnToProducts method', () => {

    it('Should navigate to \' ../\'', async(() => {
      const spy = spyOn(component.router, 'navigate');
      component.returnToProducts();
      expect(spy).toHaveBeenCalledWith(['../'], {relativeTo: component.activateRoute});
    }));
  });
});