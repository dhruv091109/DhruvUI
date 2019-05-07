import { Languages } from '../_enumerations/languages';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
// Work for multiple languages support.
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { AdminRoutingModule } from './admin.routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { AdminModuleTranslateLoader} from './services/admin.module.translate.loader';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslateModule.forChild({
        loader: {
          provide: TranslateLoader,
          useFactory: (AdminModuleTranslateLoader), // Load multiple languages files from assets/i18n/core/*.json.
          deps: [HttpClient]
        },
        //isolate : true
      }),
  ],
  declarations: [AdminComponent, DashboardComponent]
})
export class AdminModule {}
