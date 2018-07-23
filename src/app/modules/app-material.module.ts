import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule,MatButtonModule, MatCardModule, MatFormFieldModule} from "@angular/material";

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule

  ],
  exports: [
    BrowserAnimationsModule
  ]
})
export class AppMaterialModule {
}
