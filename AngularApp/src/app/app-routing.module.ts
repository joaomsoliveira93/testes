import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AllclientsComponent } from './pages/clients/allclients/allclients.component';
import { ViewclientComponent } from './pages/clients/viewclient/viewclient.component';
import { UsersComponent } from './pages/users/allusers/allusers.component';
import { ViewuserComponent } from './pages/users/viewuser/viewuser.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'clients', component: AllclientsComponent, canActivate: [AuthGuard]},
  {path: 'clients/:id', component: ViewclientComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'users/:id', component: ViewuserComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
