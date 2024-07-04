import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials = { email: '', password: '' };
  login() {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe(() => {
      this.router.navigate(['/protected-route']);
    },
      (error) => {
        console.error(error);
      });
  }
}
