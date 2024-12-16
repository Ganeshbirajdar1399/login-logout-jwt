import { Component, effect, Injector, inject, OnInit, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);
  injector =inject(Injector) 
  isLoggedIn = false;

  
 ngOnInit(): void {
  effect(()=>{
    this.isLoggedIn = this.authService.isLoggedIn();
  },{injector:this.injector});
 }

}
