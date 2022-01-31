import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsFacilitatorComponent } from 'src/app/components/analytics-facilitator/analytics-facilitator.component';
import { CoursesFacilitatorComponent } from 'src/app/components/courses-facilitator/courses-facilitator.component';
import { CreateAssessmentComponent } from 'src/app/components/create-assessment/create-assessment.component';
import { CreateCourseFacilitatorComponent } from 'src/app/components/create-course-facilitator/create-course-facilitator.component';
import { CreateCourseMaterialComponent } from 'src/app/components/create-course-material/create-course-material.component';
import { CreateCourseComponent } from 'src/app/components/create-course/create-course.component';
import { CreateQuestionsComponent } from 'src/app/components/create-questions/create-questions.component';
import { EarningsComponent } from 'src/app/components/earnings/earnings.component';
import { EditCourseMaterialComponent } from 'src/app/components/edit-course-material/edit-course-material.component';
import { EditCourseComponent } from 'src/app/components/edit-course/edit-course.component';
import { EditQuestionsComponent } from 'src/app/components/edit-questions/edit-questions.component';
import { HomeInternalFacilitatorComponent } from 'src/app/components/home-internal-facilitator/home-internal-facilitator.component';
import { PaymentComponent } from 'src/app/components/payment/payment.component';
import { ProfileFacilitatorComponent } from 'src/app/components/profile-facilitator/profile-facilitator.component';
import { AuthFGuard } from 'src/app/guards/authF.guard';

const routes: Routes = [
  {
    path: 'create-assessment',
    component: CreateAssessmentComponent,
    data: { breadcrumb: 'Create Assessment' },
    canActivate: [AuthFGuard],
  },
  {
    path: 'create-questions',
    component: CreateQuestionsComponent,
    data: { breadcrumb: 'Create Questions' },
    canActivate: [AuthFGuard],
  },
  {
    path: 'edit-questions',
    component: EditQuestionsComponent,
    data: { breadcrumb: 'Edit Questions' },
    canActivate: [AuthFGuard],
  },
  {
    path: 'create-course',
    component: CreateCourseComponent,
    data: { breadcrumb: 'Create Course' },
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
    component: EditCourseMaterialComponent,
    data: { breadcrumb: 'Edit Course Material' },
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
    component: CoursesFacilitatorComponent,
    data: { breadcrumb: 'Facilitator Courses' },
    canActivate: [AuthFGuard],
  },
  {
    path: 'profile-facilitator',
    component: ProfileFacilitatorComponent,
    data: { breadcrumb: 'Facilitator Profile' },
    canActivate: [AuthFGuard],
  },
  {
    path: 'earnings',
    component: EarningsComponent,
    data: { breadcrumb: 'Earnings' },
    canActivate: [AuthFGuard],
  },
  {
    path: 'payment',
    component: PaymentComponent,
    data: { breadcrumb: 'Payment' },
    canActivate: [AuthFGuard],
  },
  {
    path: 'analytics-facilitator',
    component: AnalyticsFacilitatorComponent,
    data: { breadcrumb: 'Analytics' },
    canActivate: [AuthFGuard],
  },
  {
    path: 'create-course-facilitator',
    component: CreateCourseFacilitatorComponent,
    data: { breadcrumb: 'Create Course' },
    canActivate: [AuthFGuard],
  },
  {
    path: 'home-internal-facilitator',
    component: HomeInternalFacilitatorComponent,
    data: { breadcrumb: 'Dashboard' },
    canActivate: [AuthFGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalFacilitatorsRoutingModule {}
