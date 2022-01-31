import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { Subscription } from 'rxjs';
declare var $: any;
declare var videojs: any;
declare var PaystackPop: any;

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.css'],
})
export class CoursePreviewComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public videoJsConfigObj = {
    preload: 'metadata',
    controls: true,
    autoplay: true,
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
  cartItems: any;
  CartId: any;
  courseTopicContents: any;
  courseTopicLists: any;
  sectionListIdName: string;
  couponCode: string;
  facilitatorCourses: any;

  Email: String;
  Password: String;
  loginForm: FormGroup;
  firstname: any;
  showModal: boolean;
  Code: String;

  key: any;
  reference: any;
  amount: number;
  user: any;
  error: any;
  success: string;
  paymentForm: any;
  email: any;
  courseId: any;
  facilitatorDetail: any;
  totalAmount: any = 0;
  subTotal: any;
  loading: boolean;
  paytypetxt: any;
  paykey: string;
  showShortDesciption = true;
  showShorterDesciption = true;

  customStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #7e7e7e',
    borderRadius: '50%',
    color: '#7e7e7e',
    cursor: 'pointer',
  };
  videoUrl: any;
  courseReviews: any;
  showBadge: boolean;
  objectiveContents: any;
  requirementContents: any;
  courseRating: any;
  categoryId: any;
  topCategorys: any;
  courseRate: any;
  subCategoryName: string;
  categoryName: string;
  ratings: any;
  rating: any;
  profilePicture: any;
  courseResources: any = 0;
  students: any;
  passcodeVerified: boolean = false;
  selectedPay: boolean;
  clickEventSubscription: Subscription;

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
  ) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe(
      (data) => {
        console.log(data);
        this.id = data;
        // if (data == 'cart') {
        //   this.getCart();
        // } else if (data == 'passcode') {
        //   this.getPassCodeCart();
        // }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    var player = videojs('my-video', this.videoJsConfigObj);
    player.dispose();
  }
  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT', this.id);

    $('article').readmore({
      speed: 500,
      moreLink: '<a href="#" class="rd-btn">View all</a>',
      lessLink: '<a href="#" class="rd-btn">View less</a>',
    });
    //adding new class for height
    // var heightClass = $('.addHeight').style.height;

    // var style = document.createElement('style');
    // style.type = 'text/css';
    // style.innerHTML = '.cssClass { color: #F00; }';
    // document.getElementsByTagName('head')[0].appendChild(style);

    // document.getElementById('someElementId').className = 'cssClass';

    // //get description height
    // var elementHeight = $('#descArticle').height();
    // console.log('element height', elementHeight);

    // //set description height
    // var newElementHeight = elementHeight / 2.5;
    // console.log('new element height', newElementHeight);
    // // $('#dataList.show-less-description').context.body.clientHeight =
    // //   newElementHeight;

    // heightClass = newElementHeight;

    // $('.show-less-description').addClass('.addHeight');

    // console.log('hi', heightClass);

    // var settingHeight = $('.show-less-description').height(newElementHeight);
    // // settingHeight = newElementHeight;
    // console.log('setting new element height', settingHeight);
  }

  ngOnInit(): void {
    this.meta.updateTag({ name: 'author', content: 'Softworks Limited' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'e-learning, online courses',
    });

    this.loginForm = new FormGroup({
      Password: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
    });

    const learnerId = JSON.parse(this.authService.getId());
    this.LearnerId = learnerId;

    // const courseObject = this.sendDataService.getMessage();
    // this.email = courseObject.email
    // console.log(courseObject);

    console.log(this.LearnerId);

    // this.key = this.authService.getKey;
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    // this.totalAmount = 5000;
    // this.email = "steevyn51@gmail.com"

    console.log('ON INIT', this.id);

    // const learnerId = JSON.parse(this.authService.getId());
    this.LearnerId = learnerId;

    console.log(this.LearnerId);

    this.sub = this.route.queryParams.subscribe((params) => {
      this.id = +params['id'];
    });

    //   this.sub = this.route.params.subscribe(params => {
    //     this.id = +params['id']; // (+) converts string 'id' to a number

    //     // In a real app: dispatch action to load the details here.
    //  });
    console.log(this.id);
    this.courseService.getCoursesById(this.id).subscribe(
      (category) => {
        console.log(category.data);
        if (category.statusCode == 200) {
          this.course = category.data[0];
          this.categoryId = category.data[0].courseData.courseCategoryId;
          this.subCategoryName =
            category.data[0].courseData.courseSubCategoryName;
          this.categoryName = category.data[0].courseData.courseCategoryName;
          this.totalAmount = category.data[0].courseData.courseAmount;
          this.facilitatorId = category.data[0].courseData.facilitatorId;
          console.log(this.course);
          console.log(
            'coursename',
            this.course.courseData.courseName as string
          );
          console.log(this.facilitatorId);
          console.log(this.totalAmount);

          const title = this.course.courseData.courseName as string;

          this.titleService.setTitle(title + ' - expertplat');

          this.meta.updateTag({
            name: 'name',
            content: this.course.courseData.courseName as string,
          });
          this.meta.updateTag({
            name: 'description',
            content: this.course.courseData.courseSubTitle,
          });
          this.getFacilitatorById(this.facilitatorId);
          this.getAllCoursesByFacilitatorId(this.facilitatorId);
          this.getTopCourseCategory(this.categoryId);
        }
        //  this.sendDataService.setMessage(category.data);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );

    this.createMostViewedCourses(this.id);
    console.log(this.id);
    this.getCreatedCourseTopics(this.id);
    this.getAverageCourseRating(this.id);
    this.getCourseRaters(this.id);
    this.getCourseReviews();
    this.getCourseObjectives(this.id);
    this.getCourseRequirements(this.id);
    this.sectionListIdName = 'section-list' + Date.now();
    //  this.facilitatorId = JSON.parse(this.authService.getFId());
    //  console.log(this.facilitatorId)

    // var elementHeight = document.getElementById('dataList').clientHeight;
    // console.log('element height', elementHeight);

    $('#hide').click(function () {
      $('.couponText').hide();
      $('#Create').toggle();
    });
    $('#show').click(function () {
      $('.couponText').show();
      $('#Create').toggle();
    });

    $('#exampleModal')
      .modal({
        show: false,
      })
      .on('hidden.bs.modal', function () {
        $(this).find('video')[0].pause();
      });

    $('#dataList .more-course-list .fcourses').hideMaxListItems({
      max: 4,
      speed: 500,
      moreText: 'READ MORE ([COUNT])',
    });

    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });

    $('.my-rating').starRating({
      initialRating: 2,
      starSize: 18,
      starShape: 'rounded',
      hoverColor: 'crimson',
      activeColor: 'salmon',
      // callback: (currentRating, $el)=> {
      //   $('your-selector').starRating('setRating', 2.5);
      // }
    });

    $('.course-rating').starRating({
      starSize: 18,
      readOnly: true,
      starShape: 'rounded',
      hoverColor: 'crimson',
      activeColor: 'salmon',
    });

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

    var $el, $p, $ps, $up, totalHeight;

    $('.show-less').click(function () {
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

    //   $('span').click(function () {
    //     $('#datalist li:hidden').slice(0, 2).show();
    //     if ($('#datalist li').length == $('#datalist li:visible').length) {
    //         $('span ').hide();
    //     }
    // });

    //   $('.test').readall({
    //     // Default values
    //     showheight: 96,                         // height to show
    //     showrows: null,                         // rows to show (overrides showheight)
    //     animationspeed: 200,                    // speed of transition
    //     btnTextShowmore: 'Read more',           // text shown on button to show more
    //     btnTextShowless: 'Read less',           // text shown on button to show less
    //     btnClassShowmore: 'readall-button',     // class(es) on button to show more
    //     btnClassShowless: 'readall-button'      // class(es) on button to show less
    // });

    // // EXAMPLE USAGE ON 3 LISTS
    // 	$('.preview-section #accordion').hideMaxListItems();
    // $('.preview-section #accordion').hideMaxListItems({ 'max':4, 'speed':500, 'moreText':'READ MORE ([COUNT])' });

    // 	$('.preview-section #accordion').hideMaxListItems({
    // 		'max':6,
    // 		'speed':2000,
    // 		'moreText':'MORE OF THEM',
    // 		'lessText':'READ LESS <em>Can Use HTML</em>',
    // 		'moreHTML': '<div class="maxlist-more"><a class="btn mb-3 soft-btn" type="submit"> [COUNT] more Sections</a></div>'
    // 	});
    // // TESTING DYNAMICALLY ADDING ITEMS AND UPDATING
    // $("#dynamicAdd").on("click",function(e){
    // 	e.preventDefault();
    // 	$('#content ul.first').append('<li>DYNAMIC LIST ITEM 1</li><li>DYNAMIC LIST ITEM 2</li><li>DYNAMIC LIST ITEM 3</li>');
    // 	$('#content ul.first').hideMaxListItems({ 'max':4, 'speed':500, 'moreText':'READ MORE ([COUNT])' });

    // });
    // $("#dynamicRemove").on("click",function(e){
    // 	e.preventDefault();
    // 	$('#content ul.first > li').not(':nth-child(1),:nth-child(2),:nth-child(3)').remove();
    // 	$('#content ul.first').hideMaxListItems({ 'max':4, 'speed':500, 'moreText':'READ MORE ([COUNT])' });
    // });

    /*------------------
			Badge
		--------------------*/
    // $("#badgevisibility").hide();
    // $(".clickme").click(function() {
    //   $("#badgevisibility").fadeToggle(300);
    //   });
  }

  getCourseRaters(id) {
    this.courseService.getCourseRatingByCourseId(id).subscribe(
      (rating) => {
        console.log(rating);
        // this.courseTopicId = detail.data.id;
        if (rating.statusCode == 200) {
          this.courseRate = rating.data.length;
          console.log(this.courseRate);
        } else if (rating.statusCode == 'No Available Record') {
          this.courseRate == 0;
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getAverageCourseRating(id) {
    this.courseService.getAverageCourseRatingByCourseId(id).subscribe(
      (rating) => {
        console.log(rating);
        // this.courseTopicId = detail.data.id;
        if (rating.statusCode == 200) {
          this.courseRating = rating.data;
          $('.previewCourse-rating').starRating({
            initialRating: this.courseRating,
            starSize: 18,
            readOnly: true,
            starShape: 'rounded',
            hoverColor: 'crimson',
            activeColor: 'salmon',
          });
          console.log(this.courseRating);
        } else if (rating.statusCode == 'No Available Record') {
          this.courseRating == 0;
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

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

  noPreview() {
    this.toastr.info('No Preview Available');
  }

  playPreview(url) {
    console.log(url);
    var player = videojs('my-video', this.videoJsConfigObj);
    player.src(url);
    this.videoUrl = url;
    $('#exampleModal').modal('show');
  }

  playVideo(url) {
    console.log(url);
    var player = videojs('my-video', this.videoJsConfigObj);
    player.src(url);
    this.videoUrl = url;
    $('#exampleModal').modal('show');
  }

  getFacilitatorById(id) {
    this.facilitatorService.getFacilitatorById(id).subscribe(
      (detail) => {
        console.log(detail.data);
        this.facilitator = detail.data;
        var dp = this.authService.baseUrl;
        this.profilePicture = this.facilitator.profilePictureUrl;
        // this.profilePicture = dp+this.facilitator.profilePictureUrl;
        // this.sendDataService.setMessage(detail.data);
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
          this.students = data.data;
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getAllCoursesByFacilitatorId(id) {
    this.facilitatorService.getAllCoursesByFacilitatorId(id).subscribe(
      (detail) => {
        console.log(detail.data);
        this.facilitatorCourses = detail.data;
        // this.sendDataService.setMessage(detail.data);
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
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getTopCourseCategory(id) {
    this.courseService.getTopCoursesInCourseCategory(id).subscribe(
      (data) => {
        console.log(data);
        this.topCategorys = data.data;
        setTimeout(() => {
          this.initCarousel();
        }, 3000);
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
        console.log(detail);
        // this.courseTopicId = detail.data.id;
        if (detail.statusMessage == 'Successful!') {
          this.courseTopicLists = detail.data;
          console.log(this.courseTopicLists);
          // if (this.course.courseData.courseTypeName == 'PassCode') {
          //   this.courseTopicContents = detail.data[0].material;
          //   console.log(detail.data[0].material);
          //   console.log(this.courseTopicContents);
          //   console.log(this.courseTopicLists);

          //   var materials = [];
          //   this.courseTopicLists.forEach((element) => {
          //     element.courseTopic.material.forEach((topic) => {
          //       materials.push(topic);
          //     });
          //   });

          //   console.log(this.courseResources);

          //   this.courseResources = materials;
          // } else {
          //   this.courseTopicContents = detail.data[0].video;
          //   console.log(detail.data[0].video);
          //   console.log(this.courseTopicContents);
          //   console.log(this.courseTopicLists);

          //   var materials = [];
          //   this.courseTopicLists.forEach((element) => {
          //     element.courseTopic.video.forEach((topic) => {
          //       topic.courseTopicVideoMaterials.forEach((vid) => {
          //         materials.push(vid);
          //       });
          //     });
          //   });
          //   console.log(this.courseResources);

          //   this.courseResources = materials;
          // }
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

  // getCreatedCourseTopicVideos(value:string) {
  //   this.authService.getCourseTopicVideosByCourseTopicId(value).subscribe(detail => {
  //     console.log(detail.data);
  //     // this.courseTopicId = detail.data.id;
  //     this.courseTopicContents = detail.data;
  //     console.log(detail);
  //     // console.log(this.courseTopicId);
  //     // this.courseTopicLists = this.courseTopicLists.filter((ser) => {
  //     //   return ser.id !== this.courseTopicId;
  //     // });

  //     // this.courseTopicLists.splice(0, 0, this.)
  //     // this.sendDataService.setMessage(detail.data);
  //   },
  //   err => {
  //     console.log(err);
  //     return false;
  //   });
  // }

  initCarousel() {
    $('.regular').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  }

  courseEnroll() {
    const cart = {
      LearnerId: this.LearnerId,
      CartId: Number(this.CartId),
    };

    console.log(cart);

    let serializedForm = JSON.stringify(cart);
    console.log(serializedForm);

    this.learnerService.courseEnroll(serializedForm).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          this._flashMessagesService.show(data.statusMessage, {
            cssClass: 'alert-success',
            closeOnClick: true,
          });
          this.authService.removeCart();
          this.zone.run(() => {
            this.router.navigate(['/courses-learner']);
          });
          // this.router.navigate(['login'])
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          // this.router.navigate(['confirmation'])
          console.log(data.statusMessage);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption;
  }

  alterDescriptionTexts() {
    this.showShorterDesciption = !this.showShorterDesciption;
  }

  applyCouponCode() {
    this.courseService.applyCouponCode(this.couponCode).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          var percentageOff = data.data.couponPercentage;
          console.log(data.data.couponPercentage);
          this.totalAmount = ((percentageOff / 100) * this.totalAmount).toFixed(
            3
          );
          // this.totalAmount = this.percentage(percentageOff, this.totalAmount);
          console.log(this.totalAmount);
          this.toastr.success(data.statusMessage);
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          console.log(data.statusMessage);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  percentage(num, per) {
    return (num / 100) * per;
  }

  getCourseReviews() {
    this.courseService.getCourseRatingAndReviewByCourseId(this.id).subscribe(
      (review) => {
        console.log(review);
        // this.courseTopicId = detail.data.id;
        if (review.statusCode == 200) {
          this.courseReviews = review.data;
          this.courseReviews = this.courseReviews.filter((item) => {
            return (
              item.rating_Value != '' &&
              item.date_Rated != '' &&
              item.review_Note != '' &&
              item.review_Date != ''
            );
          });
          setTimeout(() => {
            $('.reviewCourse-rating').starRating({
              starSize: 18,
              starShape: 'rounded',
              readOnly: true,
            });
          }, 2000);

          console.log(this.courseReviews);
        }

        console.log(this.ratings);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  onLoginSubmit() {
    const value = this.loginForm.value;
    // let formObj = value.getRawValue();
    let serializedForm = JSON.stringify(value);
    console.log(serializedForm);
    // const user = {
    //   email: this.Email,
    //   password: this.Password
    // }

    //Required Fields
    if (!this.validateService.validateRegister(this.loginForm.value)) {
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      this.toastr.error('Please fill in all fields', 'Something Went Wrong!', {
        timeOut: 3000,
      });
      // this._flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      console.log('Please fill in all fields');
      // this.ngFlashMessageService.showFlashMessage('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(this.loginForm.value.Email)) {
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      this.toastr.error('Please use a valid email', 'Something Went Wrong!', {
        timeOut: 3000,
      });
      // this._flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });

      console.log('Please use a valid email');
      return false;
    }

    this.authService.loginLearner(serializedForm).subscribe((data) => {
      console.log(data);
      if (data.statusCode == 200) {
        let userFirstname = data.data.firstName;
        this.sendDataService.setMessage(userFirstname.toString());
        console.log(userFirstname.toString());
        this.authService.storeUserData(
          'Bearer ' + data.token,
          data.data,
          data.data.userId
        );
        this.toastr.success('You can now Coninue');
        // this._flashMessagesService.show('You can now continue', {cssClass: 'alert-success', closeOnClick: true,});
        $('#myModal').modal('hide');
        // this.router.navigate(['/cart'])
      } else if (
        data.statusMessage == 'This Account Exist but has not been Activated!'
      ) {
        let userEmail = this.loginForm.value.Email;
        this.sendDataService.setMessage(userEmail);
        this.email = userEmail;
        this.resendLearnerCode();
        console.log(this.email);
        // this.router.navigate(['/confirmation'])
        $('#myModal').modal('hide');
        $('#confirmModal').modal('show');
      } else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
        // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
        // this.router.navigate(['/login'])
      }
    });
  }

  resendLearnerCode() {
    this.learnerService.resendLearnerActivationCode(this.email).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          this.toastr.success(data.statusMessage);
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});

          // this.router.navigate(['login'])
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          // this.router.navigate(['confirmation'])
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  onActivateSubmit() {
    const user = {
      email: this.email,
      Code: this.Code,
    };

    this.learnerService.activateAccount(user).subscribe((data) => {
      console.log(data);
      if (data.statusCode == 200) {
        this.toastr.success(data.statusMessage);
        // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
        console.log(data);
        // this.router.navigate(['login'])
        $('#confirmModal').modal('hide');
        $('#myModal').modal('show');
      } else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
        // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
        // this.router.navigate(['confirmation'])
      }
    });
  }

  createMostViewedCourses(courseId) {
    this.courseService.createMostViewdCourses(courseId).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          console.log(data.data);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  verifyPassCode(passCode) {
    this.learnerService.verifyPasscode(this.id, passCode).subscribe(
      (detail) => {
        console.log(detail);
        if (detail.statusCode == 200) {
          this.passcodeVerified == true;
          $('#passcodeModal').modal('hide');
          this.toastr.success(detail.statusMessage, 'Success!', {
            timeOut: 3000,
          });
          if (this.authService.cartExist()) {
            this.addToExisitingCart();
          } else {
            this.createCart();
          }

          if (this.selectedPay == true) {
            if (this.authService.cartExist()) {
              const cart = {
                CartId: this.authService.getCartId(),
                CourseId: this.id,
              };

              this.learnerService.addToCart(cart).subscribe(
                (data) => {
                  console.log(data);
                  if (data.statusCode == 200) {
                    // this.addToCart();
                    // alert("added to cart")
                    $('#cartBadgevisibility').show();
                    this.cartItems = data.cartItems;
                    this.toastr.success('Added to Cart');
                    this.courseEnroll();
                    // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
                    // this.router.navigate(['login'])
                  } else {
                    this.toastr.error(data.statusMessage);
                    // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
                    // this.router.navigate(['confirmation'])
                    console.log(data.statusMessage);
                  }
                },
                (err) => {
                  console.log(err);
                  return false;
                }
              );
            } else {
              this.learnerService.createCart().subscribe(
                (data) => {
                  console.log(data);
                  if (data.statusCode == 200) {
                    this.authService.storeCartData(data.data.id);
                    console.log(data.data.id);
                    this.CartId = data.data.id;
                    const cart = {
                      CartId: this.CartId,
                      CourseId: this.id,
                    };

                    this.learnerService.addToCart(cart).subscribe(
                      (data) => {
                        console.log(data);
                        if (data.statusCode == 200) {
                          // this.addToCart();
                          // alert("added to cart")
                          $('#cartBadgevisibility').show();
                          this.showBadge = true;
                          this.cartItems = data.cartItems;
                          this.toastr.success('Added to Cart');
                          this.courseEnroll();
                          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
                          // this.router.navigate(['login'])
                        } else {
                          this.toastr.error(data.statusMessage);
                          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
                          // this.router.navigate(['confirmation'])
                          console.log(data.statusMessage);
                        }
                      },
                      (err) => {
                        console.log(err);
                        return false;
                      }
                    );
                  } else {
                    this.toastr.error(
                      data.statusMessage,
                      'Something Went Wrong!',
                      {
                        timeOut: 3000,
                      }
                    );
                    // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
                    // this.router.navigate(['confirmation'])
                  }
                },
                (err) => {
                  console.log(err);
                  return false;
                }
              );
            }
          }
          // this.learnerService.createCart().subscribe(
          //   (data) => {
          //     console.log(data);
          //     if (data.statusCode == 200) {
          //       this.authService.storeCartData(data.data.id);
          //       console.log(data.data.id);
          //       this.CartId = data.data.id;
          //       this.addToCart();
          //     } else {
          //       this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          //         timeOut: 3000,
          //       });
          //       // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          //       // this.router.navigate(['confirmation'])
          //     }
          //   },
          //   (err) => {
          //     console.log(err);
          //     return false;
          //   }
          // );
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  createCart() {
    // if (this.course.courseData.courseTypeName == 'PassCode') {
    //   $('#passcodeModal').modal('show');
    // } else {
    this.learnerService.createCart().subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          this.authService.storeCartData(data.data.id);
          console.log(data.data.id);
          this.CartId = data.data.id;
          this.addToCart();
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          // this.router.navigate(['confirmation'])
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
    // }
  }

  addToCart() {
    const cart = {
      CartId: this.CartId,
      CourseId: this.id,
    };

    this.learnerService.addToCart(cart).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          // this.addToCart();
          // alert("added to cart")
          $('#cartBadgevisibility').show();
          this.showBadge = true;
          this.cartItems = data.cartItems;
          this.toastr.success('Added to Cart');
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
          // this.router.navigate(['login'])
        } else {
          this.toastr.error(data.statusMessage);
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          // this.router.navigate(['confirmation'])
          console.log(data.statusMessage);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  addToExisitingCart() {
    const cart = {
      CartId: this.authService.getCartId(),
      CourseId: this.id,
    };

    this.learnerService.addToCart(cart).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          // this.addToCart();
          // alert("added to cart")
          $('#cartBadgevisibility').show();
          this.cartItems = data.cartItems;
          this.toastr.success('Added to Cart');
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
          // this.router.navigate(['login'])
        } else {
          this.toastr.error(data.statusMessage);
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          // this.router.navigate(['confirmation'])
          console.log(data.statusMessage);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getCart() {
    // console.log('hi');
    if (this.authService.cartExist()) {
      this.addToExisitingCart();
    } else {
      this.createCart();
    }
  }

  getPassCodeCart() {
    // console.log('hi');
    if (this.learnerService.loggedIn()) {
      $('#passcodeModal').modal('show');
    } else {
      $('#myModal').modal('show');
    }
    // if (this.authService.cartExist()) {
    //   this.addToExisitingCart();
    // } else {
    //     this.createCart();
    //   }
  }

  balancePayment() {
    this.getCart();
    if (this.learnerService.loggedIn()) {
      const learnerId = JSON.parse(this.authService.getId());
      this.LearnerId = learnerId;
      this.email = this.authService.getEmail();
      // this.getLearnerDetail(this.LearnerId);
      console.log(this.LearnerId);
      console.log(this.email);

      if (this.totalAmount == 0) {
        setTimeout(() => {
          this.courseEnroll();
        }, 2000);
      } else {
        this.pay();
      }
    } else {
      $('#myModal').modal('show');
    }
  }

  closePayment() {
    this.selectedPay = true;
    // if (this.passcodeVerified == true) {
    // this.getCart();
    // }
    // this.getPassCodeCart();
    // if (this.authService.cartExist()) {
    //   this.addToExisitingCart();
    // } else {
    //   $('#passcodeModal').modal('show');
    // console.log(this.passcodeVerified);
    // if (this.passcodeVerified == true) {
    if (this.learnerService.loggedIn()) {
      const learnerId = JSON.parse(this.authService.getId());
      this.LearnerId = learnerId;
      this.email = this.authService.getEmail();
      // this.getLearnerDetail(this.LearnerId);
      console.log(this.LearnerId);
      console.log(this.email);
      $('#passcodeModal').modal('show');
      // if (this.passcodeVerified == false) {
      //   $('#passcodeModal').modal('show');
      // } else if (this.passcodeVerified == true) {
      //   this.courseEnroll();
      // }
      // if (this.course.courseData.courseTypeName == 'PassCode') {
      //   setTimeout(() => {
      //     this.courseEnroll();
      //   }, 2000);
      // } else {
      //   this.pay();
      // }
    } else {
      $('#myModal').modal('show');
    }
    // }
    // }
    // else {
    //   this.createCart();
    //   if (this.learnerService.loggedIn()) {
    //     const learnerId = JSON.parse(this.authService.getId());
    //     this.LearnerId = learnerId;
    //     this.email = this.authService.getEmail();
    //     // this.getLearnerDetail(this.LearnerId);
    //     console.log(this.LearnerId);
    //     console.log(this.email);

    //     if (this.totalAmount == 0) {
    //       setTimeout(() => {
    //         this.courseEnroll();
    //       }, 2000);
    //     } else {
    //       this.pay();
    //     }
    //   } else {
    //     $('#myModal').modal('show');
    //   }
    // }
  }

  pay() {
    this.paytypetxt = $('#ddlServiceName option:selected').text();
    this.paykey = this.authService.getKey;
    this.amount = this.totalAmount * 100;
    var handler = PaystackPop.setup({
      key: this.paykey,
      email: this.email,
      amount: this.amount,
      currency: 'NGN',
      ref: this.reference,

      metadata: {
        custom_fields: [
          {
            //display_name: "Mobile Number",
            //variable_name: "mobile_number",
            //value: "+2348012345678"
          },
        ],
      },
      callback: (response) => {
        console.log(response);
        const cartId = this.CartId;
        const learnerId = this.LearnerId;
        const reference = response.reference;
        console.log(cartId);
        console.log(learnerId);
        console.log(reference);

        if (response.status == 'success') {
          this.learnerService
            .completePayment(cartId, learnerId, reference)
            .subscribe(
              (item) => {
                console.log(item);
                if (item.statusCode == 200) {
                  console.log(item);
                  this.courseEnroll();
                }
                this.error = null;
                this.success = 'Payment Successful';
                // this.getSubscription(this.user.id);
              },
              (error) => {
                this.success = null;
                this.error = 'An Error Occured. Kindly Contact Us';
              }
            );
        }
      },
      // function (response) {
      //     //showOvelay();
      //     var reqobj = new Object();
      //     reqobj.payment_purpose = paytypetxt;
      //     reqobj.payment_reference = response.reference;
      //     reqobj.tenant_id = obj.id;
      //     reqobj.amount_paid = amount / 100;
      //     var dsent = JSON.stringify(reqobj);
      //     var url = "/api/Payment/updatePayment/";
      //     $.ajax({
      //         type: 'POST',
      //         url: url,
      //         //headers: { "Authorization": "Bearer " + token + "" },
      //         data: dsent,
      //         contentType: "application/json",
      //         success: function (data) {
      //             //hideLoading(page);
      //             showOvelay();
      //             if (data.status === "Success") {
      //                 window.location.href = "/Payment/ManagePayments?Paymentstatus=Success";
      //             } else {
      //                 hideBusy();
      //                 alert("Kindly Contact Administrator");
      //             }

      //         },
      //         error: function (jqXHR) {
      //             hideBusy();
      //             //hideLoading(page);
      //             //doToast(page, 'Check your network connectivity and try again.');
      //         }

      //     });
      // },
      onClose: function () {
        this.toastr.error('Payment Cancelled', 'window closed!', {
          timeOut: 3000,
        });
      },
    });
    handler.openIframe();
  }
}
