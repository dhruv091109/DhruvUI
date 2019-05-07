import { GaugesModule } from '@progress/kendo-angular-gauges';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ChatModule } from '@progress/kendo-angular-conversational-ui';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { MenuModule } from '@progress/kendo-angular-menu';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { PopupModule } from '@progress/kendo-angular-popup';
import { RippleModule } from '@progress/kendo-angular-ripple';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { SortableModule } from '@progress/kendo-angular-sortable';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { UploadModule } from '@progress/kendo-angular-upload';
// import {MomentTimezoneModule} from 'angular-moment-timezone'; // Not work for angular 6.

// Form validation.
import { CustomFormsModule } from 'ng4-validators';

/**
* The SharedModule is where any shared components, pipes/filters and services will go.
* The SharedModule can be imported in to any other module that requires its components, pipes and/or services.
* Just be sure to export anything you want to share with other modules.
*
* A reminder that services do not need to be exported – they just need to be declared under providers in the module declaration.
*
* The SharedModule doesn’t have a root component or any routing declarations
* because it only contains components that other modules will import to use.
*
* Note: There are no views or logic in the SharedModule.
* Be aware, though… Non of the services in the SharedModule will be persistent.
* So do not use it to store data that needs to be access across various modules.
*
* Note: Each instance of the service imported from the SharedModule will be different.
*
* Reference: https://www.technouz.com/4644/angular-5-app-structure-multiple-modules/
*/
@NgModule({
    imports: [
    ],
    declarations: [],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonsModule,
        InputsModule,
        DialogsModule,
        GridModule,
        DropDownsModule,
        DateInputsModule,
        GaugesModule,
        TreeViewModule,
        ScrollViewModule,
        LabelModule,
        LayoutModule,
        MenuModule,
        TooltipModule,
        ToolBarModule,
        PopupModule,
        RippleModule,
        SortableModule,
        UploadModule,
        ExcelExportModule,
        PDFExportModule,
        ChatModule,
        //BrowserModule, //Note: BrowserModule cannot place in shared module. It has to place in app.module.ts
        //BrowserAnimationsModule, //Note: BrowserAnimationModule cannnot place in shared module. It has to place in app.module.ts
        // Work for input form data validation.
        CustomFormsModule
    ]
  })
  export class SharedModule { }
