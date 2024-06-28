import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from '@shared/components/footer/footer.component';


@Component({
  selector: 'app-private',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MatSidenavModule, SideNavComponent, FooterComponent],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss'
})
export class PrivateComponent {

}
