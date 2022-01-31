import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CourseQuizService } from 'src/app/services/courseQuiz.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { ValidateService } from 'src/app/services/validate.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { CourseService } from 'src/app/services/course.service';
import { LearnerService } from 'src/app/services/learner.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
declare var $: any;

@Component({
  selector: 'app-course-class',
  templateUrl: './course-class.component.html',
  styleUrls: ['./course-class.component.css'],
})
export class CourseClassComponent implements OnInit, AfterViewInit, OnDestroy {
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
  // @ViewChild(HomeComponent, { static: true}) homeComponent: HomeComponent;

  id: number;
  private sub: any;
  course: any;
  LearnerId: any;
  facilitatorId: any;
  facilitator: any;
  Quizzes: any = [];
  customStyle = {
    backgroundColor: '#1c1d1f',
    border: '1px solid #7e7e7e',
    borderRadius: '50%',
    color: '#fff',
    cursor: 'pointer',
  };
  // courseTopicContents: any;
  courseTopicLists: any;
  videoUrl: any;
  courseRating: any = 'Select Rating';
  currentRate: any = 0;
  reviewNote: any;
  isRate: any;
  courseTopicCount: any;
  students: any;
  checked: Boolean = false;
  showShorterDesciption = true;
  isCourseCompleted: boolean = false;
  url: any[];
  // checked: Boolean = false

  duration = 0;
  timeStarted = -1;
  timePlayed = 0;
  checkboxId: any;
  videoId: any;
  courseRaters: any;
  leaveRating: boolean = false;
  courseTopicId: any;
  enrolledCourses: any;
  courseEnrolleeId: any;
  courseEnrolled: any;
  courseTopicMaterials: any;
  courseRate: any;
  learner: any;
  learnerFullName: string;
  documentUrl: string = null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private validateService: ValidateService,
    private router: Router,
    private courseService: CourseService,
    private learnerService: LearnerService,
    private facilitatorService: FacilitatorService,
    private _flashMessagesService: FlashMessagesService,
    private toastr: ToastrService,
    private sendDataService: SendDataService,
    private elRef: ElementRef,
    private zone: NgZone
  ) {
    // sessionStorage.setItem('activeCourse', this.route.snapshot.paramMap.get('id')) ;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT', this.id);
  }

  ngOnInit(): void {
    const learnerId = JSON.parse(this.authService.getId());
    this.LearnerId = learnerId;

    console.log(this.LearnerId);

    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.

      this.courseService.getCoursesById(this.id).subscribe(
        (category) => {
          console.log(category.data);
          if (category.statusCode == 200) {
            this.course = category.data[0];
            setTimeout(() => {
              $('.f-rating').starRating({
                // initialRating: this.courseRating,
                starSize: 18,
                readOnly: true,
                starShape: 'rounded',
                hoverColor: 'crimson',
                activeColor: 'salmon',
              });
            }, 2000);
            this.facilitatorId = category.data[0].courseData.facilitatorId;
            console.log(this.facilitatorId);
            this.getFacilitatorById(this.facilitatorId);
          }
          //  this.sendDataService.setMessage(category.data);
        },
        (err) => {
          console.log(err);
          return false;
        }
      );

      this.learnerService
        .getAllCoursesLearnerEnrolledFor(this.LearnerId)
        .subscribe(
          (data) => {
            console.log(data);
            if (data.statusCode == 200) {
              console.log(data.data);

              this.enrolledCourses = data.data;
              this.courseEnrolled = this.enrolledCourses.filter((item) => {
                return item.courseId == this.id;
              });
              console.log(this.courseEnrolled);
              this.courseEnrolleeId = this.courseEnrolled[0].id;
              console.log(this.courseEnrolleeId);
            }
          },
          (err) => {
            console.log(err);
            // this.message = "An Error Occured. Could not get your Courses"
            return false;
          }
        );

      this.getLeanerById(this.LearnerId);
      this.getCreatedCourseTopics(this.id);
      this.getStudentsCount(this.id);
      this.getCourseRaters(this.id);
    });

    var $el, $p, $ps, $up, totalHeight;

    $('.show-less-description').click(function () {
      totalHeight = 0;

      $el = $(this);
      $p = $el.parent();
      $up = $p.parent();
      $ps = $up.find("p:not('.read-more')");

      // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
      $ps.each(function () {
        totalHeight += $(this).outerHeight();
      });

      $up
        .css({
          // Set height to prevent instant jumpdown when max height is removed
          height: $up.height(),
          'max-height': 9999,
        })
        .animate({
          height: totalHeight,
        });

      // fade out read-more
      $p.fadeOut();

      // prevent jump-down
      return false;
    });

    // Add down arrow icon for collapse element which is open by default
    $('.collapse.show').each(function () {
      $(this)
        .prev('.card-header')
        .find('.fa')
        .addClass('fa-angle-down')
        .removeClass('fa-angle-right');
    });

    // Toggle right and down arrow icon on show hide of collapse element
    $('.collapse')
      .on('show.bs.collapse', function () {
        $(this)
          .prev('.card-header')
          .find('.fa')
          .removeClass('fa-angle-right')
          .addClass('fa-angle-down');
      })
      .on('hide.bs.collapse', function () {
        $(this)
          .prev('.card-header')
          .find('.fa')
          .removeClass('fa-angle-down')
          .addClass('fa-angle-right');
      });

    // $(function(){
    $('#menu-toggle').click(function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });

    $(window).resize(function (e) {
      if ($(window).width() <= 768) {
        $('#wrapper').removeClass('toggled');
      } else {
        $('#wrapper').addClass('toggled');
      }
    });
    // });

    $('.course-rating').starRating({
      starShape: 'rounded',
      hoverColor: 'gold',
      activeColor: 'salmon',
      starSize: 80,
      strokeWidth: 14,
      emptyColor: '#ffffff',
      strokeColor: 'lightgray',
      ratedColors: ['#e2c181', '#ffa700', '#c4573e', '#9a321a', '#5e1e0f'],
      disableAfterRate: false,
      onHover: function (currentIndex, currentRating, $el) {
        console.log(
          'index: ',
          currentIndex,
          'currentRating: ',
          currentRating,
          ' DOM element ',
          $el
        );

        switch (currentIndex) {
          case 0.5:
            this.courseRating = 'So Awful';
            break;
          case 1:
            this.courseRating = 'Awful, Not What i Expected';
            break;
          case 1.5:
            this.courseRating = 'Awful, Poor';
            break;
          case 2:
            this.courseRating = 'Poor, Pretty Disappointed';
            break;
          case 2.5:
            this.courseRating = 'Poor/ Average';
            break;
          case 3:
            this.courseRating = 'Average, Could be better';
            break;
          case 3.5:
            this.courseRating = 'Average/ Good';
            break;
          case 4:
            this.courseRating = 'Good. What i Expected';
            break;
          case 4.5:
            this.courseRating = 'Good Amazing';
            break;
          case 5:
            this.courseRating = 'Amazing, above expectations';
            break;
          default:
            this.courseRating = 'Select Rating';
        }

        console.log(this.courseRating);

        // $('.live-rating').text(currentIndex);
        $('.live-rating').text(this.courseRating);
      },
      onLeave: function (currentIndex, currentRating, $el) {
        console.log(
          'index: ',
          currentIndex,
          'currentRating: ',
          currentRating,
          ' DOM element ',
          $el
        );
        // $('.live-rating').text(currentRating);
        // this.rateCourse(currentRating);

        // $('.live-rating').text(this.courseRating);
      },
      callback: (currentRating, $el) => {
        // alert('rated ' +  currentRating);
        // console.log('DOM Element ', $el);
        $('.confirm-rate').hide();
        $('.confirm-review').show();
        // this.ratingCourse(currentRating);
        this.isRate = currentRating;

        $('.my-rating').starRating({
          starSize: 18,
          initialRating: currentRating,
          readOnly: true,
          starShape: 'rounded',
          hoverColor: 'crimson',
          activeColor: 'salmon',
        });
      },
    });

    $('.back-button').click(function () {
      $('.confirm-rate').show();
      $('.confirm-review').hide();
    });
  }

  // updateChecked($event) {
  //   // This will be handled in Redux/ngrx...
  //   if ($event.value) {
  //     this.checked.push($event.id);
  //   }
  //   else {
  //     this.checked = this.checked.filter((i) => i !== $event.id);
  //   }
  // }

  alterDescriptionTexts() {
    this.showShorterDesciption = !this.showShorterDesciption;
  }

  getFacilitatorById(id) {
    this.facilitatorService.getFacilitatorById(id).subscribe(
      (detail) => {
        console.log(detail.data);
        this.facilitator = detail.data;
        // this.sendDataService.setMessage(detail.data);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  viewDocument(url) {
    console.log(url)
    this.documentUrl = url
  }

  closeDocumentViewer() {
    console.log("document viewer closed")
    this.documentUrl = null
  }

  getLeanerById(id) {
    this.learnerService.getLearnerById(id).subscribe(
      (detail) => {
        console.log(detail.data);
        this.learner = detail.data;
        this.learnerFullName =
          this.learner.firstName + ' ' + this.learner.lastName;
        // this.sendDataService.setMessage(detail.data);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getCreatedCourseTopics(courseId) {
    this.courseService.getCourseTopicByCourseId(courseId).subscribe(
      (detail) => {
        console.log(detail.data);
        // this.courseTopicId = detail.data.id;
        if (detail.statusCode == 200) {
          this.courseTopicLists = detail.data;
          this.courseTopicCount = this.courseTopicLists.length;
          this.courseTopicMaterials = [];

          // this.courseTopicLists.forEach((element) => {
          //   this.courseTopicMaterials.push(element.courseTopic.material);
          // });
          // console.log(this.courseTopicMaterials);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getStudentsCount(courseId) {
    this.learnerService.getAllCourseEnrolledForByCourseId(courseId).subscribe(
      (data) => {
        console.log(data);
        if (data.statusMessage == 'Successful') {
          this.students = data.data.length;
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getCourseCertificate() {
    this.learnerService.getCourseCertificate(this.LearnerId, this.id).subscribe(
      (data) => {
        console.log(data);
        if (data.statusMessage == 'Successful') {
          console.log(data.statusMessage);
          this.router.navigate(['/certificate'], { queryParams: data.data });
          // this.sendDataService.setMessage(data.data);
          // this.isCourseCompleted = true
        } else {
          this.toastr.info(data.statusMessage);
          console.log(data.statusMessage);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getCourseRaters(courseId) {
    this.courseService.getCourseRatingByCourseId(courseId).subscribe(
      (rating) => {
        console.log(rating);
        // this.courseTopicId = detail.data.id;
        if (rating.statusCode == 200) {
          if (rating.statusMessage == 'No Available Record') {
            this.leaveRating = true;
          } else {
            this.courseRate = rating.data.length;
            this.courseRaters = rating.data;
            this.courseRaters = this.courseRaters.filter((item) => {
              return item.learnerId == this.LearnerId;
            });

            console.log(this.courseRaters);

            if (this.courseRaters.length != 0) {
              this.leaveRating = false;
            } else {
              this.leaveRating = true;
            }
          }
        } else {
          console.log(rating.statusMessage);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  ratingCourse() {
    const rate = {
      LearnerId: this.LearnerId,
      CourseId: this.id,
      RatingValue: this.isRate,
    };

    console.log(rate);

    let serializedForm = JSON.stringify(rate);
    console.log(serializedForm);

    this.learnerService.rateCourse(serializedForm).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
          // alert('rated ' +  this.isRate);
          this.toastr.success(data.statusMessage);
          // this.zone.run(() => {
          // this.router.navigate(['/courses-learner'])
          // });
          this.reviewingCourse();
        } else {
          this.toastr.error(
            data.statusMessage,
            'Something Went Wrong, Please Try Again!',
            {
              timeOut: 3000,
            }
          );
          this._flashMessagesService.show(data.statusMessage, {
            cssClass: 'alert-danger',
            closeOnClick: true,
            timeout: 5000,
          });

          console.log(data.statusMessage);
          alert(data.statusMessage);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  reviewingCourse() {
    const review = {
      LearnerId: this.LearnerId,
      CourseId: this.id,
      ReviewNote: this.reviewNote,
    };

    console.log(review);

    let serializedForm = JSON.stringify(review);
    console.log(serializedForm);

    this.learnerService.reviewCourse(serializedForm).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
          // this.zone.run(() => {
          // this.router.navigate(['/courses-learner'])
          $('#addRatingModal').modal('hide');
          this.toastr.success(data.statusMessage);
          // alert(data.statusMessage)
          // });
        } else {
          $('#addRatingModal').modal('hide');
          this.toastr.error(
            data.statusMessage,
            'Something Went Wrong, Please Try Again!',
            {
              timeOut: 3000,
            }
          );
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});

          console.log(data.statusMessage);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  playPreview() {}
}
