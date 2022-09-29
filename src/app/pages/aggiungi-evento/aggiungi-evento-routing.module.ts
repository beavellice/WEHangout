import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AggiungiEventoPage } from './aggiungi-evento.page';

const routes: Routes = [
  {
    path: '',
    component: AggiungiEventoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AggiungiEventoPageRoutingModule {}
