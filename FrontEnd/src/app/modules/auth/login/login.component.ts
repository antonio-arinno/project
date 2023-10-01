import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder,
         FormGroup, 
//         FormControl,
         Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth.service';
import { User } from '@model/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup;
  user: User;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.buildForm();
    this.user = new User();
  }

  private buildForm(){
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  submit(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      const value = this.form.value;
      this.user = this.form.value;
      this.authService.login(this.user).subscribe({
        next: (res: any) => {
          this.authService.saveUser(res.access_token);
          this.authService.saveToken(res.access_token);
          this.router.navigateByUrl('/pvt');
        },
        error: (err: any) => {
          console.log('Error: ');
          console.log(err);
        },
      });
    }
  }


}
