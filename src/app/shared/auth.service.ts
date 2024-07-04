import { Injectable, Signal, inject, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  private tokenKey = 'auth-token';
  private loggedIn: Signal<boolean> = signal(this.hasToken());


  login(email: string, password: string): Observable<void> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredential => userCredential.user.getIdToken()),
      switchMap(token => {
        localStorage.setItem(this.tokenKey, token);
        this.loggedIn = signal(true);
        return from(Promise.resolve());
      })
    )
  }

  logout(): void {
    from(signOut(this.auth)).subscribe(() => {
      localStorage.removeItem(this.tokenKey);
      this.loggedIn = signal(false);
      this.router.navigate(['/login']);
    })
  }

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
