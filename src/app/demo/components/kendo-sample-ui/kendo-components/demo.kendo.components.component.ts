import { scollViewsItems } from '../../../services/demo.sample.data.scollviews';
import { treeViewsItems } from '../../../services/demo.sample.data.treeviews';
import { listItems } from '../../../services/demo.sample.data.listitems';
import { products } from '../../../services/demo.sample.data.products';
import { Component, OnInit } from '@angular/core';
import { menuItems } from '../../../services/demo.sample.data.menus';


@Component({
    selector: 'app-demo-kendo-components',
    templateUrl: './demo.kendo.components.component.html',
    styleUrls: ['./demo.kendo.components.component.css']
  }
)
export class DemoKendoComponentsComponent implements OnInit {
  // For Grid view.
  public gridData: any[] = products;
  // For Dropdowns
  public dropDown_listItems: any[] = listItems;
  public dropDown_value = ['Basketball', 'Cricket'];
  // For Inputs.
  public maskedValue: string;
  public sliderValue = 5;
  public numericValue = 5;
  public switchValue = false;
  public min = 0;
  public max = 10;
  public smallStep = 1;

  // For Buttons
  public splitButtonItems: Array<any> = [{
    text: 'Keep Text Only',
    icon: 'paste-plain-text',
    click: () => { console.log('Keep Text Only click handler'); }
}, {
    text: 'Paste as HTML',
    icon: 'paste-as-html'
}, {
    text: 'Paste Markdown',
    icon: 'paste-markdown'
}, {
    text: 'Set Default Paste'
}];

public dropDownButtonItems: Array<any> = [{
    text: 'My Profile'
}, {
    text: 'Friend Requests'
}, {
    text: 'Account Settings'
}, {
    text: 'Support'
}, {
    text: 'Log Out'
}];

public imageUrl = 'https://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png';

// For Date Inputs
public Date_Value: Date = new Date();

// For Dialogs
  public dialogOpened = false;
  public windowOpened = false;

  // For Gauges.
  public gauges_value: number = 30;

  // For TreeViews
  public treeViews_data: any[] = treeViewsItems;

  // For ScollViews.
  public scollViews_items: any[] = scollViewsItems;
  public scollViews_width = '100%';
  public scollViews_height = '500px';

  // For layout.
  private layout_baseImageUrl: string = "https://demos.telerik.com/kendo-ui/content/web/panelbar/";

  // For Menus
  public menu_items: any[] = menuItems;

  // For Toolbar.
  public splitButtonData: Array<any> = [{
    text: 'Option 1'
}, {
    text: 'Option 2',
}, {
    text: 'Option 3',
}];

public dropdownButtonData: Array<any> = [{
    text: 'Option 1'
}, {
    text: 'Option 2',
}, {
    text: 'Option 3',
}];

// For Popups
public popup_toggleText = 'Hide';
public popup_show = true;

// For Sortables.
public sortable_items: string[] = [
    'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'
];

  constructor() {  }
  ngOnInit() { }

  //Methods for Buttons
  public onSplitButtonClick(dataItem: any): void {
    console.log('Paste');
  }

  public onSplitButtonItemClick(dataItem: any): void {
    if (dataItem) {
        console.log(dataItem.text);
    }
  }

  onButtonClick() {
        console.log('click');
  }

  // Methods For Dialogs
  public close(component) {
    this[component + 'Opened'] = false;
  }

  public open(component) {
    this[component + 'Opened'] = true;
  }

  public action(status) {
    console.log(`Dialog result: ${status}`);
    this.dialogOpened = false;
  }

  // Method for Layout.
  private layoutImageUrl(imageName: string): string {
    return this.layout_baseImageUrl + imageName + '.jpg';
  }

  // For popup
  public onToggle_popup(): void {
    this.popup_show = !this.popup_show;
    this.popup_toggleText = this.popup_show ? 'Hidе' : 'Show';
  }
}
