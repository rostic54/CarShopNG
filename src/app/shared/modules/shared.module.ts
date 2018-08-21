import {NgModule} from '@angular/core';
import {AppMaterialModule} from './app-material.module';
import {FilterComponent} from '@shared/filter/filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FeaturePipe} from '@shared/pipe/feature.pipe';
import {ColorPipe} from '@shared/pipe/color.pipe';
import {PricePipe} from '@shared/pipe/price.pipe';

@NgModule({
  declarations: [
    FilterComponent,
    ColorPipe,
    PricePipe,
    FeaturePipe
  ],
  imports: [
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AppMaterialModule,
    FilterComponent,
    ColorPipe,
    PricePipe,
    FeaturePipe
  ]
})
export class SharedModule {
}
