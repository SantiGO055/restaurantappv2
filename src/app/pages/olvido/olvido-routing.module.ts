import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlividoPage } from './olvido.page';

const routes: Routes = [
  {
    path: '',
    component: OlividoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlividoPageRoutingModule {}
