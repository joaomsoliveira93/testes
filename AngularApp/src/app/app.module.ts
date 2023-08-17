import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/allusers/allusers.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CardComponent } from './components/card/card.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ViewuserComponent } from './pages/users/viewuser/viewuser.component';
import { ConfigService } from 'src/services/configfile/config.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AllclientsComponent } from './pages/clients/allclients/allclients.component';
import { AddClientsComponent } from './components/add-clients/add-clients.component';
import { ViewclientComponent } from './pages/clients/viewclient/viewclient.component';
import { LicencesComponent } from './components/licences/licences.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AddlicencesComponent } from './components/addlicences/addlicences.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    UsersComponent,
    SettingsComponent,
    TopbarComponent,
    UserProfileComponent,
    CardComponent,
    LoginComponent,
    HeaderComponent,
    ViewuserComponent,
    AddUsersComponent,
    ProfileComponent,
    ChangePasswordComponent,
    AllclientsComponent,
    AddClientsComponent,
    ViewclientComponent,
    LicencesComponent,
    AddlicencesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
