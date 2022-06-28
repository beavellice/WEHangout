import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPoiPageRoutingModule } from './detail-poi-routing.module';

import { DetailPoiPage } from './detail-poi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPoiPageRoutingModule
  ],
  declarations: [DetailPoiPage]
})
export class DetailPoiPageModule {}
