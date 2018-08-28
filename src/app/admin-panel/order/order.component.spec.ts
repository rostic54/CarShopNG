import {MockProductService} from '@shared/mock-services/mock-products.services';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {CommonService} from '@shared/services/common.service';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@shared/modules/shared.module';
import {ProductModule} from '@app/product/product.module';
import {ProductsService} from '@shared/services/products.service';
import {OrderComponent} from '@app/admin-panel/order/order.component';
import {AdminModule} from '@app/admin-panel/admin/admin.module';
import {AppModule} from '@app/app.module';

describe('OrderComponent', () => {
  let component: any;
  let fixture: ComponentFixture<OrderComponent>;

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
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(OrderComponent);
      component = fixture.debugElement.componentInstance;
      // fixture.detectChanges();

    });

  }));
  it('Should create GoodsListComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method calling getOrder()', () => {

    it('Should call getOrder method.', async(() => {
      const spy = spyOn(component.productsService, 'getOrder');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith();
    }));
  });

  describe('Calling and passing data in getOrders()', () => {

    it('Should call getOrders method.', async(() => {
      const order = component.productsService.getOrder().value;
      component.getOrders(order);
      expect(component.productsList.length).toBe(1);
    }));
  });

});
