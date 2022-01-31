import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { CoursePreviewComponent } from './components/course-preview/course-preview.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { CourseCategoryComponent } from './components/course-category/course-category.component';
import { CourseSubCategoryComponent } from './components/course-sub-category/course-sub-category.component';
import { TeachersComponent } from './layouts/teachers/teachers.component';
import { LearnersComponent } from './layouts/learners/learners.component';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPasswordLearnerComponent } from './components/forgot-password-learner/forgot-password-learner.component';
import { ForgotPasswordFacilitatorComponent } from './components/forgot-password-facilitator/forgot-password-facilitator.component';
import { CourseLectureComponent } from './components/course-lecture/course-lecture.component';
import { TakeQuizComponent } from './components/take-quiz/take-quiz.component';
import { FacilitatorProfileComponent } from './components/facilitator-profile/facilitator-profile.component';
import { CourseSearchComponent } from './components/course-search/course-search.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { SuperAdminComponent } from './layouts/super-admin/super-admin.component';
import { LoginSuperAdminComponent } from './components/login-super-admin/login-super-admin.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { ConfirmationFacilitatorComponent } from './components/confirmation-facilitator/confirmation-facilitator.component';
import { InternalFacilitatorsComponent } from './layouts/internal-facilitators/internal-facilitators.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CourseClassComponent } from './components/course-class/course-class.component';
import { TeacherHomeComponent } from './components/teacher-home/teacher-home.component';
import { ApproveLearnerComponent } from './components/approve-learner/approve-learner.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'teach-home',
    component: TeacherHomeComponent,
    data: { breadcrumb: 'Teachers' },
  },
  { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
  {
    path: 'login-super-admin',
    component: LoginSuperAdminComponent,
    data: { breadcrumb: 'Login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { breadcrumb: 'Register' },
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
    data: { breadcrumb: 'Confirmation' },
  },
  {
    path: 'confirmation-facilitator',
    component: ConfirmationFacilitatorComponent,
    data: { breadcrumb: 'Confirmation' },
  },
  {
    path: 'instructor/:id',
    component: FacilitatorProfileComponent,
    data: { breadcrumb: 'Instructor Profile' },
  },
  {
    path: 'terms-of-use',
    component: TermsOfUseComponent,
    data: { breadcrumb: 'Terms of use' },
  },
  {
    path: 'approve-learner',
    component: ApproveLearnerComponent,
    data: { breadcrumb: 'ApproveLearner' },
  },
  {
    path: 'course-search',
    component: CourseSearchComponent,
    data: { breadcrumb: 'Course Search' },
  },
  {
    path: 'certificate',
    component: CertificateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'take-quiz',
    component: TakeQuizComponent,
    data: { breadcrumb: 'Quiz' },
    canActivate: [AuthGuard],
  },
  {
    path: 'quiz-result',
    component: QuizResultComponent,
    data: { breadcrumb: 'Quiz Result' },
    canActivate: [AuthGuard],
  },
  {
    path: 'course-lecture/course/:id',
    component: CourseLectureComponent,
    data: { breadcrumb: 'Course Lecture' },
    canActivate: [AuthGuard],
  },
  {
    path: 'course-class/course/:id',
    component: CourseClassComponent,
    data: { breadcrumb: 'Course Class' },
    canActivate: [AuthGuard],
  },
  {
    path: 'forgot-password-learner',
    component: ForgotPasswordLearnerComponent,
    data: { breadcrumb: 'Forgot Password Learner' },
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: { breadcrumb: 'Reset Password' },
  },
  {
    path: 'forgot-password-facilitator',
    component: ForgotPasswordFacilitatorComponent,
    data: { breadcrumb: 'Forgot Password Facilitator' },
  },
  {
    path: 'course-category',
    component: CourseCategoryComponent,
    pathMatch: 'full',
    data: { breadcrumb: 'Course Category' },
  },
  {
    path: 'course-sub-category',
    component: CourseSubCategoryComponent,
    data: { breadcrumb: 'Course SubCategory' },
  },
  {
    path: 'course-preview',
    component: CoursePreviewComponent,
    // data: { breadcrumb: 'Course Preview' },
  },
  { path: 'cart', component: CartComponent, data: { breadcrumb: 'Cart' } },
  { path: 'cart/checkout', component: CheckoutComponent },

  {
    path: '',
    component: LearnersComponent,
    loadChildren: () =>
      import(`./layouts/learners/learners.module`).then(
        (m) => m.LearnersModule
      ),
  },
  {
    path: '',
    component: TeachersComponent,
    loadChildren: () =>
      import(`./layouts/teachers/teachers.module`).then(
        (m) => m.TeachersModule
      ),
  },
  {
    path: '',
    component: InternalFacilitatorsComponent,
    loadChildren: () =>
      import(
        `./layouts/internal-facilitators/internal-facilitators.module`
      ).then((m) => m.InternalFacilitatorsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import(`./layouts/schools/schools.module`).then((m) => m.SchoolsModule),
  },
  {
    path: '',
    component: SuperAdminComponent,
    loadChildren: () =>
      import(`./layouts/super-admin/super-admin.module`).then(
        (m) => m.SuperAdminModule
      ),
  },
  { path: '**', component: ErrorNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
