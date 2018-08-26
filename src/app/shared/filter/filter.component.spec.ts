import {RouterModule} from '@angular/router';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductModule} from '@app/product/product.module';
import {SharedModule} from '../modules/shared.module';
import {ProductsService} from '../services/products.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppModule} from '@app/app.module';
import {CommonService} from '../services/common.service';
import {MockProductService} from '../mock-services/mock-products.services';
import {AppMaterialModule} from '../modules/app-material.module';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AdminModule} from '@app/admin-panel/admin/admin.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FilterComponent} from './filter.component';

describe('FilterComponent', () => {
  let component: any;
  let fixture: ComponentFixture<FilterComponent>;

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
      fixture = TestBed.createComponent(FilterComponent);
      component = fixture.debugElement.componentInstance;
      component.initForm();
      // fixture.detectChanges();

    });

  }));

  it('Should create FilterComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {

    it('Should call initForm and create valid form', async(() => {
      const spy = spyOn(component, 'initForm');
      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      expect(component.filterForm.valid).toBeTruthy();
    }));
  });

  describe('ngOnInit method', () => {

    it('Should call pushChanges', async(() => {
      const spy = spyOn(component, 'pushChanges');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    }));
  });

  describe('ngOnInit method', () => {

    it('Should create form with fields: min, max, color, feature', async(() => {
      component.initForm();
      const min = component.filterForm.controls['min'];
      const max = component.filterForm.controls['max'];
      const color = component.filterForm.controls['color'];
      const feature = component.filterForm.controls['feature'];
      expect(min.value[0]).toBe(0);
      expect(max.value[0]).toBe(0);
      expect(color.value).toBe('all');
      expect(feature.value).toBe('all');
    }));
  });

  describe('pushChanges method', () => {

    it('Should call productsService -> getFilterCondition', async(() => {
      const spy = spyOn(component.productsService, 'getFilterCondition');
      component.ngOnInit();
      component.pushChanges();
      expect(spy).toHaveBeenCalled();
    }));
  });
});
