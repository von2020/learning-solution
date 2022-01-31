import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoursesFacilitatorComponent } from '../components/courses-facilitator/courses-facilitator.component';
import { CreateAssessmentComponent } from '../components/create-assessment/create-assessment.component';
import { CreateCourseMaterialComponent } from '../components/create-course-material/create-course-material.component';
import { CreateQuestionsComponent } from '../components/create-questions/create-questions.component';
import { EarningsComponent } from '../components/earnings/earnings.component';
import { EditCourseComponent } from '../components/edit-course/edit-course.component';
import { EditQuestionsComponent } from '../components/edit-questions/edit-questions.component';
import { PaymentComponent } from '../components/payment/payment.component';
import { ProfileFacilitatorComponent } from '../components/profile-facilitator/profile-facilitator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { DataTablesModule } from 'angular-datatables';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill';
import { TeachersRoutingModule } from '../layouts/teachers/teachers-routing.module';
import { CustomDateModule } from '../pipes/custom-date/custom-date.module';
import { DurationModule } from '../pipes/duration/duration.module';
import { SharedModule } from './shared/shared.module';
import { EditCourseMaterialComponent } from '../components/edit-course-material/edit-course-material.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [
    CreateAssessmentComponent,
    CreateQuestionsComponent,
    CoursesFacilitatorComponent,
    EarningsComponent,
    EditCourseComponent,
    CreateCourseMaterialComponent,
    EditCourseMaterialComponent,
    EditQuestionsComponent,
    PaymentComponent,
    ProfileFacilitatorComponent,
    // SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FileUploadModule,
    DataTablesModule,
    CloudinaryModule,
    NgxDropzoneModule,
    FlashMessagesModule.forRoot(),
    QuillModule.forRoot(),
    DurationModule,
    CustomDateModule,
    NgxDocViewerModule
    // AppRoutingModule
  ],
  exports: [
    CreateAssessmentComponent,
    CreateQuestionsComponent,
    CoursesFacilitatorComponent,
    EarningsComponent,
    EditCourseComponent,
    CreateCourseMaterialComponent,
    EditCourseMaterialComponent,
    EditQuestionsComponent,
    PaymentComponent,
    ProfileFacilitatorComponent,
    // SpinnerComponent
  ],
})
export class SharedLayoutModule {}
