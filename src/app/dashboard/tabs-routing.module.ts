import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ListarPageModule } from '../listar/listar.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'listar',
        loadChildren: () => import('../listar/listar.module').then(m => m.ListarPageModule)
      },
      {
        path: 'crear',
        loadChildren: () => import('../crear/crear.module').then(m => m.CrearPageModule)
      },    
      {
        path: '',
        redirectTo: '/dashboard/listar',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
