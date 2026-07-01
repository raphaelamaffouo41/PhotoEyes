import { Routes } from '@angular/router';
import { LoginComponent } from "./authentification/pages/login/login.component";
import { RegisterComponent } from "./authentification/pages/register/register.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: '', redirectTo: 'login', pathMatch: 'full'}
];
