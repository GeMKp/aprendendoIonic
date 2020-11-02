import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CidadePageRoutingModule } from './cidade-routing.module';

import { CidadePage } from './cidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CidadePageRoutingModule
  ],
  declarations: [CidadePage]
})
export class CidadePageModule {}
