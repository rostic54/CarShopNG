import {NgModule} from '@angular/core';
import {FilterComponent} from '../filter/filter.component';
import {HomeComponent} from './home.component';
import {GoodsListComponent} from './goods-list/goods-list.component';
import {SharedModule} from '../modules/shared.module';
import {SingleProductComponent} from './single-product/single-product.component';
import {RouterModule, Routes} from '@angular/router';
import {PricePipe} from '../shared/pipe/price.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {ColorPipe} from '../shared/pipe/color.pipe';
import {FeaturePipe} from '../shared/pipe/feature.pipe';

const AppRouts: Routes = [
  {
    path: 'products', component: HomeComponent, children: [
      {path: '', component: GoodsListComponent},
      {path: ':id', component: SingleProductComponent}
    ],
  }];


@NgModule({
  declarations: [
    FilterComponent,
    HomeComponent,
    GoodsListComponent,
    SingleProductComponent,
    ColorPipe,
    PricePipe,
    FeaturePipe
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild(AppRouts)
  ],
  exports: [
    RouterModule
  ]

})

export class HomeModule {
}
