import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListUsersComponent} from "./pages/list-users/list-users.component";
import {CreateEditUserComponent} from "./pages/create-edit-user/create-edit-user.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users/list', component: ListUsersComponent, canActivate: [AuthGuard] },
  { path: 'users/new', component: CreateEditUserComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: CreateEditUserComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
