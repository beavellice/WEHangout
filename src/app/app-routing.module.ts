import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'event-list',
    loadChildren: () => import('./pages/event-list/event-list.module').then( m => m.EventListPageModule)
  },
  {
    path: 'home2',
    loadChildren: () => import('./pages/home2/home2.module').then( m => m.Home2PageModule)
  },
  {
    path: 'seguiti',
    loadChildren: () => import('./pages/seguiti/seguiti.module').then( m => m.SeguitiPageModule)
  },
  {
    path: 'aggiungi-evento',
    loadChildren: () => import('./pages/aggiungi-evento/aggiungi-evento.module').then( m => m.AggiungiEventoPageModule)
  },
  {
    path: 'eventi',
    loadChildren: () => import('./pages/eventi/eventi.module').then( m => m.EventiPageModule)
  },
  {
    path: 'luoghi',
    loadChildren: () => import('./pages/luoghi/luoghi.module').then( m => m.LuoghiPageModule)
  },
  {
    path: 'profilo',
    loadChildren: () => import('./pages/profilo/profilo.module').then( m => m.ProfiloPageModule)
  },
  {
    path: 'profilo-public',
    loadChildren: () => import('./pages/profilo-public/profilo-public.module').then( m => m.ProfiloPublicPageModule)
  },
  {
    path: 'detail-poi',
    loadChildren: () => import('./pages/detail-poi/detail-poi.module').then( m => m.DetailPoiPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
