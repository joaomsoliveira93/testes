import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AccountsViewComponent } from './components/pages/accounts/accounts-view/accounts-view.component';
import { AccountDetailsComponent } from './components/pages/accounts/account-details/account-details.component';
import { AccountEditComponent } from './components/pages/accounts/account-edit/account-edit.component';
import { ProfileComponent } from './components/pages/accounts/profile/profile.component';
import { ProfileEditComponent } from './components/pages/accounts/profile-edit/profile-edit.component';
import { ChangePasswordComponent } from './components/pages/accounts/change-password/change-password.component';
import { ProductsViewComponent } from './components/pages/products/products-view/products-view.component';
import { ProductDetailsComponent } from './components/pages/products/product-details/product-details.component';
import { ProductEditComponent } from './components/pages/products/product-edit/product-edit.component';
import { ProductAddComponent } from './components/pages/products/product-add/product-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    AboutComponent,
    AccountsViewComponent,
    AccountDetailsComponent,
    AccountEditComponent,
    ProfileComponent,
    ProfileEditComponent,
    ChangePasswordComponent,
    ProductsViewComponent,
    ProductDetailsComponent,
    ProductEditComponent,
    ProductAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
