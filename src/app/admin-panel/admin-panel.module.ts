import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/modules/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ControlPopupComponent} from './admin/control-popup/control-popup.component';
import {HttpClientModule} from '@angular/common/http';
import {AdminPanelComponent} from './admin-panel.component';
import {OrderComponent} from './order/order.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {HeaderModule} from '../header/header.module';
import {AdminComponent} from '@app/admin-panel/admin/admin.component';

@NgModule({
  declarations: [
    ControlPopupComponent,
    AdminPanelComponent,
    OrderComponent,
    AdminComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    HeaderModule,
    NgxPaginationModule,
  ],
  exports: [
  ],
  entryComponents: [
    ControlPopupComponent
  ]
})
export class AdminPanelModule {
}