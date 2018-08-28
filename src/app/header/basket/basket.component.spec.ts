import {RouterModule} from '@angular/router';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductModule} from '@app/product/product.module';
import {SharedModule} from '@shared/modules/shared.module';
import {ProductsService} from '@shared/services/products.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppModule} from '@app/app.module';
import {CommonService} from '@shared/services/common.service';
import {MockProductService} from '@shared/mock-services/mock-products.services';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AdminModule} from '@app/admin-panel/admin/admin.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BasketComponent} from '@app/header/basket/basket.component';

describe('BasketComponent', () => {
  let component: any;
  let fixture: ComponentFixture<BasketComponent>;

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
        {provide: ProductsService, useClass: MockProductService},
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(BasketComponent);
      component = fixture.debugElement.componentInstance;
    });
  }));

  it('Should create BasketComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {

    it('Should call dataLocalStorage ', async(() => {
      console.log(component.productList);
      const spy = spyOn(component, 'getBasketData');
      const spyCalcul = spyOn(component, 'totalCalculate');
      const spyRewrite = spyOn(component, 'rewriteLocalStor');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
      expect(spyCalcul).toHaveBeenCalled();
      expect(component.productList.length).toEqual(3);
      expect(spyRewrite).toHaveBeenCalledWith(component.productList);
    }));
  });

  describe('ngOnInit method', () => {

    it('Should call initForm ', async(() => {
      const spy = spyOn(component, 'totalCalculate');
      const orderArr = JSON.parse(localStorage.getItem('order'));
      component.ngOnInit();
      let total = 0;
      orderArr.forEach( (item) => {
        total += (+item.price) * (1 - (+item.discount / 100));
      });
      expect(spy).toHaveBeenCalled();
      expect(component.total).toEqual(total);
    }));
  });

  describe('rewriteLocalStor and getBasketData method', () => {

    it('Should rewrite and get data from LocalStorage', async(() => {
      const orderArr = component.getBasketData();
      const spy = spyOn(component.productsService, 'setLocalStorage');
      orderArr.forEach( (item) => {
        item.price = (+item.price + 1 );
      });
      component.rewriteLocalStor(orderArr);
      expect(spy).toHaveBeenCalledWith(orderArr);
    }));
  });

});
