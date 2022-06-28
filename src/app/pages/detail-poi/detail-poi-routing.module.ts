import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPoiPage } from './detail-poi.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPoiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPoiPageRoutingModule {}
