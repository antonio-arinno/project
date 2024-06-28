import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SideNavItem } from './side-nave-item';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TitleCasePipe } from '@angular/common';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink, MatSidenavModule, MatListModule, TitleCasePipe, NgForOf],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})

export class SideNavComponent {

  sideNavContent: SideNavItem[] = [
    {
      title: 'imputation',
      link: 'pvt/imputation',
    }, 
    {
      title: 'project',
      link: 'pvt/project',
    },
    {
      title: 'product',
      link: 'pvt/product',
    }   
  ];    

 

}
