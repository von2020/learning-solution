import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { LearnerService } from 'src/app/services/learner.service';
import { SendDataService } from 'src/app/services/send-data.service';
declare var $:any;

@Component({
  selector: 'app-home-learner',
  templateUrl: './home-learner.component.html',
  styleUrls: ['./home-learner.component.scss']
})
export class HomeLearnerComponent implements OnInit {

  FirstName: String;
  enrolledCourses: Array<any> = [];
  learnerId: any;
  message: any;
  recommendedCourses: Array<any> = [];
  loading:boolean=false;
  popularCourses: Array<any> = [];
  mostViewedCourses: Array<any> = [];
  categories: Array<any> = [];

  constructor(
    private sendDataService : SendDataService,
    private authService: AuthService,
    private learnerService: LearnerService,
    private courseService: CourseService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService,
    private vcref: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {

    this.learnerId = JSON.parse(this.authService.getId());
    console.log(this.learnerId)
    this.FirstName = this.sendDataService.getMessage();

    this.learnerService.getLearnerById(this.learnerId).subscribe(data => {
      console.log(data);
      if(data.statusCode == 200) {
      console.log(data);
      console.log(data.data);
      this.FirstName = data.data.firstName;
      console.log(this.FirstName);
    }
},
  err => {
    console.log(err);
    return false;
  });

  this.getAllEnrolledCourse();

  this.getRecommendedCourses();

  this.getPopularCourses();

  this.getMostViewedCourses();
    
    console.log(this.FirstName);


  this.courseService.getPopularCoursesCategories().subscribe(data => {
    console.log(data.data);
    this.categories = data.data;
  },
  err => {
    console.log(err);
    return false;
  });

  

    var allLinks = $('.accordion').find('.collapsed').each(function(key) {

      var cardIdName = 'collapse' + key;
    
    $('.moreCollapse')[key].id = cardIdName;

      $(this).attr('href', "#"+cardIdName)
      
      console.log($(this).attr('href'));
    });

    console.log(allLinks);

    // $(".center").slick({
    //   dots: true,
    //   infinite: true,
    //   centerMode: true,
    //   slidesToShow: 1,
    //   slidesToScroll: 1
    // });
    
    $(".clickme").click(function() {
      $("#badgevisibility").fadeToggle(300);
      });


    $('.set-bg').each(function() {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });



  }
  getAllEnrolledCourse() {
    this.learnerService.getAllCoursesLearnerEnrolledFor(this.learnerId).subscribe(data => {
      console.log(data);
      if(data.statusCode == 200) {
      console.log(data.data);
      setTimeout( ()=>{
        this.initEnrollCarousel();
      }, 1000);
      
      setTimeout( ()=>{
        this.initCarousel();
      }, 3000);
    
      this.enrolledCourses = data.data;

    }
    
    if(data.statusMessage == "Successful, No Record Available") {
      this.message = "You haven't Started Taking any Course yet !!!";
      // $("#message").show
      console.log(this.message);
  }
},
  err => {
    console.log(err);
    this.message = "An Error Occured. Could not get your Courses"
    return false;
  });
  }

  async loadMyCourseComponent(){
    
    this.vcref.clear();
    const { MyCourseItemComponent } = await import('../../shared/shared/widgets/my-course-item/my-course-item/my-course-item.component');
    let myCourseComp = this.vcref.createComponent(
      this.cfr.resolveComponentFactory(MyCourseItemComponent)
    );
  
  }

  getRecommendedCourses() {
    this.showLoadingSpinner();
    this.learnerService.getRecommendedCourses(this.learnerId).subscribe(data => {
      console.log(data);
      if(data.statusCode == 201 || data.statusCode == 200) {
        console.log(data);
        console.log(data.data);
        if (data.data == undefined) {
          this.recommendedCourses = null
        }
        else {
        this.recommendedCourses = data.data;
        this.hideLoadingSpinner();
        }
      }
},
  err => {
    console.log(err);
    return false;
  });
  }
  
  getPopularCourses() {
    this.showLoadingSpinner();
    this.courseService.getPopularCourses().subscribe(data => {
      console.log(data);
      if(data.statusCode == 200) {
        console.log(data);
        console.log(data.data);
        this.popularCourses = data.data;
        this.hideLoadingSpinner();
      }
},
  err => {
    console.log(err);
    return false;
  });
  }

  getMostViewedCourses() {
    this.showLoadingSpinner();
    this.courseService.getMostViwedCourses().subscribe(data => {
      console.log(data);
      if(data.statusCode == 200) {
        console.log(data);
        console.log(data.data);
        this.mostViewedCourses = data.data;
        this.hideLoadingSpinner();
      }
},
  err => {
    console.log(err);
    return false;
  });
  }

  showLoadingSpinner() {
    this.loading = true;
}

  hideLoadingSpinner() {
    this.loading = false;
}


initEnrollCarousel() {
  $('.enroll').slick({
    dots: false,
    infinite: false,
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
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
}

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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
}

}
