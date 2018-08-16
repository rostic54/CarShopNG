import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SharedModule} from '@shared/modules/shared.module';
import {BasketIconComponent} from './basket-icon/basket-icon.component';
import {MenuComponent} from './menu/menu.component';
import {HeaderComponent} from './header.component';
import {RouterModule, Routes} from '@angular/router';
import {HeaderRoutingModule} from '@app/header/header-routing.module';

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
    HeaderRoutingModule
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
