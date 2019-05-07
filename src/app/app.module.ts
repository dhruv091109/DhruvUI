import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
/**
 * The AppModule which occupies the root of the folder is purposely kept as bare as possible.
 * It’s role is simply to bootstrap the Angular application, and provide the root-level router-outlet.
 * This approach also leaves open the possibility of running multiple,
 * independent Angular applications through the same base URL.
 * It also introduces the idea of building a router-driven Angular application.
 * Reference: https://www.technouz.com/4644/angular-5-app-structure-multiple-modules/
 */
export class AppModule { }
