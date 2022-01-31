import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { TooltipComponent } from 'src/app/shared/shared/widgets/tooltip/tooltip.component';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  ishttpLoaded: boolean = false;
  isLoaded: boolean = false;
  httploading: boolean = false;
  // typeId : any;
  // pageNumber : any;
  // pageSize : any;
  id: any;
  graphics: any;
  randomCourses: Array<any> = [];
  items: any;
  categories: Array<any> = [];
  showModal: boolean;
  content: string;
  title: string;
  rating: any;
  frstReview: any = {};
  secondReview: any = {};
  thirdReview: any = {};
  fourthReview: any = {};
  renderer: any;

  constructor(
    private authService: AuthService,
    private sendDataService: SendDataService,
    private courseService: CourseService,
    private toastr: ToastrService,
    private router: Router,
    public viewContainerRef: ViewContainerRef
  ) {}

  ngOnDestroy(): void {
    $('.header-section').css({ position: 'relative' });
    $('.header-section').addClass('shadow');
    $('.navbar').addClass('navbar-light').removeClass('navbar-dark');
    $('.navbar').addClass('bg-white').removeClass('bg-light');
  }

  ngOnInit(): void {
    // Get the input field
    var input = document.getElementById('searchInputs');

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener('keyup', function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById('searchButton').click();
      }
    });

    // Intro carousel
    var heroCarousel = $('#heroCarousel');
    var heroCarouselIndicators = $('#hero-carousel-indicators');
    heroCarousel
      .find('.carousel-inner')
      .children('.carousel-item')
      .each(function (index) {
        index === 0
          ? heroCarouselIndicators.append(
              "<li data-target='#heroCarousel' data-slide-to='" +
                index +
                "' class='active'></li>"
            )
          : heroCarouselIndicators.append(
              "<li data-target='#heroCarousel' data-slide-to='" +
                index +
                "'></li>"
            );

        $(this).css(
          'background-image',
          "url('" +
            $(this)
              .children('.carousel-background')
              .children('img')
              .attr('src') +
            "')"
        );
        $(this).children('.carousel-background').remove();
      });

    heroCarousel.on('slid.bs.carousel', function (e) {
      $(this).find('h2').addClass('animate__animated animate__fadeInDown');
      $(this)
        .find('p, .btn-get-started')
        .addClass('animate__animated animate__fadeInUp');
    });

    $('#testimonial-slider').owlCarousel({
      loop: true,
      nav: false,
      dots: true,
      margin: 10,
      autoplay: true,
      slideSpeed: 1000,
      autoplayTimeout: 3000,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: true,
        },
        600: {
          items: 2,
          nav: false,
        },
        1000: {
          items: 3,
          nav: true,
          loop: false,
        },
      },
    });

    this.getRandomCourses();

    $('.nav-switch').on('click', function (event) {
      $('.main-menu').slideToggle(400);
      event.preventDefault();
    });

    this.courseService.getPopularCoursesCategories().subscribe(
      (data) => {
        console.log(data.data);
        this.categories = data.data;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );

    console.log(this.rating);

    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });

    $('.rc-slider').owlCarousel({
      autoplay: true,
      loop: true,
      nav: true,
      dots: false,
      margin: 30,
      navText: ['', '<i class="fa fa-angle-right"></i>'],
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 2,
        },
        990: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });

    // setTimeout( ()=>{
    //   this.initCarousel();
    // }, 1000);
  }

  initCarousel() {
    $('.regular').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
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

  getCourseByCourseName(value: string) {
    if (value == '') {
      this.toastr.error('Please enter a keyword', 'Error', {
        timeOut: 3000,
      });
    } else {
      this.sendDataService.setMessage(value);
      // this.router.navigate(['/course-search']);
      this.router.navigate(['/course-search'], {
        queryParams: { name: value },
      });
      // this.router.navigate(['/login']);
    }
  }

  getRandomCourses() {
    this.showLoadingSpinner();
    this.courseService.getCoursesByLevelId(4).subscribe(
      (category) => {
        if (category.statusCode == 200) {
          console.log(category);
          console.log(category.data);

          setTimeout(() => {
            this.initCarousel();
          }, 1000);

          this.randomCourses = category.data;
          this.hideLoadingSpinner();
        }
      },
      (err) => {
        this.hideLoadingSpinner();
        console.log(err);
        return false;
      }
    );
  }

  getRandomCourseReviews() {
    this.showLoadingSpinner();
    this.courseService.getCourseReviewsAtRandom(3).subscribe(
      (review) => {
        if (review.statusCode == 200) {
          console.log(review);
          console.log(review.data);
          this.frstReview = review.data[0];
          this.secondReview = review.data[1];
          this.thirdReview = review.data[2];
          this.fourthReview = review.data[3];
          this.hideLoadingSpinner();
        }
      },
      (err) => {
        this.hideLoadingSpinner();
        console.log(err);
        return false;
      }
    );
  }

  showLoadingSpinner() {
    this.loading = true;
  }

  hideLoadingSpinner() {
    this.loading = false;
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  goToCourseCategory(id) {
    this.router.navigate(['/course-category', id]);
  }

  //Bootstrap Modal Open event
  show() {
    this.showModal = true; // Show-Hide Modal Check
    this.content = 'This is content!!'; // Dynamic Data
    this.title = 'This is title!!'; // Dynamic Data
  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }
}
