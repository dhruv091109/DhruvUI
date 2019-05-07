import { DemoUIkitComponent } from './components/kendo-sample-ui/ui-kit/demo.uikit.component';
import { DemoKendoComponentsComponent } from './components/kendo-sample-ui/kendo-components/demo.kendo.components.component';
import { DemoFormComponent } from './components/kendo-sample-ui/form-fa/demo.form.component';
import { DemoWizard1Component } from './components/kendo-sample-ui/wizard-v1/demo.wizard1.component';
import { DemoListing3Component } from './components/kendo-sample-ui/listing-v3-fa/demo.listing3.component';
import { DemoListing2Component } from './components/kendo-sample-ui/listing-v2-fa/demo.listing2.component';
import { DashboardComponent } from '../admin/components/dashboard/dashboard.component';
import { ValidationDemoComponent } from './components/validationdemo.component';
import { Languages } from '../_enumerations/languages';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoRoutingModule } from './demo.routing.module';
import { SharedModule } from '../shared/shared.module';
import { DemoComponent } from './demo.component';
import { Demo1Component } from './components/demo1.component';
import { Demo2Component } from './components/demo2.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
// Work for multiple languages support.
import { TranslateModule, TranslateLoader, TranslateService, MissingTranslationHandler } from '@ngx-translate/core';

import {DemoModuleTranslateLoader} from './services/demo.module.translate.loader';
import { TimeZoneTestComponent } from './components/timezonetest.component';
import { DemoDashboardComponent } from './components/kendo-sample-ui/dashboard-fa/demo.dashboard.component';
import { DemoListing1Component } from './components/kendo-sample-ui/listing-v1-fa/demo.listing1.component';
import { DemoWizard2Component } from './components/kendo-sample-ui/wizard-v2/demo.wizard2.component';


@NgModule({
  imports: [
    CommonModule,
    DemoRoutingModule,
    SharedModule,
    TranslateModule.forChild({
        loader: {
          provide: TranslateLoader,
          useFactory: (DemoModuleTranslateLoader), // Load multiple languages files from assets/i18n/core/*.json.
          deps: [HttpClient],
        },
         isolate: false // Value = false, system will refresh whole application's translate included core module.
        // missingTranslationHandler: [{provide: MissingTranslationHandler, useClass: TranslateHandler}]
      }),
  ],
  declarations: [
    DemoComponent,
    Demo1Component,
    Demo2Component,
    ValidationDemoComponent,
    TimeZoneTestComponent,
    DemoDashboardComponent,
    DemoListing1Component,
    DemoListing2Component,
    DemoListing3Component,
    DemoWizard1Component,
    DemoWizard2Component,
    DemoFormComponent,
    DemoKendoComponentsComponent,
    DemoUIkitComponent
  ]
})
export class DemoModule {}
