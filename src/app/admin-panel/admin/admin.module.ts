import {NgModule} from '@angular/core';
import {SharedModule} from '@app/shared/modules/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminComponent} from './admin.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {AdminPanelModule} from '../admin-panel.module';

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    AdminPanelModule,
    NgxPaginationModule,
  ],
  exports: [
    AdminComponent
   ]
})
export class AdminModule {
}