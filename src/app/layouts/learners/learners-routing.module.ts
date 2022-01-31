import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivedCoursesLearnerComponent } from 'src/app/components/archived-courses-learner/archived-courses-learner.component';
import { CertificateComponent } from 'src/app/components/certificate/certificate.component';
import { CourseClassComponent } from 'src/app/components/course-class/course-class.component';
import { CoursesLearnerComponent } from 'src/app/components/courses-learner/courses-learner.component';
import { HomeLearnerComponent } from 'src/app/components/home-learner/home-learner.component';
import { PaymentLearnerComponent } from 'src/app/components/payment-learner/payment-learner.component';
import { ProfileLearnerComponent } from 'src/app/components/profile-learner/profile-learner.component';
import { TakeQuizComponent } from 'src/app/components/take-quiz/take-quiz.component';
import { TeacherHomeComponent } from 'src/app/components/teacher-home/teacher-home.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  //     {path:'', component: LearnersComponent,
  //   children: [
  {
    path: 'home-learner',
    component: HomeLearnerComponent,
    data: { breadcrumb: 'Home' },
    canActivate: [AuthGuard],
  },
  {
    path: 'courses-learner',
    component: CoursesLearnerComponent,
    data: { breadcrumb: 'Learner Courses' },
    canActivate: [AuthGuard],
  },
  {
    path: 'archived-courses-learner',
    component: ArchivedCoursesLearnerComponent,
    data: { breadcrumb: 'Archived Courses' },
    canActivate: [AuthGuard],
  },
  {
    path: 'profile-learner',
    component: ProfileLearnerComponent,
    data: { breadcrumb: 'Learner Profile' },
    canActivate: [AuthGuard],
  },
  {
    path: 'payment-learner',
    component: PaymentLearnerComponent,
    data: { breadcrumb: 'Payment' },
    canActivate: [AuthGuard],
  },
  // ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnersRoutingModule {}
