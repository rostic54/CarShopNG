import {NgModule} from '@angular/core';
import {SharedModule} from '../modules/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdditionPopupComponent} from './admin/addition-popup/addition-popup.component';
import {HttpClientModule} from '@angular/common/http';
import {AdminPanelComponent} from './admin-panel.component';
import {OrderComponent} from './order/order.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {HeaderModule} from '../header/header.module';

@NgModule({
  declarations: [
    AdditionPopupComponent,
    AdminPanelComponent,
    OrderComponent
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
    AdditionPopupComponent
  ]
})
export class AdminPanelModule {
}