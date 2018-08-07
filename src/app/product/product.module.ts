import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import {ProductComponent} from './product.component';
import {GoodsListComponent} from './goods-list/goods-list.component';
import {FilterComponent} from '../filter/filter.component';
import {SharedModule} from '../modules/shared.module';
import {SingleProductComponent} from './single-product/single-product.component';
import {ColorPipe} from '@shared/pipe/color.pipe';
import {FeaturePipe} from '@shared/pipe/feature.pipe';
import {PricePipe} from '@shared/pipe/price.pipe';
import {ProductRoutingModule} from '@app/product/product-routing.module';


@NgModule({
  declarations: [
    FilterComponent,
    ProductComponent,
    GoodsListComponent,
    SingleProductComponent,
    ColorPipe,
    PricePipe,
    FeaturePipe
  ],
  imports: [
    SharedModule,
    FormsModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports: [
    RouterModule
  ]

})

export class ProductModule {
}
