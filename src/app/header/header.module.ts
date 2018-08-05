import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SharedModule} from '../modules/shared.module';
import {BasketIconComponent} from './basket-icon/basket-icon.component';
import {MenuComponent} from './menu/menu.component';
import {HeaderComponent} from './header.component';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '../admin-panel/admin/admin.component';
import {OrderComponent} from '../admin-panel/order/order.component';
import {AdminPanelComponent} from '../admin-panel/admin-panel.component';
import {AdminGuard} from '../admin-panel/admin/admin.guard';

const AppRouts: Routes = [
  {
    path: 'admin', component: AdminPanelComponent, canActivate:  [AdminGuard], children: [
      {path: '', component: AdminComponent},
      {path: 'orders', component: OrderComponent}
    ]
  },
];

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    BasketIconComponent,
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(AppRouts)
  ],
  exports: [
    HeaderComponent,
    RouterModule
  ],
  entryComponents: [
    SignUpComponent,
    SignInComponent
  ]
})
export class HeaderModule {
}
