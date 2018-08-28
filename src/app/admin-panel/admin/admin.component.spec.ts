import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '@shared/modules/shared.module';
import {ProductModule} from '@app/product/product.module';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonService} from '@shared/services/common.service';
import {ProductsService} from '@shared/services/products.service';
import {HttpClientModule} from '@angular/common/http';
import {product, MockProductService} from '@shared/mock-services/mock-products.services';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AdminModule} from '@app/admin-panel/admin/admin.module';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {AdminComponent} from '@app/admin-panel/admin/admin.component';
import {AppModule} from '@app/app.module';

describe('AdminComponent', () => {
  let component: any;
  let fixture: ComponentFixture<AdminComponent>;

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
      fixture = TestBed.createComponent(AdminComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
      // fixture.detectChanges();

    });

  }));
  it('Should create AdminComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {

    it('Should call getOrder method.', async(() => {
      const spy = spyOn(component, 'getGoods');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith();
    }));
  });

  describe('getGoods method', () => {

    it('Should call getGoods method in ProductsService', async(() => {
      const spy = spyOn(component.productsService, 'getGoods');
      component.getGoods();
      expect(spy).toHaveBeenCalledWith();
    }));
  });

  describe('getGoods method', () => {

    it('Show popUp form for adding new product', async(() => {
      const spy = spyOn(component.dialog, 'open');
      const params = {
        width: '450px',
        data: null
      };
      component.addToServer();
      expect(spy).toHaveBeenCalledWith(jasmine.any(Function), params);
    }));
  });

  describe('getGoods method', () => {

    it('Show popUp form for edit a product', async(() => {
      const spy = spyOn(component.dialog, 'open');
      const index = 1;
      const goodsList = [product, product];
      component.productsList = goodsList;
      const params = {
        width: '450px',
        data: {obj: goodsList[index], index: index}
      };

      component.modifyProduct(index);
      expect(spy).toHaveBeenCalledWith(jasmine.any(Function), params);
    }));
  });

  describe('goToOrderList method', () => {

    it('Should navigate to \' Orders\'', async(() => {
      const spy = spyOn(component.router, 'navigate');
      component.goToOrderList();
      expect(spy).toHaveBeenCalledWith(['orders'], {relativeTo: component.activeRoute});
    }));
  });

});
