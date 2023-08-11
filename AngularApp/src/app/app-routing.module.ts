import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth-guard.service';
import { CoupensComponent } from './pages/coupens/coupens.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MediaComponent } from './pages/media/media.component';
import { ProductsComponent } from './pages/products/products.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { LoginComponent } from './pages/auth/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
  {path: 'coupens', component: CoupensComponent, canActivate: [AuthGuard]},
  {path: 'media', component: MediaComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
