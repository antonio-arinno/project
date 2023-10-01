import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { HearderComponent } from './layout/hearder/hearder.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { PrivateComponent } from './private.component';
import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    PrivateComponent,
    HearderComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
  ]
})
export class PrivateModule { }
