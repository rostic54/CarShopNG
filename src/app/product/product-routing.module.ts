import {RouterModule, Routes} from '@angular/router';
import {ProductsListComponent} from '@app/product/products-list/products-list.component';
import {ProductComponent} from '@app/product/product.component';
import {ProductDetailComponent} from '@app/product/product-detail/product-detail.component';
import {NgModule} from '@angular/core';

const ProductRouts: Routes = [
  {
    path: 'products', component: ProductComponent, children: [
      {path: '', component: ProductsListComponent},
      {path: ':id', component: ProductDetailComponent}
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(ProductRouts)],
  exports: [RouterModule]
})
export class ProductRoutingModule {

}