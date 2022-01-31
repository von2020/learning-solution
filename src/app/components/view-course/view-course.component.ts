import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { CourseService } from 'src/app/services/course.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { AdminService } from 'src/app/services/admin.service';
declare var $: any;
declare var videojs: any;

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css'],
})
export class ViewCourseComponent implements OnInit, OnDestroy {
  public videoJsConfigObj = {
    preload: 'metadata',
    controls: true,
    autoplay: false,
    overrideNative: true,
    techOrder: ['html5', 'flash'],
    html5: {
      nativeVideoTracks: false,
      nativeAudioTracks: false,
      nativeTextTracks: false,
      hls: {
        withCredentials: false,
        overrideNative: true,
        debug: true,
      },
    },
  };

  id: number;
  private sub: any;
  course: any;
  courseTopicContents: any;
  courseTopicLists: any;
  objectiveContents: any;
  requirementContents: any;
  totalAmount: any = 0;
  videoUrl: any;
  require: any;

  

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService,
    private courseService: CourseService,
    private adminService: AdminService,
    private router: Router,
    private _location: Location
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    var player = videojs('my-video', this.videoJsConfigObj);
    player.dispose();
  }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.id = +params['id'];

      console.log(this.id);
      this.courseService.getCoursesById(this.id).subscribe(
        (course) => {
          console.log(course);
          if (course.statusCode == 200) {
            this.course = course.data[0];
            this.totalAmount = course.data[0].courseData.courseAmount;
          }
          //  this.sendDataService.setMessage(category.data);
        },
        (err) => {
          console.log(err);
          return false;
        }
      );

      this.getCreatedCourseTopics(this.id);
      this.getCourseObjectives(this.id);
      this.getCourseRequirements(this.id);
    });
  }

  backClicked() {
    this._location.back();
  }

  playVideo(url) {
    console.log(url);
    var player = videojs('my-video', this.videoJsConfigObj);
    player.src(url);
    this.videoUrl = url;
    player.hlsQualitySelector();
  }

  stopVideo() {
    var player = videojs('my-video', this.videoJsConfigObj);
    player.pause();
    // player.currentTime = 0;
  }

  getCreatedCourseTopics(courseId) {
    this.courseService.getCourseTopicByCourseId(courseId).subscribe(
      (detail) => {
        console.log(detail.data);
        // this.courseTopicId = detail.data.id;
        if (detail.statusCode == 200) {
          this.courseTopicLists = detail.data;
          console.log(detail.data[0].courseTopic.video);
        }
        // console.log(this.courseTopicId);
        // this.courseTopicLists = this.courseTopicLists.filter((ser) => {
        //   return ser.id !== this.courseTopicId;
        // });
        // $('#dataList .more-course-list .fcourses').hideMaxListItems({ 'max':4, 'speed':500, 'moreText':'READ MORE ([COUNT])' });
        // this.courseTopicLists.splice(0, 0, this.)
        // this.sendDataService.setMessage(detail.data);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  approveCourse(id) {
    console.log(id);

    this.adminService.approveCourseCreation(id).subscribe((data) => {
      console.log(data);
      if (data.statusMessage == 'Course Approved and Verified Successfully') {
        this.toastr.success('Course Approved and Verified Successfully');
        this._location.back();
      } else if (data.statusMessage == 'No Course with the specified ID') {
        this.toastr.info(data.statusMessage);
      } else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
      }
    });
  }

  approveVideo(id) {
    console.log(id);

    this.adminService.approveCourseTopicVideo(id).subscribe((data) => {
      console.log(data);
      if (
        data.statusMessage ==
        'Course Topic Video Approved and Verified Successfully'
      ) {
        this.toastr.success(data.statusMessage);
      } else if (data.statusMessage == 'No Course with the specified ID') {
        this.toastr.info(data.statusMessage);
      } else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
      }
    });
  }

  approveMaterial(id) {
    console.log(id);

    this.adminService.approveCourseTopicMaterial(id).subscribe((data) => {
      console.log(data);
      if (
        data.statusMessage ==
        'Course Topic Material Approved and Verified Successfully'
      ) {
        this.toastr.success(data.statusMessage);
      } else if (data.statusMessage == 'No Course with the specified ID') {
        this.toastr.info(data.statusMessage);
      } else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
      }
    });
  }

  declineVideo(id) {}

  getCourseObjectives(id) {
    this.courseService.getCourseObjectivesbyCourseId(id).subscribe(
      (detail) => {
        console.log(detail.data);
        this.objectiveContents = detail.data;
        console.log(detail);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getCourseRequirements(id) {
    this.courseService.getCourseRequirementsbyCourseId(id).subscribe(
      (detail) => {
        this.requirementContents = detail.data;
        console.log(detail);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  onLogoutClick() {
    $('#logoutModal').modal('hide');
    this.authService.logout();
    this.toastr.success('Logout Successfull');
    this.router.navigate(['/login-super-admin']);
    return false;
  }
}
