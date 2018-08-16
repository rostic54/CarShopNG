import {RouterModule} from '@angular/router';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductModule} from '@app/product/product.module';
import {SharedModule} from '@shared/modules/shared.module';
import {GoodsService} from '@shared/services/goods.service';
import {CommonService} from '@shared/services/common.service';
import {MockGoodsService} from '@shared/mock-services/mock-goods.services';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AdminModule} from '@app/admin-panel/admin/admin.module';
import {AdminComponent} from '@app/admin-panel/admin/admin.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AdditionPopupComponent} from '@app/admin-panel/admin/addition-popup/addition-popup.component';

describe('AdditionPopupComponent', () => {
  let component: any;
  let fixture: ComponentFixture<AdditionPopupComponent>;
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
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AdditionPopupComponent);
      component = fixture.debugElement.componentInstance;

      // fixture.detectChanges();

    });

  }));
  // it('Should create AdditionPopupComponent', async(() => {
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
