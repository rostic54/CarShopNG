import {goods, MockGoodsService, user} from '@shared/mock-services/mock-goods.services';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {CommonService} from '@shared/services/common.service';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@shared/modules/shared.module';
import {ProductModule} from '@app/product/product.module';
import {GoodsService} from '@shared/services/goods.service';
import {OrderComponent} from '@app/admin-panel/order/order.component';
import {AdminModule} from '@app/admin-panel/admin/admin.module';
import {Goods} from '@shared/models/goods.model';
import {User} from '@shared/models/user.model';

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
        // ReactiveFormsModule,
        SharedModule,
        ProductModule,
      ],
      providers: [
        {provide: CommonService, useClass: CommonService},
        {provide: GoodsService, useClass: MockGoodsService},
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
      const spy = spyOn(component.goodsService, 'getOrder');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith();
    }));
  });

  describe('Calling and passing data in getOrders()', () => {

    it('Should call getOrders method.', async(() => {
      const order = component.goodsService.getOrder().value;
      component.getOrders(order);
      expect(component.productsList.length).toBe(1);
    }));
  });

});
