import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolsComponent } from '../../layouts/schools/schools.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SchoolsRoutingModule } from './school-routing.module';
import { SchoolSignUpComponent } from 'src/app/components/school-sign-up/school-sign-up.component';
import { SchoolLogInComponent } from 'src/app/components/school-log-in/school-log-in.component';
import { ConfirmationSchoolComponent } from 'src/app/components/confirmation-school/confirmation-school.component';



@NgModule({
  declarations: [
    SchoolsComponent,
    SchoolSignUpComponent,
    SchoolLogInComponent,
    ConfirmationSchoolComponent
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    // AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    FlashMessagesModule.forRoot(),
    SchoolsRoutingModule
  ]
})
export class SchoolsModule { }
