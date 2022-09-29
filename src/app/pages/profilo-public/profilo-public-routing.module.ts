import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfiloPublicPage } from './profilo-public.page';

const routes: Routes = [
  {
    path: '',
    component: ProfiloPublicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfiloPublicPageRoutingModule {}
