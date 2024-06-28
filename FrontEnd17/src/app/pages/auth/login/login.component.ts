import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { User } from '@core/model/user';
import { AuthService } from '@core/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form!: FormGroup;
  user!: User;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
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
