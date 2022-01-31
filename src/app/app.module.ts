import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SchoolSignUpComponent } from './components/school-sign-up/school-sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './shared/shared/shared.module';
import { TeachersModule } from './layouts/teachers/teachers.module';
import { LearnersModule } from './layouts/learners/learners.module';
import { ValidateService } from './services/validate.service';
import { SendDataService } from './services/send-data.service';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { CoursePreviewComponent } from './components/course-preview/course-preview.component';
import { CourseCategoryComponent } from './components/course-category/course-category.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { BreadcrumbModule } from 'angular-crumbs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AvatarModule } from 'ngx-avatar';
import { FileUploadModule } from 'ng2-file-upload';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { QuillModule } from 'ngx-quill';
import { DataTablesModule } from 'angular-datatables';
import { Angular4PaystackModule } from 'angular4-paystack';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CourseSubCategoryComponent } from './components/course-sub-category/course-sub-category.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SpinnerService } from './services/spinner.service';
import { SpinnerComponent } from './shared/shared/widgets/spinner/spinner.component';
import { httpInterceptorProviders } from './interceptors';
import { FilterPipe } from './pipes/filter.pipe';
import { HighlightDirective } from './pipes/highlight.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ForgotPasswordLearnerComponent } from './components/forgot-password-learner/forgot-password-learner.component';
import { ForgotPasswordFacilitatorComponent } from './components/forgot-password-facilitator/forgot-password-facilitator.component';
import { CourseLectureComponent } from './components/course-lecture/course-lecture.component';
import { TakeQuizComponent } from './components/take-quiz/take-quiz.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacilitatorProfileComponent } from './components/facilitator-profile/facilitator-profile.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CourseSearchComponent } from './components/course-search/course-search.component';
import { CourseQuizService } from './services/courseQuiz.service';
import { CourseTopicQuizService } from './services/course-topic-quiz.service';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { ScriptService } from './services/script.service';
import { CustomDateModule } from './pipes/custom-date/custom-date.module';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { DurationModule } from './pipes/duration/duration.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationFacilitatorComponent } from './components/confirmation-facilitator/confirmation-facilitator.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LearnerService } from './services/learner.service';
import { EditCourseMaterialComponent } from './components/edit-course-material/edit-course-material.component';
import { TeacherHomeComponent } from './components/teacher-home/teacher-home.component';
import {
  TippyModule,
  tooltipVariation,
  popperVariation,
  withContextMenuVariation,
} from '@ngneat/helipopper';
import { SharedService } from './services/shared.service';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ApproveLearnerComponent } from './components/approve-learner/approve-learner.component';
export function tokenGetter() {
  return localStorage.getItem('id_token') || localStorage.getItem('id_Ftoken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    // SchoolSignUpComponent,
    HomeComponent,
    TeacherHomeComponent,
    ConfirmationComponent,
    ConfirmationFacilitatorComponent,
    CoursePreviewComponent,
    CourseCategoryComponent,
    CheckoutComponent,
    CartComponent,
    CourseSubCategoryComponent,
    CourseSearchComponent,
    TermsOfUseComponent,
    SpinnerComponent,
    HighlightDirective,
    ForgotPasswordLearnerComponent,
    ForgotPasswordFacilitatorComponent,
    QuizResultComponent,
    TakeQuizComponent,
    // SchoolLogInComponent,
    FacilitatorProfileComponent,
    DateAgoPipe,
    // DurationFormatPipe,
    ErrorNotFoundComponent,
    ResetPasswordComponent,
    ApproveLearnerComponent,
    // CustomDatePipe,
    // FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    // TeachersModule,
    // LearnersModule,
    BreadcrumbModule,
    FileUploadModule,
    CloudinaryModule,
    NgxPaginationModule,
    NgbModule,
    AvatarModule,
    DataTablesModule,
    NgxDropzoneModule,
    CustomDateModule,
    DurationModule,
    QuillModule.forRoot(),
    FlashMessagesModule.forRoot(),
    Angular4PaystackModule,
    Ng2SearchPipeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
        contextMenu: withContextMenuVariation(tooltipVariation),
      },
    }),
    TippyModule.forRoot(),
    NgxDocViewerModule
    // NgbModule
  ],
  providers: [
    ValidateService,
    SendDataService,
    SharedService,
    AuthService,
    LearnerService,
    SpinnerService,
    CourseQuizService,
    ScriptService,
    CourseTopicQuizService,
    httpInterceptorProviders,
  ],
  // entryComponents: [TooltipComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
