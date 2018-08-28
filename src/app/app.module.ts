import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {SliderModule} from 'ngx-slider';

import {AppComponent} from './app.component';
import {HeaderModule} from './header/header.module';
import {ProductModule} from './product/product.module';
import {FooterComponent} from './footer/footer.component';
import {SharedModule} from '@shared/modules/shared.module';
import {AuthService} from '@shared/services/auth.service';
import {ProductsService} from '@shared/services/products.service';
import {AdminModule} from './admin-panel/admin/admin.module';
import { CartComponent } from './cart/cart.component';
import {AdminGuard} from './admin-panel/admin/admin.guard';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import {CartGuard} from './cart/cart.guard';
import {AdminPanelModule} from './admin-panel/admin-panel.module';
import {AppRoutingModule} from '@app/app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CartComponent,
    AboutComponent,
    ContactsComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    HeaderModule,
    ProductModule,
    AdminModule,
    AdminPanelModule,
    AppRoutingModule,
    SliderModule,
    ToasterModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDm1BYCuRhX5Y9Viy5lyi91gH6CtyW-Aj0'
    }),
     AgmSnazzyInfoWindowModule
  ],
  providers: [
    AuthService,
    ProductsService,
    ToasterService,
    AdminGuard,
    CartGuard,
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
