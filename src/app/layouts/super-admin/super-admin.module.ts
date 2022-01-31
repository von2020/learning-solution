import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
import { ValidateService } from '../../services/validate.service';
import { SendDataService } from '../../services/send-data.service';
import {FlashMessagesModule } from 'angular2-flash-messages';
import { SuperAdminComponent } from './super-admin.component';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginSuperAdminComponent } from 'src/app/components/login-super-admin/login-super-admin.component';
import { DashboardSuperAdminComponent } from 'src/app/components/dashboard-super-admin/dashboard-super-admin.component';
import { ScriptService } from 'src/app/services/script.service';
import { ApproveCourseComponent } from 'src/app/components/approve-course/approve-course.component';
import { CreateCategoryComponent } from 'src/app/components/create-category/create-category.component';
import { DataTablesModule } from 'angular-datatables';
import { CustomDatePipe } from 'src/app/pipes/custom-date.pipe';
import { RemoveCourseComponent } from 'src/app/components/remove-course/remove-course.component';
import { CreateSubCategoryComponent } from 'src/app/components/create-sub-category/create-sub-category.component';
import { ReviewsRatingsComponent } from 'src/app/components/reviews-ratings/reviews-ratings.component';
import { ManageCouponsComponent } from 'src/app/components/manage-coupons/manage-coupons.component';
import { CoursePercentagComponent } from 'src/app/components/course-percentag/course-percentag.component';
import { AllFacilitatorsComponent } from 'src/app/components/all-facilitators/all-facilitators.component';
import { CustomDateModule } from 'src/app/pipes/custom-date/custom-date.module';
import { AnalyticsSuperAdminComponent } from 'src/app/components/analytics-super-admin/analytics-super-admin.component';
import { InstructorsProfileComponent } from 'src/app/components/instructors-profile/instructors-profile.component';
import { ViewCourseComponent } from 'src/app/components/view-course/view-course.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill';
import { PaymentSuperAdminComponent } from 'src/app/components/payment-super-admin/payment-super-admin.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewEarningsComponent } from 'src/app/components/view-earnings/view-earnings.component';
import { DurationModule } from 'src/app/pipes/duration/duration.module';
import { CreateFacilitatorComponent } from 'src/app/components/create-facilitator/create-facilitator.component';




@NgModule({
  declarations: [
    SuperAdminComponent,
    LoginSuperAdminComponent,
    DashboardSuperAdminComponent,
    ApproveCourseComponent,
    RemoveCourseComponent,
    CreateCategoryComponent,
    CreateSubCategoryComponent,
    ReviewsRatingsComponent,
    ManageCouponsComponent,
    CoursePercentagComponent,
    AllFacilitatorsComponent,
    AnalyticsSuperAdminComponent,
    InstructorsProfileComponent,
    ViewCourseComponent,
    PaymentSuperAdminComponent,
    ViewEarningsComponent,
    CreateFacilitatorComponent
    // CustomDatePipe,
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    // AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    SharedModule,
    DataTablesModule,
    NgxDropzoneModule,
    FlashMessagesModule.forRoot(),
    QuillModule.forRoot(),
    SuperAdminRoutingModule,
    NgxPaginationModule,
    DurationModule,
    CustomDateModule
  ],
  providers: [ValidateService, SendDataService, ScriptService],
})
export class SuperAdminModule { }
