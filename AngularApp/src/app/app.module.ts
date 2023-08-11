import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { CoupensComponent } from './pages/coupens/coupens.component';
import { MediaComponent } from './pages/media/media.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CardComponent } from './components/card/card.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsComponent,
    StatisticsComponent,
    CoupensComponent,
    MediaComponent,
    SettingsComponent,
    TopbarComponent,
    UserProfileComponent,
    CardComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
