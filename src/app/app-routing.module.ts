import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {redirectUnauthorizedTo, redirectLoggedInTo,canActivate} from '@angular/fire/auth-guard';
import {MenuGuardService} from './services/menu-guard.service';

const  redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectUnauthorizedToSignup = () => redirectUnauthorizedTo(['signin']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectLoggedInToProfilo = () => redirectLoggedInTo(['profilo']);


const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
    ,...canActivate(redirectUnauthorizedToLogin)


  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',

  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule),



  },

  {
    path: 'event-list',
    loadChildren: () => import('./pages/event-list/event-list.module').then( m => m.EventListPageModule)

  },



  {
    path: 'seguiti',
    loadChildren: () => import('./pages/seguiti/seguiti.module').then( m => m.SeguitiPageModule)

    //, ...canActivate(redirectLoggedInToMenu)

  },
  {
    path: 'aggiungi-evento',
    loadChildren: () => import('./pages/aggiungi-evento/aggiungi-evento.module').then( m => m.AggiungiEventoPageModule)

  },
  {
    path: 'eventi',
    loadChildren: () => import('./pages/eventi/eventi.module').then( m => m.EventiPageModule)
    ,canActivate: [MenuGuardService]

  },
  {
    path: 'luoghi',
    loadChildren: () => import('./pages/luoghi/luoghi.module').then( m => m.LuoghiPageModule)

  },
  {
    path: 'profilo',
    loadChildren: () => import('./pages/profilo/profilo.module').then( m => m.ProfiloPageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'profilo-public',
    loadChildren: () => import('./pages/profilo-public/profilo-public.module').then( m => m.ProfiloPublicPageModule)

  },
  {
    path: 'detail-poi',
    loadChildren: () => import('./pages/detail-poi/detail-poi.module').then( m => m.DetailPoiPageModule)



  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


