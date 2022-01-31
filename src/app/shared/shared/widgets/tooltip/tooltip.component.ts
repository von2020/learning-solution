import { Component, Directive, Input, NgZone, OnInit } from '@angular/core';
import { CoursePreviewComponent } from 'src/app/components/course-preview/course-preview.component';
import { Title, Meta } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { LearnerService } from 'src/app/services/learner.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { ValidateService } from 'src/app/services/validate.service';
import { SharedService } from 'src/app/services/shared.service';

@Directive({
  selector: '.tooltip-container',
})
export class TooltipContainerDirective {}

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
})
export class TooltipComponent implements OnInit {
  @Input() courseAmount: any;
  @Input() courseTypeName: String;
  @Input() courseName: String;
  @Input() courseDescription: String;
  @Input() courseImage: any;
  @Input() aboutCourse: String;
  @Input() firstName: String;
  @Input() courseId: any;
  @Input() lastName: String;
  @Input() dateCreated: String;
  @Input() levelTypeName: any;
  @Input() loading: boolean = false;

  currentRate = 0;

  constructor(
    private titleService: Title,
    private meta: Meta,
    private authService: AuthService,
    private courseService: CourseService,
    private learnerService: LearnerService,
    private facilitatorService: FacilitatorService,
    private route: ActivatedRoute,
    private validateService: ValidateService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService,
    private sendDataService: SendDataService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private zone: NgZone
  ) {}

  ngOnInit() {}

  getCart(courseId) {
    console.log(courseId);
    let myComponent = new CoursePreviewComponent(
      this.titleService,
      this.meta,
      this.authService,
      this.courseService,
      this.learnerService,
      this.facilitatorService,
      this.route,
      this.validateService,
      this.router,
      this._flashMessagesService,
      this.sendDataService,
      this.toastr,
      this.sharedService,
      this.zone
    );
    this.sharedService.sendClickEvent(courseId);
    myComponent.getCart();
  }

  getPassCodeCart(courseId) {
    console.log(courseId);
    let myComponent = new CoursePreviewComponent(
      this.titleService,
      this.meta,
      this.authService,
      this.courseService,
      this.learnerService,
      this.facilitatorService,
      this.route,
      this.validateService,
      this.router,
      this._flashMessagesService,
      this.sendDataService,
      this.toastr,
      this.sharedService,
      this.zone
    );
    this.sharedService.sendClickEvent(courseId);
    myComponent.getPassCodeCart();
  }
}
