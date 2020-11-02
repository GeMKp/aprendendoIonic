import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CidadePage } from './cidade.page';

const routes: Routes = [
  {
    path: '',
    component: CidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CidadePageRoutingModule {}
