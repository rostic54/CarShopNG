import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from '@app/app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {SharedModule} from '@shared/modules/shared.module';
import {CommonService} from '@shared/services/common.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ProductDetailComponent} from '@app/product/product-detail/product-detail.component';
import {ProductsService} from '@shared/services/products.service';
import {product, MockProductService} from '@shared/mock-services/mock-products.services';
import {RouterTestingModule} from '@angular/router/testing';
import {RouterModule} from '@angular/router';

describe('ProductDetailComponent', () => {
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
        {provide: ProductsService, useClass: MockProductService}
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
      const spy = spyOn(component.productsService, 'getGoods');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    }));
  });

  describe('ProductDetailComponent', () => {
    it('ngOnInit call  method getGoods.', async(() => {
      component.ngOnInit();
      expect(component.productsList[0]).toEqual(product);
    }));
  });

  describe('ProductDetailComponent', () => {
    it('addToBasket call method addToBasket with product.', async(() => {
      const spy = spyOn(component.productsService, 'addToBasket');
      component.addToCart(product);
      expect(spy).toHaveBeenCalledWith(product);
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