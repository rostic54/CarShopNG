import {NgModule} from '@angular/core';
import {SharedModule} from '../modules/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdditionPopupComponent} from './admin/addition-popup/addition-popup.component';
import {AdminComponent} from './admin/admin.component';
import {HttpClientModule} from '@angular/common/http';
import {AdminPanelComponent} from './admin-panel.component';
import {OrderComponent} from './order/order.component';

@NgModule({
  declarations: [
    AdditionPopupComponent,
    AdminComponent,
    OrderComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AdminModule
  ],
  exports: [
    AdminPanelComponent
  ],
  entryComponents: [
    AdditionPopupComponent
  ]
})
export class AdminModule {
}