import { HttpCSPHeadersInterceptorProvider } from './interceptors/http.csp.headers.interceptor';
import { SecurityOidcGuardService } from './services/system/security.oidc.guard.service';
import { SecurityOidcService } from './services/system/security.oidc.service';
import { FooterComponent } from './components/system/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { TestComponent } from './components/system/test/test.component';
import { RouterModule } from '@angular/router';

// Http request/response process associated.
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule} from '@angular/platform-browser';
import { NgModule, ApplicationRef, ErrorHandler } from '@angular/core';
// Work for UI components.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Work for multiple languages support.
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
// Custom Services.
import { MessageService } from './services/system/message.service';
import { LoaderService } from './services/system/loader.service';
import { LoggerService } from './services/system/logger.service';
import { SecurityService } from './services/system/security.service';
import { ThemeService } from './services/system/theme.service';
import { UserService } from './services/system/user.service';
import { CoreModuleTranslateLoader} from './services/system/core.module.translate.loader';
import { GlobalErrorHandlerProvider } from './services/system/global.error.handler';

// Custom Components.
import { MessageComponent } from './components/system/message/message.component';
import { DialogComponent } from './components/system/dialog/dialog.component';
import { HeaderComponent} from './components/system/header/header.component';
import { LoaderComponent } from './components/system/loader/loader.component';
import { LoginComponent } from './components/system/login/login.component';
import { RegisterComponent } from './components/system/register/register.component';
import { NotFoundComponent } from './components/system/nofound/notfound.component';
import { ThemeComponent } from './components/system/theme/theme.component';
// Custom Providers.
import { SecurityOidcInterceptorProvider } from './interceptors/security.oidc.interceptor';
import { LoaderInterceptorProvider } from './interceptors/loader.interceptor';
import { HttpErrorInterceptorProvider } from './interceptors/http.error.interceptor';
import { SecurityGuard } from './services/system/security.guard';
// Custom Routing.
import { CoreRoutingModule } from './core.routing.module';

import {AuthCallbackComponent} from './components/system/authcallback/auth.callback.component';

@NgModule({
  declarations: [
    MessageComponent,
    DialogComponent,
    HeaderComponent,
    LoaderComponent,
    LoginComponent,
    RegisterComponent,
    ThemeComponent,
    NotFoundComponent,
    TestComponent,
    FooterComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    // Work for multiple languages support.
    TranslateModule.forRoot({ // Note: Whole application only allows to have one "forRoot".
      loader: {
        provide: TranslateLoader,
        useFactory: (CoreModuleTranslateLoader), // Load multiple languages files from assets/i18n/core/*.json.
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    CoreRoutingModule
  ],
  //
  // Export the shared components which would be applied to other modules.
  // When CoreModule is imported in to the root AppModule, the exporeted components will be available 
  // as a directive because of the "exports".
  //
  exports: [
      // Important. Without export RouteerModule here, system will reaise exception: 'router-outlet' is not a known element:
     RouterModule,
     // Note: Export to application's root, called in app.module.ts.
     // When application start, system will try to get multiple languages translate files from assets/i18n/core/*.json
     TranslateModule,
     MessageComponent,
     DialogComponent,
     HeaderComponent,
     LoaderComponent,
     ThemeComponent,
     FooterComponent
  ],
  // Note: The services setup inside providers will be singleton.
  providers: [
    HttpClient,
     MessageService,
     LoaderService,
     LoggerService,
     ThemeService,
     TranslateService,  // Form @ngx-translate.
     SecurityGuard,
     SecurityService,
     SecurityOidcGuardService,
     SecurityOidcService,
     UserService,
     LoaderInterceptorProvider,
     HttpErrorInterceptorProvider,
     GlobalErrorHandlerProvider,
     SecurityOidcInterceptorProvider
     // HttpCSPHeadersInterceptorProvider //This maybe not work. TODO.
  ],
  /**
   * Place components which are created dynamically to entryComponents under @NgModuledecorator function.
   * Reference: https://hassantariqblog.wordpress.com/2017/02/12/angular2-error-no-component-factory-found-did-you-add-it-to-ngmodule-entrycomponents/
  */
  entryComponents: [MessageComponent, LoaderComponent, DialogComponent, HeaderComponent, FooterComponent],
})
/**
 * The declaration for CoreModule in app/core/core.module.ts must constain all shared components which will be shared with other modules.
 * The purpose of CoreModule is to hold the root components, services and features of the application
 * such as a universal login screen, global navbar/header, global footer, authentication and authentication guards.
 * Where lazy-loaded is needed, the other modules can easily be lazy-loaded in using the
 * following code in the core.routing.module.ts file.
 *
 * Reference: https://www.technouz.com/4644/angular-5-app-structure-multiple-modules/
 */
export class CoreModule {}
