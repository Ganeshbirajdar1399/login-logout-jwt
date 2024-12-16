import { Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',component: HomeComponent,
    children: [
      { path: '', redirectTo:'dashboard', pathMatch:'full'},
      {path: 'dashboard', canActivate:[authGuard], component: DashboardComponent},
      {path: 'student', canActivate:[guestGuard], component: StudentComponent},
      {path: 'register', canActivate:[guestGuard], component:RegisterComponent},
    ]
  },
];
