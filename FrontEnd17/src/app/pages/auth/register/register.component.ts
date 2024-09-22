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

import { User } from '@core/model/user';
import { Company } from '@core/model/company';

import { AuthService } from '@core/services/auth.service';
import { CompanyService } from '@core/services/company.service';

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
  private companyService = inject(CompanyService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  error!: string;
  message!: string;
  message2!: string;  

  ngOnInit(): void {
    this.buildForm();
//    this.user = new User();
  }

  private buildForm(){
    this.registerForm = this.fb.group(
      {
        nameCompany: ['', [Validators.required]],
        descriptionCompany: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required,
          Validators.minLength(5),
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
    let company = new Company();
    company.name = this.registerForm.get('nameCompany')?.value;
    company.description = this.registerForm.get('descriptionCompany')?.value;
    this.companyService.create(company).subscribe({
      next: (res: any) => {
   //     this.router.navigateByUrl('/pvt/company');
        console.log('register');
      },
      error: (err: any) => {
        this.error = err.error.error;
        this.message = err.error.message;
        this.message2 = err.message;
      },
    });    

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

  getNameCompanyErrors() {
    if (this.NameCompany.hasError('required')) return 'Field is requied!';
    return '';
  }
  getDescriptionCompanyErrors() {
    if (this.DescriptionCompany.hasError('required')) return 'Field is requied!';
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

  get NameCompany(): FormControl {
    return this.registerForm.get('nameCompany') as FormControl;
  }
  get DescriptionCompany(): FormControl {
    return this.registerForm.get('descriptionCompany') as FormControl;
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
