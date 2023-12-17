import { Routes } from '@angular/router';
import {StartComponent} from "./start/start.component";
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ErrorPageComponent} from "./error-page/error-page.component";

export const routes: Routes = [
  {path: 'start', component: StartComponent},
  {path: 'main', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: 'start'},
  {path: '**', component: ErrorPageComponent},
];
