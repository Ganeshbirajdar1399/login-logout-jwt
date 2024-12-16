import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {
  studentForm: FormGroup;

  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]), // Updated to match backend key
      password: new FormControl('', [Validators.required]),
    });
  }
  onLoginSubmit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      this.authService.login(this.studentForm.value).subscribe({
        next: (response) => {
          // console.log('Login successful:', response);
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Login error:', err);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
  // ngOnInit(): void {
  //   this.refreshPageOnce();
  // }
  
  // refreshPageOnce(): void {
  //   const refreshed = sessionStorage.getItem('refreshed');
    
  //   if (!refreshed) {
  //     sessionStorage.setItem('refreshed', 'true');
  //     window.location.reload();
  //   } else {
  //     sessionStorage.removeItem('refreshed'); // Optional, if you want to reset the flag
  //   }
  // }
}
