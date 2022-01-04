import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent} from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AccountsViewComponent} from './components/pages/accounts/accounts-view/accounts-view.component';
import { AccountDetailsComponent } from './components/pages/accounts/account-details/account-details.component';
import { AccountEditComponent } from './components/pages/accounts/account-edit/account-edit.component';
import { ProfileComponent } from './components/pages/accounts/profile/profile.component';
import { ProfileEditComponent } from './components/pages/accounts/profile-edit/profile-edit.component';
import { ChangePasswordComponent } from './components/pages/accounts/change-password/change-password.component';
import { ProductsViewComponent } from './components/pages/products/products-view/products-view.component';
import { ProductDetailsComponent } from './components/pages/products/product-details/product-details.component';
import { ProductEditComponent } from './components/pages/products/product-edit/product-edit.component';
import { ProductAddComponent } from './components/pages/products/product-add/product-add.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"products", component:DashboardComponent},
  {path:"about", component:AboutComponent},
  {path:"accounts",component:AccountsViewComponent},
  {path:"accounts/:id",component:AccountDetailsComponent},
  {path:"accounts/edit/:id",component:AccountEditComponent},
  {path:"profile",component:ProfileComponent},
  {path:"profile/edit",component:ProfileEditComponent},
  {path:"profile/changePassword",component:ChangePasswordComponent},
  {path:"productslist",component:ProductsViewComponent},
  {path:"productslist/:id",component:ProductDetailsComponent},
  {path:"productslist/edit/:id",component:ProductEditComponent},
  {path:"products/add",component:ProductAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
