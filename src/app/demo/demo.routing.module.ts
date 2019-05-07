import { DemoUIkitComponent } from './components/kendo-sample-ui/ui-kit/demo.uikit.component';
import { DemoKendoComponentsComponent } from './components/kendo-sample-ui/kendo-components/demo.kendo.components.component';
import { DemoListing1Component } from './components/kendo-sample-ui/listing-v1-fa/demo.listing1.component';
import { DemoFormComponent } from './components/kendo-sample-ui/form-fa/demo.form.component';
import { ValidationDemoComponent } from './components/validationdemo.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Demo1Component } from './components/demo1.component';
import { Demo2Component } from './components/demo2.component';
import { DemoComponent } from './demo.component';
import { DemoDashboardComponent } from './components/kendo-sample-ui/dashboard-fa/demo.dashboard.component';
import { DemoListing2Component } from './components/kendo-sample-ui/listing-v2-fa/demo.listing2.component';
import { DemoListing3Component } from './components/kendo-sample-ui/listing-v3-fa/demo.listing3.component';
import { DemoWizard1Component } from './components/kendo-sample-ui/wizard-v1/demo.wizard1.component';
import { DemoWizard2Component } from './components/kendo-sample-ui/wizard-v2/demo.wizard2.component';

const demoRoutes: Routes = [
  {
   path: '',
   redirectTo: 'demo1',
   pathMatch: 'full'
  },
  /** Note: Module's entry point has to apply following routing. */
  {
    path: 'demo1',
    component: DemoComponent,
    children: [
      { path: '', component: Demo1Component }
    ]
  } ,
  { path: 'dashboard', component: DemoDashboardComponent},
  { path: 'form', component: DemoFormComponent},
  { path: 'listing1', component: DemoListing1Component},
  { path: 'listing2', component: DemoListing2Component},
  { path: 'listing3', component: DemoListing3Component},
  { path: 'wizard1', component: DemoWizard1Component},
  { path: 'wizard2', component: DemoWizard2Component},
  { path: 'kendocomponents', component: DemoKendoComponentsComponent},
  { path: 'demo2', component: Demo2Component},
  { path: 'uikit', component: DemoUIkitComponent},
  /*
  {
    path: 'demo2',
    component: DemoComponent,
    children: [
      { path: '', component: Demo2Component }
    ]
  }
  */
  { path: 'validationdemo', component: ValidationDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(demoRoutes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
