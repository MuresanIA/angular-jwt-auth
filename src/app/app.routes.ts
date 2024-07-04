import { Routes } from '@angular/router';
import { ProtectedRouteComponent } from './protected-route/protected-route.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'protected-route', component: ProtectedRouteComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
