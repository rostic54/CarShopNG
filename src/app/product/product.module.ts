import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ProductComponent} from './product.component';
import {GoodsListComponent} from './goods-list/goods-list.component';
import {SharedModule} from '@shared/modules/shared.module';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ColorPipe} from '@shared/pipe/color.pipe';
import {FeaturePipe} from '@shared/pipe/feature.pipe';
import {PricePipe} from '@shared/pipe/price.pipe';
import {ProductRoutingModule} from '@app/product/product-routing.module';


@NgModule({
  declarations: [
    ProductComponent,
    GoodsListComponent,
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
