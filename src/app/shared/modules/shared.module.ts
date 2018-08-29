import {NgModule} from '@angular/core';
import {AppMaterialModule} from './app-material.module';
import {FilterComponent} from '@shared/components/filter/filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FeaturePipe} from '@shared/pipes/feature.pipe';
import {ColorPipe} from '@shared/pipes/color.pipe';
import {PricePipe} from '@shared/pipes/price.pipe';

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
