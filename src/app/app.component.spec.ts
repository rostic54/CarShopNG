import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonService} from '@shared/services/common.service';
import {HttpClientModule} from '@angular/common/http';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {SharedModule} from '@shared/modules/shared.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppComponent} from '@app/app.component';
import {AuthService} from '@shared/services/auth.service';
import {MockAuthService} from '@shared/mock-services/mock-auth.service';

describe('AppComponent', () => {
  let component: any;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientModule,
        AppMaterialModule,
        SharedModule,
      ],
      providers: [
        {provide: CommonService, useClass: CommonService},
        {provide: AuthService, useClass: MockAuthService}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
    });

  }));

  it('Should create AppComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('AppComponent', () => {
    it('ngOnInit call  method.', async(() => {
      const spy = spyOn(component.authService, 'authInit');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    }));
  });
});