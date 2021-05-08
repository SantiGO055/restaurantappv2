import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [  
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),    
    canLoad:[AutoLoginGuard],
  },    
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canLoad:[AutoLoginGuard],
  },  
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/tabs.module').then(m => m.TabsPageModule),
    canLoad:[AuthGuard],
  },
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'avatar',
    loadChildren: () => import('./avatar/avatar.module').then( m => m.AvatarPageModule)
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./qrcode/qrcode.module').then( m => m.QrcodePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
