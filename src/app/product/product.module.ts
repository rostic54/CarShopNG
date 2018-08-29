import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {ProductComponent} from './product.component';
import {ProductsListComponent} from './products-list/products-list.component';
import {SharedModule} from '@shared/modules/shared.module';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductRoutingModule} from '@app/product/product-routing.module';


@NgModule({
  declarations: [
    ProductComponent,
    ProductsListComponent,
    ProductDetailComponent,
  ],
  imports: [
    SharedModule,
    ProductRoutingModule,
    NgxPaginationModule
  ],
  exports: [
    RouterModule
  ]

})

export class ProductModule {
}
