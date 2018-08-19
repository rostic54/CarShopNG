import {RouterModule} from '@angular/router';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductModule} from '@app/product/product.module';
import {SharedModule} from '@shared/modules/shared.module';
import {GoodsService} from '@shared/services/goods.service';
import {CommonService} from '@shared/services/common.service';
import {MockGoodsService} from '@shared/mock-services/mock-goods.services';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, Inject} from '@angular/core';
import {AdminModule} from '@app/admin-panel/admin/admin.module';
import {AdminComponent} from '@app/admin-panel/admin/admin.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ControlPopupComponent} from '@app/admin-panel/admin/control-popup/control-popup.component';
import {ToasterService} from 'angular2-toaster';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Goods} from '@shared/models/goods.model';

describe('ControlPopupComponent', () => {
  let component: any;
  let fixture: ComponentFixture<ControlPopupComponent>;
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
      ],
      providers: [
        {provide: CommonService, useClass: CommonService},
        {provide: GoodsService, useClass: MockGoodsService},
        ToasterService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ControlPopupComponent);
      component = fixture.debugElement.componentInstance;

     // component.ngOnInit();
      // fixture.detectChanges();

    });

  }));
  // fit('Should create ControlPopupComponent', async(() => {
  //   expect(component).toBeTruthy();
  // }));

  // describe('ngOnInit method', () => {
  //
  //   fit('Should call getOrder method.', async(() => {
  //     const spy = spyOn(component, 'getGoods');
  //     component.ngOnInit();
  //     expect(spy).toHaveBeenCalledWith();
  //   }));
  // });
});
