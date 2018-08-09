import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {SliderModule} from 'ngx-slider';

import {AppComponent} from './app.component';
import {HeaderModule} from './header/header.module';
import {ProductModule} from './product/product.module';
import {FooterComponent} from './footer/footer.component';
import {SharedModule} from './modules/shared.module';
import {AuthService} from '@shared/services/auth.service';
import {AppService} from '@shared/services/app.service';
import {GoodsService} from '@shared/services/goods.service';
import {AdminModule} from './admin-panel/admin/admin.module';
import {PurchaseService} from '@shared/services/purchase.service';
import { CartComponent } from './cart/cart.component';
import {ProductComponent} from './product/product.component';
import {AdminGuard} from './admin-panel/admin/admin.guard';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import {CartGuard} from './cart/cart.guard';
import {AdminPanelModule} from './admin-panel/admin-panel.module';
import {AppRoutingModule} from '@app/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CartComponent,
    AboutComponent,
    ContactsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductModule,
    HeaderModule,
    AdminModule,
    AdminPanelModule,
    AppRoutingModule,
    SliderModule,
    SharedModule,
    ToasterModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDm1BYCuRhX5Y9Viy5lyi91gH6CtyW-Aj0'
    }),
     AgmSnazzyInfoWindowModule
  ],
  providers: [
    AuthService,
    AppService,
    GoodsService,
    ToasterService,
    PurchaseService,
    AdminGuard,
    CartGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
