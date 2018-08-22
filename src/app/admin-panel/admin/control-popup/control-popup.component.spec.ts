import {RouterModule} from '@angular/router';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductModule} from '@app/product/product.module';
import {SharedModule} from '@shared/modules/shared.module';
import {ProductsService} from '@shared/services/products.service';
import {CommonService} from '@shared/services/common.service';
import {goods, MockGoodsService} from '@shared/mock-services/mock-goods.services';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AdminModule} from '@app/admin-panel/admin/admin.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ControlPopupComponent} from '@app/admin-panel/admin/control-popup/control-popup.component';
import {ToasterConfig, ToasterContainerComponent, ToasterModule, ToasterService} from 'angular2-toaster';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppModule} from '@app/app.module';
import {AppComponent} from '@app/app.component';


describe('ControlPopupComponent', () => {
  let component: any;
  let fixture: ComponentFixture<ControlPopupComponent>;
  // let fixtureApp: ComponentFixture<AppComponent>;
  // let toasterService: ToasterService,
  //   toasterContainer: ToasterContainerComponent;
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
        AppModule,
        ToasterModule
      ],
      providers: [
        {provide: CommonService, useClass: CommonService},
        {provide: ProductsService, useClass: MockGoodsService},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {obj: goods, index: goods.id}},
        ToasterService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ControlPopupComponent);
      // fixtureApp = TestBed.createComponent(AppComponent);
      component = fixture.debugElement.componentInstance;
      // toasterContainer = fixtureApp.debugElement.children[1].componentInstance;
      // toasterService = fixture.componentInstance.toasterService;
      component.ngOnInit();
      // fixture.detectChanges();
    });
  }));

  it('Should create ControlPopupComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {

    it('Set data to product and index', async(() => {
      component.ngOnInit();
      expect(component.product).toEqual(goods);
      expect(component.index).toBe(goods.id);
    }));
  });

  describe('ngOnInit method', () => {

    it('Should call initForm method', async(() => {
      const spy = spyOn(component, 'initForm');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    }));
  });

  describe('initForm method', () => {

    it('Should create form addGoodsForm', async(() => {
      component.initForm();
      const brande = component.addGoodsForm.controls['brande'];
      const modelName = component.addGoodsForm.controls['modelName'];
      const power = component.addGoodsForm.controls['power'];
      const color = component.addGoodsForm.controls['color'];
      const feature = component.addGoodsForm.controls['feature'];
      const url = component.addGoodsForm.controls['url'];
      const description = component.addGoodsForm.controls['description'];
      const price = component.addGoodsForm.controls['price'];
      const discount = component.addGoodsForm.controls['discount'];

      expect(brande.valid).toBeTruthy();
      expect(modelName.valid).toBeTruthy();
      expect(power.valid).toBeTruthy();
      expect(color.valid).toBeTruthy();
      expect(feature.valid).toBeTruthy();
      expect(url.valid).toBeTruthy();
      expect(description.valid).toBeTruthy();
      expect(price.valid).toBeTruthy();
      expect(discount.valid).toBeTruthy();
    }));
  });

  describe('getKey method', () => {

    it('Should get key or \'\'', async(() => {
      const result = component.getKey('brande');
      expect(component.product['brande']).toEqual(result);
    }));
  });

  describe('cleanUpForm method', () => {

    it('Should clean up form addGoodsForm', async(() => {
      component.cleanUpForm();
      expect(component.addGoodsForm.dirty).toBe(false);

    }));
  });

  describe('deleteProduct method', () => {

    it('Should call goodsService -> deleteProduct', async(() => {
      const spyToaster = spyOn(component.toasterService, 'pop');
      const spy = spyOn(component.goodsService, 'deleteProduct');
      component.ngOnInit();
      component.index = 3;
      component.deleteProduct();
      expect(spyToaster).toHaveBeenCalledWith('error', 'The product was deleted');
      expect(spy).toHaveBeenCalledWith(3);

    }));
  });

  describe('modifyProductsList method', () => {

    it('Should remove element form goods array', async(() => {
      component.productsList = [goods, goods, goods];
      component.modifyProductsList({name: 'goods'}, 1);
      expect(component.productsList[1]).toEqual({name: 'goods'});

    }));
  });

  describe('onAddGoods method', () => {

    it('Should set to productsList the product array from goodsService', async(() => {
      const spyToaster = spyOn(component.toasterService, 'pop');
      const spyAddGoods = spyOn(component.goodsService, 'addGoods');
      component.onAddGoods();
      expect(component.productsList.length).toEqual(2);
      expect(spyToaster).toHaveBeenCalledWith('success', 'The changes\'s saved', 'You\'ve recently done some changes!');
      expect(spyAddGoods).toHaveBeenCalledWith(component.productsList);
    }));
  });
});
