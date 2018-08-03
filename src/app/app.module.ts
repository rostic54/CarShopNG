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
import {AuthService} from './shared/services/auth.service';
import {AppService} from './shared/services/app.service';
import {GoodsService} from './shared/services/goods.service';
import {AdminModule} from './admin-panel/admin/admin.module';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {PurchaseService} from './shared/services/purchase.service';
import { CartComponent } from './cart/cart.component';
import {HomeComponent} from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { OrderComponent } from './admin-panel/order/order.component';
import {AdminGuard} from './admin-panel/admin/admin.guard';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

const AppRouts: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'aboutUs', component: AboutComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: '**', component: HomeComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CartComponent,
    AdminPanelComponent,
    OrderComponent,
    AboutComponent,
    ContactsComponent
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA6pkG4fkv1K0dxPXOvBOQWE4ZaB_2H6y4'
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [
    AuthService,
    AppService,
    GoodsService,
    ToasterService,
    PurchaseService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
