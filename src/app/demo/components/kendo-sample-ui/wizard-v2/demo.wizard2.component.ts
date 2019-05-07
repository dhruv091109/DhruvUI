import { Component, OnInit } from '@angular/core';
import {treeViewsItems} from "../../../services/demo.sample.data.treeviews";

@Component({
    selector: 'app-demo-wizard2',
    templateUrl: './demo.wizard2.component.html'
  }
)
export class DemoWizard2Component implements OnInit {
  // For TreeViews
  public treeViews_data: any[] = treeViewsItems;
  constructor() { }
  ngOnInit() { }
}
