import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseItemComponent } from './widgets/course-item/course-item/course-item.component';
import { SubNavbarComponent } from './components/sub-navbar/sub-navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashNavbarComponent } from './components/dash-navbar/dash-navbar.component';
import { SpinnerComponent } from './widgets/spinner/spinner.component';
import { SchoolNavbarComponent } from './components/school-navbar/school-navbar.component';
import { MyCourseItemComponent } from './widgets/my-course-item/my-course-item/my-course-item.component';
import { LearnerSubNavbarComponent } from './components/learner-sub-navbar/learner-sub-navbar.component';
import { SuperAdminSidebarComponent } from './components/super-admin-sidebar/super-admin-sidebar.component';
import { SuperAdminNavbarComponent } from './components/super-admin-navbar/super-admin-navbar.component';
import { SuperAdminFooterComponent } from './components/super-admin-footer/super-admin-footer.component';
import { TooltipComponent } from './widgets/tooltip/tooltip.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CourseItemComponent,
    SubNavbarComponent,
    SidebarComponent,
    DashNavbarComponent,
    SchoolNavbarComponent,
    MyCourseItemComponent,
    LearnerSubNavbarComponent,
    SuperAdminSidebarComponent,
    SuperAdminNavbarComponent,
    SuperAdminFooterComponent,
    TooltipComponent,
    // SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    // AppRoutingModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    CourseItemComponent,
    SubNavbarComponent,
    SidebarComponent,
    DashNavbarComponent,
    SchoolNavbarComponent,
    MyCourseItemComponent,
    LearnerSubNavbarComponent,
    SuperAdminSidebarComponent,
    SuperAdminNavbarComponent,
    SuperAdminFooterComponent,
    TooltipComponent,
    // SpinnerComponent
  ],
})
export class SharedModule {}
