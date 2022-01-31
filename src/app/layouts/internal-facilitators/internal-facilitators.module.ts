import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
import { ValidateService } from '../../services/validate.service';
import { SendDataService } from '../../services/send-data.service';
import { QuillModule } from 'ngx-quill'
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { DataTablesModule } from 'angular-datatables';
import { InternalFacilitatorsRoutingModule } from './internal-facilitators-routing.module';
import { CustomDateModule } from 'src/app/pipes/custom-date/custom-date.module';
import { DurationModule } from 'src/app/pipes/duration/duration.module';
import { CreateCourseFacilitatorComponent } from 'src/app/components/create-course-facilitator/create-course-facilitator.component';
import { HomeInternalFacilitatorComponent } from 'src/app/components/home-internal-facilitator/home-internal-facilitator.component';
import { InternalFacilitatorsComponent } from './internal-facilitators.component';
import { CoursesFacilitatorComponent } from 'src/app/components/courses-facilitator/courses-facilitator.component';
import { CreateAssessmentComponent } from 'src/app/components/create-assessment/create-assessment.component';
import { CreateCourseMaterialComponent } from 'src/app/components/create-course-material/create-course-material.component';
import { CreateQuestionsComponent } from 'src/app/components/create-questions/create-questions.component';
import { EarningsComponent } from 'src/app/components/earnings/earnings.component';
import { EditCourseComponent } from 'src/app/components/edit-course/edit-course.component';
import { EditQuestionsComponent } from 'src/app/components/edit-questions/edit-questions.component';
import { PaymentComponent } from 'src/app/components/payment/payment.component';
import { ProfileFacilitatorComponent } from 'src/app/components/profile-facilitator/profile-facilitator.component';
import { SharedLayoutModule } from 'src/app/shared/shared-layout.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';



@NgModule({
  declarations: [
    InternalFacilitatorsComponent,
    HomeInternalFacilitatorComponent,
    CreateCourseFacilitatorComponent
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    // AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedLayoutModule,
    SharedModule,
    FileUploadModule,
    DataTablesModule,
    CloudinaryModule,
    NgxDropzoneModule,
    FlashMessagesModule.forRoot(),
    QuillModule.forRoot(),
    InternalFacilitatorsRoutingModule,
    DurationModule,
    CustomDateModule,
    NgxDocViewerModule
  ],
  providers: [ValidateService, SendDataService],
})
export class InternalFacilitatorsModule { }
