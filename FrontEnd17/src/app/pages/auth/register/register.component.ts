import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';



import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatCardModule, MatButtonModule, MatGridListModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  hide = true;
  responseMsg: string = '';
  registerForm!: FormGroup;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.buildForm();
//    this.user = new User();
  }

  private buildForm(){
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ]],
        rpassword: [''],
      },
      {
        validators: [repeatPasswordValidator],
      } as AbstractControlOptions
    );

  }


  register() {
    /*
    let user: User = {
      id: 0,
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      userType: UserType.USER,
      mobile: '',
      password: this.registerForm.get('password')?.value,
      blocked: false,
      active: false,
      createdOn: '',
      fine: 0,
    };
    this.api.createAccount(user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.responseMsg = res.toString();
      },
      error: (err: any) => {
        console.log('Error: ');
        console.log(err);
      },
    });
    */
  } 

  getFirstNameErrors() {
    if (this.FirstName.hasError('required')) return 'Field is requied!';
    return '';
  }
  getLastNameErrors() {
    if (this.LastName.hasError('required')) return 'Field is requied!';
    return '';
  }
  getEmailErrors() {
    if (this.Email.hasError('required')) return 'Email is required!';
    if (this.Email.hasError('email')) return 'Email is invalid.';
    return '';
  }
  getPasswordErrors() {
    if (this.Password.hasError('required')) return 'Password is required!';
    if (this.Password.hasError('minlength'))
      return 'Minimum 8 characters are required!';
    if (this.Password.hasError('maxlength'))
      return 'Maximum 15 characters are required!';
    return '';
  }

  get FirstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get RPassword(): FormControl {
    return this.registerForm.get('rpassword') as FormControl;
  }

}

export const repeatPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const pwd = control.get('password')?.value;
  const rpwd = control.get('rpassword')?.value;
  if (pwd === rpwd) {
    control.get('rpassword')?.setErrors(null);
    return null;
  } else {
    control.get('rpassword')?.setErrors({ rpassword: true });
    return { rpassword: true };
  }
};
