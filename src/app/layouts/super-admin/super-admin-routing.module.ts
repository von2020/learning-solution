import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllFacilitatorsComponent } from 'src/app/components/all-facilitators/all-facilitators.component';
import { AnalyticsSuperAdminComponent } from 'src/app/components/analytics-super-admin/analytics-super-admin.component';
import { ApproveCourseComponent } from 'src/app/components/approve-course/approve-course.component';
import { CoursePercentagComponent } from 'src/app/components/course-percentag/course-percentag.component';
import { CreateCategoryComponent } from 'src/app/components/create-category/create-category.component';
import { CreateFacilitatorComponent } from 'src/app/components/create-facilitator/create-facilitator.component';
import { CreateSubCategoryComponent } from 'src/app/components/create-sub-category/create-sub-category.component';
import { DashboardSuperAdminComponent } from 'src/app/components/dashboard-super-admin/dashboard-super-admin.component';
import { InstructorsProfileComponent } from 'src/app/components/instructors-profile/instructors-profile.component';
import { LoginSuperAdminComponent } from 'src/app/components/login-super-admin/login-super-admin.component';
import { ManageCouponsComponent } from 'src/app/components/manage-coupons/manage-coupons.component';
import { PaymentSuperAdminComponent } from 'src/app/components/payment-super-admin/payment-super-admin.component';
import { RemoveCourseComponent } from 'src/app/components/remove-course/remove-course.component';
import { ReviewsRatingsComponent } from 'src/app/components/reviews-ratings/reviews-ratings.component';
import { ViewCourseComponent } from 'src/app/components/view-course/view-course.component';
import { ViewEarningsComponent } from 'src/app/components/view-earnings/view-earnings.component';
import { AuthAGuard } from 'src/app/guards/authA.guard';

const routes: Routes = [
  {
    path: 'dashboard-super-admin',
    component: DashboardSuperAdminComponent,
    data: { breadcrumb: 'Dashboard' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'approve-course',
    component: ApproveCourseComponent,
    data: { breadcrumb: 'Approve Course' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'remove-course',
    component: RemoveCourseComponent,
    data: { breadcrumb: 'Remove Course' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'create-category',
    component: CreateCategoryComponent,
    data: { breadcrumb: 'Create Category' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'create-subcategory',
    component: CreateSubCategoryComponent,
    data: { breadcrumb: 'Create Subcategory' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'reviews-ratings',
    component: ReviewsRatingsComponent,
    data: { breadcrumb: 'Reviews' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'manage-coupon',
    component: ManageCouponsComponent,
    data: { breadcrumb: 'Manage Coupons' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'course-percentage',
    component: CoursePercentagComponent,
    data: { breadcrumb: 'Course Percentages' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'all-facilitators',
    component: AllFacilitatorsComponent,
    data: { breadcrumb: 'All Facilitators' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'analytics-super-admin',
    component: AnalyticsSuperAdminComponent,
    data: { breadcrumb: 'Analytics' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'profile-facilitators',
    component: InstructorsProfileComponent,
    data: { breadcrumb: 'Facilitator Profile' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'course-view',
    component: ViewCourseComponent,
    data: { breadcrumb: 'View Course' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'payment-super-admin',
    component: PaymentSuperAdminComponent,
    data: { breadcrumb: 'Payments' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'view-earnings',
    component: ViewEarningsComponent,
    data: { breadcrumb: 'View Earnings' },
    canActivate: [AuthAGuard],
  },
  {
    path: 'create-facilitator',
    component: CreateFacilitatorComponent,
    data: { breadcrumb: 'Create Facilitator' },
    canActivate: [AuthAGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
