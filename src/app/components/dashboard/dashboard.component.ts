import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Student } from '../../core/model/commen.model';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  student!: Student;

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (response) => {
        console.log(response);
        this.student = response.data;
      },
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
