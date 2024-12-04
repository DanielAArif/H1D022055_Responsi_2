import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResepPageRoutingModule } from './resep-routing.module';

import { ResepPage } from './resep.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResepPageRoutingModule
  ],
  declarations: [ResepPage]
})
export class ResepPageModule {}
