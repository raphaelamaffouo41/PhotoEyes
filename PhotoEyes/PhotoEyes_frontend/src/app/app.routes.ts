import { Routes } from '@angular/router';
import { LoginComponent } from "./authentification/login/login.component";
import { RegisterComponent } from "./authentification/register/register.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: '', redirectTo: 'login', pathMatch: 'full'}
];
