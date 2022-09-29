import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguitiPage } from './seguiti.page';

const routes: Routes = [
  {
    path: '',
    component: SeguitiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguitiPageRoutingModule {}
