import {NgModule} from '@angular/core';
import {AppMaterialModule} from './app-material.module';

@NgModule({
    imports: [
        AppMaterialModule
    ],
    exports: [
        AppMaterialModule
    ]
})
export class SharedModule {
}
