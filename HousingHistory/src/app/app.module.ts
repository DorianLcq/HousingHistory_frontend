import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateHousingComponent } from './create-housing/create-housing.component';
import { HousingDetailsComponent } from './housing-details/housing-details.component';
import { HousingListComponent } from './housing-list/housing-list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HousingService } from './services/housing.service';
import {HttpClientModule } from '@angular/common/http';
import { LoginUserComponent } from './login-user/login-user.component';
import { CreateUserComponent } from './create-user/create-user.component';

const appRoutes: Routes = [
  { path: 'create-housing/:username', component: CreateHousingComponent },
  { path: 'list-housing/:token', component: HousingListComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'login-user', component: LoginUserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateHousingComponent,
    HousingDetailsComponent,
    HousingListComponent,
    LoginUserComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    HousingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
