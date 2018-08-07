import {RouterModule, Routes} from '@angular/router';
import {AdminPanelComponent} from '@app/admin-panel/admin-panel.component';
import {AdminGuard} from '@app/admin-panel/admin/admin.guard';
import {OrderComponent} from '@app/admin-panel/order/order.component';
import {AdminComponent} from '@app/admin-panel/admin/admin.component';
import {NgModule} from '@angular/core';
import {CartGuard} from '@app/cart/cart.guard';

const headerRouts: Routes = [
  {
    path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard], children: [
      {path: '', component: AdminComponent},
      {path: 'orders', component: OrderComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(headerRouts)],
  exports: [RouterModule],
  providers: [CartGuard]
})

export class HeaderRoutingModule {

}