import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventiMenuPageRoutingModule } from './eventi-menu-routing.module';

import { EventiMenuPage } from './eventi-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventiMenuPageRoutingModule
  ],
  declarations: [EventiMenuPage]
})
export class EventiMenuPageModule {}
