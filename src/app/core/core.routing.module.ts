import { AuthCallbackComponent } from './components/system/authcallback/auth.callback.component';
import { SecurityOidcGuardService } from './services/system/security.oidc.guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/system/login/login.component';
import { NotFoundComponent} from './components/system/nofound/notfound.component';
import { RegisterComponent } from './components/system/register/register.component';

// import { SecurityGuard } from './services/system/security.guard';

/**
 * Note: Here it maintains all route entries to other modules.
 * It is the start entry for whole application.
 * Reference: https://www.technouz.com/4644/angular-5-app-structure-multiple-modules/
 */
const coreRoutes: Routes = [
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    canActivate: [SecurityOidcGuardService], // Required user authentication. Corporate with Identity Server 4 and oidc-client library.
    loadChildren: '../admin/admin.module#AdminModule', // Lazy load admin module if it be called.
    data: {
      /** role value should be same as server side enumeration role settings.
       * It also needs to matching the value in role table field "code".
       * Value is casesensitive.
       * */
      role: 'Admin'
    }
  },
  {
    path: 'demo',
    // canActivate: [SecurityGuard],
    loadChildren: '../demo/demo.module#DemoModule'
  },
  {
    /** Corporate with getOidcClientSettings method and SecurityOidcService. */
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

/**
 * Note: Here it maintains all route entries to other modules.
 * It is the start entry for whole application.
 * Reference: https://www.technouz.com/4644/angular-5-app-structure-multiple-modules/
 */
@NgModule({
  imports: [RouterModule.forRoot(coreRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
