import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguitiPageRoutingModule } from './seguiti-routing.module';

import { SeguitiPage } from './seguiti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguitiPageRoutingModule
  ],
  declarations: [SeguitiPage]
})
export class SeguitiPageModule {}
