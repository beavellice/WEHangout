import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AggiungiEventoPageRoutingModule } from './aggiungi-evento-routing.module';

import { AggiungiEventoPage } from './aggiungi-evento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AggiungiEventoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AggiungiEventoPage]
})
export class AggiungiEventoPageModule {}
