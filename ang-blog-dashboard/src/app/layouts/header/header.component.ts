import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail!: string;
  private subscription!: Subscription;
  isLoggedIn!: boolean;
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.loggedIn.subscribe((val) => {
      this.isLoggedIn = val;
      this.userEmail = JSON.parse(localStorage.getItem('user')!).email;

    });
    this.authService.userEmail.subscribe((email) => {
      this.userEmail = email;
    });
  }
  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
