import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth.service';

@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrls: ['./hearder.component.scss']
})
export class HearderComponent {

  constructor(public authService: AuthService, private routerService: Router){}

  logout(): void{
    this.authService.logout();
    this.routerService.navigate(['/pbl/auth/login']);
  }

}
