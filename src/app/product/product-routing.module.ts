import {RouterModule, Routes} from '@angular/router';
import {GoodsListComponent} from '@app/product/goods-list/goods-list.component';
import {ProductComponent} from '@app/product/product.component';
import {SingleProductComponent} from '@app/product/product-detail/single-product.component';
import {NgModule} from '@angular/core';

const ProductRouts: Routes = [
  {
    path: 'products', component: ProductComponent, children: [
      {path: '', component: GoodsListComponent},
      {path: ':id', component: SingleProductComponent}
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(ProductRouts)],
  exports: [RouterModule]
})
export class ProductRoutingModule {

}