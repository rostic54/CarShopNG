import {GoodsListComponent} from '@app/product/goods-list/goods-list.component';
import {goods, MockGoodsService} from '@shared/mock-services/mock-goods.services';
import {PurchaseService} from '@shared/services/purchase.service';
import {MockPurchaseService} from '@shared/mock-services/mock-purchase.service';
import {async, TestBed, ComponentFixture} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

import {CommonService} from '@shared/services/common.service';
import {SharedModule} from '@shared/modules/shared.module';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {ProductModule} from '@app/product/product.module';
import {ProductsService} from '@shared/services/products.service';
import { RouterModule} from '@angular/router';
import {ProductComponent} from '@app/product/product.component';
import {ProductDetailComponent} from '@app/product/product-detail/product-detail.component';

describe('GoodsListComponent', () => {
  let component: any;
  let fixture: ComponentFixture<GoodsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AppMaterialModule,
        RouterModule,
        SharedModule,
        ProductModule,
        RouterTestingModule.withRoutes([
          {
            path: 'products', component: ProductComponent, children: [
              {path: '', component: GoodsListComponent},
              {path: ':id', component: ProductDetailComponent},
            ],
          }
        ])
      ],
      providers: [
        {provide: CommonService, useClass: CommonService},
        {provide: ProductsService, useClass: MockGoodsService},
        {provide: PurchaseService, useClass: MockPurchaseService},
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GoodsListComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
      // fixture.detectChanges();

    });

  }));

  it('Should create GoodsListComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {
    it('Should call getGoods method.', async(() => {
      const spy = spyOn(component.goodsService, 'getGoods');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith();
    }));
  });

  describe('ShowProductDescription method', () => {
    it ('Should relocate to product/:id', async(() => {
      const spy = spyOn(component.router, 'navigate');
      component.showProductDescription(goods);
      expect(spy).toHaveBeenCalledWith([goods.id], {relativeTo: component.activeRoute});
    }));
  });

  it('Check passing data to addToCart', async(() => {
    const spy = spyOn(component, 'addToCart');
    component.addToCart(123);
    expect(spy).toHaveBeenCalledWith(123);
  }));
});
