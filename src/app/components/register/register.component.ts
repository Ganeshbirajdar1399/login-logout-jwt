import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  studentReg: FormGroup;

  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.studentReg = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
    });
  }

  onSignupSubmit() {
    if (this.studentReg.valid) {
      console.log(this.studentReg.value);
      this.authService.register(this.studentReg.value).subscribe({
        next: (response) => {
          // console.log('Login successful:', response);
          this.router.navigate(['student']);
        },
        error: (err) => {
          console.error('Login error:', err);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
