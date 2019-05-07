import { Component, OnInit } from '@angular/core';
import {products} from "../../../services/demo.sample.data.products";

@Component({
    selector: 'app-demo-listing1',
    templateUrl: './demo.listing1.component.html'
  }
)
export class DemoListing1Component implements OnInit {
  public gridData: any[] = products;
  constructor() { }
  ngOnInit() { }
}
