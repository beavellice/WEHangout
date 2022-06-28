import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfiloPublicPageRoutingModule } from './profilo-public-routing.module';

import { ProfiloPublicPage } from './profilo-public.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfiloPublicPageRoutingModule
  ],
  declarations: [ProfiloPublicPage]
})
export class ProfiloPublicPageModule {}
