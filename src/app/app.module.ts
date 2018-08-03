import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {HeaderModule} from './header/header.module';
import {HomeModule} from './home/home.module';
import {FooterComponent} from './footer/footer.component';
import {SharedModule} from './modules/shared.module';
import {AuthService} from './shared/auth.service';
import {AppService} from './shared/app.service';
import {GoodsService} from './shared/goods.service';
import {AdminModule} from './admin-panel/admin/admin.module';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {PurchaseService} from './shared/purchase.service';
import { CartComponent } from './cart/cart.component';
import {HomeComponent} from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { OrderComponent } from './admin-panel/order/order.component';

const AppRouts: Routes = [
  {path: 'cart', component: CartComponent},
  {path: '**', component: HomeComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CartComponent,
    AdminPanelComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeModule,
    HeaderModule,
    AdminModule,
    SharedModule,
    RouterModule.forRoot(AppRouts),
    ToasterModule.forRoot(),
  ],
  providers: [
    AuthService,
    AppService,
    GoodsService,
    ToasterService,
    PurchaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
