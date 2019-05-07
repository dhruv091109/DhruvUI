import { LoaderService } from '../../../services/system/loader.service';
import { Component, OnInit } from '@angular/core';


@Component({
   selector: 'app-loader',
   templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {
   displayLoader: any;

   constructor(private loaderService: LoaderService) { }

   ngOnInit() {
       this.loaderService.getDisplayStatus().subscribe(status => { this.displayLoader = status; });
   }
}
