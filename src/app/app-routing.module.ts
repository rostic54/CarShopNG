import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CartComponent} from '@app/cart/cart.component';
import {CartGuard} from '@app/cart/cart.guard';
import {HomeComponent} from '@app/home/home.component';
import {ProductComponent} from '@app/product/product.component';
import {ContactsComponent} from '@app/contacts/contacts.component';
import {AboutComponent} from '@app/about/about.component';


const AppRouts: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent, canActivate: [CartGuard]},
  {path: 'aboutUs', component: AboutComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: '**', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(AppRouts)],
  exports: [RouterModule],
  providers: [CartGuard]
})

export class AppRoutingModule {
}