import { Component } from '@angular/core';
import { SideNavItem } from '@model/side-nav-item';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  sideNavContent: SideNavItem[] = [
    {
      title: 'product',
      link: 'pvt/product/product',
    },
    {
      title: 'project',
      link: 'pvt/project/project',
    },
    {
      title: 'imputation',
      link: 'pvt/imputation/imputation',
    }
  ];  

}
