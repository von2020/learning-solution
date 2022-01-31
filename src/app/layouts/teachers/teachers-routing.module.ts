import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsFacilitatorComponent } from 'src/app/components/analytics-facilitator/analytics-facilitator.component';
import { CoursesFacilitatorComponent } from 'src/app/components/courses-facilitator/courses-facilitator.component';
import { CreateAssessmentComponent } from 'src/app/components/create-assessment/create-assessment.component';
import { CreateCourseMaterialComponent } from 'src/app/components/create-course-material/create-course-material.component';
import { CreateCourseComponent } from 'src/app/components/create-course/create-course.component';
import { CreateQuestionsComponent } from 'src/app/components/create-questions/create-questions.component';
import { EarningsComponent } from 'src/app/components/earnings/earnings.component';
import { EditCourseMaterialComponent } from 'src/app/components/edit-course-material/edit-course-material.component';
import { EditCourseComponent } from 'src/app/components/edit-course/edit-course.component';
import { EditQuestionsComponent } from 'src/app/components/edit-questions/edit-questions.component';
import { HomeTeachersComponent } from 'src/app/components/home-teachers/home-teachers.component';
import { PaymentComponent } from 'src/app/components/payment/payment.component';
import { ProfileFacilitatorComponent } from 'src/app/components/profile-facilitator/profile-facilitator.component';
import { AuthFGuard } from 'src/app/guards/authF.guard';

const routes: Routes = [
  {
    path: 'home-teachers',
    component: HomeTeachersComponent,
    data: { breadcrumb: 'Dashboard' },
    canActivate: [AuthFGuard],
  },
  {
    path: 'create-assessment',
    data: { breadcrumb: 'Create Assessment' },
    component: CreateAssessmentComponent,
    canActivate: [AuthFGuard],
  },
  {
    path: 'create-questions',
    data: { breadcrumb: 'Create Questions' },
    component: CreateQuestionsComponent,
    canActivate: [AuthFGuard],
  },
  {
    path: 'edit-questions',
    data: { breadcrumb: 'Edit Questions' },
    component: EditQuestionsComponent,
    canActivate: [AuthFGuard],
  },
  {
    path: 'create-course',
    data: { breadcrumb: 'Create Course' },
    component: CreateCourseComponent,
    canActivate: [AuthFGuard],
  },
  {
    path: 'create-course-material',
    component: CreateCourseMaterialComponent,
    data: { breadcrumb: 'Create Course Material' },
    canActivate: [AuthFGuard],
  },
  {
    path: 'edit-course-material',
    data: { breadcrumb: 'Edit Course Material' },
    component: EditCourseMaterialComponent,
    canActivate: [AuthFGuard],
  },
  {
    path: 'edit-course',
    component: EditCourseComponent,
    data: { breadcrumb: 'Edit Course' },
    canActivate: [AuthFGuard],
  },
  {
    path: 'courses-facilitator',
    data: { breadcrumb: 'Facilitator Courses' },
    component: CoursesFacilitatorComponent,
    canActivate: [AuthFGuard],
  },
  {
    path: 'profile-facilitator',
    data: { breadcrumb: 'Facilitator Profile' },
    component: ProfileFacilitatorComponent,
    canActivate: [AuthFGuard],
  },
  {
    path: 'earnings',
    data: { breadcrumb: 'Earnings' },
    component: EarningsComponent,
    canActivate: [AuthFGuard],
  },
  {
    path: 'payment',
    data: { breadcrumb: 'Payment' },
    component: PaymentComponent,
    canActivate: [AuthFGuard],
  },
  {
    path: 'analytics-facilitator',
    component: AnalyticsFacilitatorComponent,
    data: { breadcrumb: 'Analytics' },
    canActivate: [AuthFGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
