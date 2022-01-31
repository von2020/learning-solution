import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationSchoolComponent } from 'src/app/components/confirmation-school/confirmation-school.component';
import { SchoolLogInComponent } from 'src/app/components/school-log-in/school-log-in.component';
import { SchoolSignUpComponent } from 'src/app/components/school-sign-up/school-sign-up.component';

const routes: Routes = [
  //     {path:'', component: LearnersComponent,
  //   children: [

  {
    path: 'school-sign-up',
    component: SchoolSignUpComponent,
    data: { breadcrumb: 'School Signup' },
  },
  {
    path: 'school-log-in',
    component: SchoolLogInComponent,
    data: { breadcrumb: 'School Login' },
  },
  {
    path: 'confirmation-school',
    component: ConfirmationSchoolComponent,
    data: { breadcrumb: 'Confirmation' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolsRoutingModule {}
