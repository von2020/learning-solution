import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeLearnerComponent } from '../../components/home-learner/home-learner.component';
import { TeacherHomeComponent } from '../../components/teacher-home/teacher-home.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { ValidateService } from '../../services/validate.service';
import { SendDataService } from '../../services/send-data.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { LearnersComponent } from './learners.component';
import { ProfileLearnerComponent } from '../../components/profile-learner/profile-learner.component';
import { LearnersRoutingModule } from './learners-routing.module';
import { ArchivedCoursesLearnerComponent } from 'src/app/components/archived-courses-learner/archived-courses-learner.component';
import { CoursesLearnerComponent } from 'src/app/components/courses-learner/courses-learner.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaymentLearnerComponent } from 'src/app/components/payment-learner/payment-learner.component';
import { CourseLectureComponent } from 'src/app/components/course-lecture/course-lecture.component';
import { DurationModule } from 'src/app/pipes/duration/duration.module';
import { CustomDateModule } from 'src/app/pipes/custom-date/custom-date.module';
import { CertificateComponent } from 'src/app/components/certificate/certificate.component';
import { CourseClassComponent } from 'src/app/components/course-class/course-class.component';
import { AvatarModule } from 'ngx-avatar';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [
    HomeLearnerComponent,
    LearnersComponent,
    ProfileLearnerComponent,
    CoursesLearnerComponent,
    ArchivedCoursesLearnerComponent,
    PaymentLearnerComponent,
    CourseLectureComponent,
    // CertificateComponent,
    CertificateComponent,
    CourseClassComponent,
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
    LearnersRoutingModule,
    AvatarModule,
    NgxPaginationModule,
    DurationModule,
    CustomDateModule,
    NgxDocViewerModule
  ],
  providers: [ValidateService, SendDataService],
})
export class LearnersModule {}
