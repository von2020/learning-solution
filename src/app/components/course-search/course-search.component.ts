import { AfterViewChecked, AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, ValidatorFn  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { SendDataService } from 'src/app/services/send-data.service';
import { CourseService } from 'src/app/services/course.service';
declare var $:any;

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent implements OnInit {


  @Output() messageEvent = new EventEmitter<any>();

  public show:boolean = false;

  id: any;
  private sub: any;
  categoryIds: any;
  category: any
  graphics: any
  courseTypes: any;
  currentIndex = -1;

  currentCourse = null;

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];


  form: FormGroup;
  ordersData = [];
  marked=false;
  courseLevels: any;
  subCategorys: any;
  message: string;
  CourseName: any;
  courseLevelId: any;

  
  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private sendDataService : SendDataService,
    private formBuilder: FormBuilder) {
  }
  // ngAfterViewChecked(): void {
  //   window.scrollTo(0, 0);
  // }

  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT', this.CourseName);
  }

  ngOnInit(): void {
    console.log('ON INIT', this.CourseName);

    // this.CourseName = this.sendDataService.getMessage();

    this.sub = this.route.queryParams.subscribe(params => {
      // this.id = params; // (+) converts string 'id' to a number
      this.CourseName = params.name;
      // In a real app: dispatch action to load the details here.

      this.getCourseByCourseName();
  
   });
   console.log(this.CourseName)
   
   this.courseService.getAllCourseType().subscribe(data => {
    console.log(data.data);
    this.courseTypes = data.data;
  },
  err => {
    console.log(err);
    return false;
  });

  this.courseService.getCourseLevel().subscribe(data => {
    console.log(data.data);
    this.courseLevels = data.data;
  },
  err => {
    console.log(err);
    return false;
  });

    
    $('.set-bg').each(function() {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });


    $('.panel-collapse').addClass('show');
        $('.panel-title > a').removeClass('collapsed');

    $('.panel-collapse').on('show.bs.collapse', function () {
      $(this).siblings('.panel-heading').addClass('active');
    });
   
    $('.panel-collapse').on('hide.bs.collapse', function () {
      $(this).siblings('.panel-heading').removeClass('active');
    });

    
  }


  getCourseByTypeId(id) {
    this.courseService.getCoursesByTypeId(id).subscribe(courseType => {
      console.log(courseType);
      console.log(courseType.data);
      
      if(courseType.statusMessage == "No Course with the specified ID" || courseType.statusMessage ==  "No Available Record"){
        $("#message").show();
        $(".shopping-list-section").hide();
        this.message = "No Available course for this section"
      }
      else {
        console.log(courseType.data);
        this.categoryIds = courseType.data;
        this.categoryIds =  this.categoryIds.filter((item)=>{
          return item.courseData.courseName.indexOf(this.CourseName) > -1;
        });
        
        console.log(this.categoryIds);

        if(this.categoryIds.length == 0){
          $("#message").show();
          $(".shopping-list-section").hide();
          this.message = "No Available course for this section"
        }

        setTimeout( ()=>{
      
          $(".cart-rating").starRating({
            starSize: 15,
            starShape: 'rounded',
            readOnly: true
          });
          }, 2000);
      }

    },
    err => {
      console.log(err);
      return false;
    });
  }

  getCourseByLevelId(id) {
    this.courseService.getCoursesByLevelId(id).subscribe(courseType => {
      console.log(courseType.data);
      
      if(courseType.statusMessage == "No Course with the specified ID" || courseType.statusMessage ==  "No Available Record"){
        this.message = "No Available course for this section"
      }
      else {
        this.categoryIds = courseType.data;
        this.categoryIds =  this.categoryIds.filter((item)=>{
          return item.courseData.courseName.indexOf(this.CourseName) > -1;
        })
        console.log(this.categoryIds);
        
        if(this.categoryIds.length == 0){
          $("#message").show();
          $(".shopping-list-section").hide();
          this.message = "No Available course for this section"
        }

        setTimeout( ()=>{
      
          $(".cart-rating").starRating({
            starSize: 15,
            starShape: 'rounded',
            readOnly: true
          });
          }, 2000);
      } 
    },
    err => {
      console.log(err);
      return false;
    });
  }

  
  onNativeChange(e, id) { // here e is a native event
    if(e.target.checked){
      // do something 
      this.marked= e.target.checked;
      console.log("selected: "+id)
      $("#message").hide();
      this.getCourseByTypeId(id)
      // this.show = !this.show;
    }
     else if(!e.target.checked)  {
      this.marked != this.marked;
      this.getCourseByCourseName();
    }
      // this.buttonName = "Show";
    
  }

  onNativeLevelChange(e, id) { // here e is a native event
    if(e.target.checked){
      // do something 
      this.marked= e.target.checked;
      console.log("selected: "+id)
      this.getCourseByLevelId(id)
      // this.show = !this.show;
    }
     else if(!e.target.checked)  {
      this.marked != this.marked;
      this.getCourseByCourseName();
      // this.retrieveCourses();
    }
      // this.buttonName = "Show";
    
  }


  getCourseByCourseName() {
    this.courseService.searchCourseByCourseName(this.CourseName).subscribe(data => {
      console.log(data);
      if(data.statusCode == 200) {
        if (data.data == undefined) {
          this.message = data.statusMessage
        }
        else {
      console.log(data);
      console.log(data.data);
      this.categoryIds = data.data;
      setTimeout( ()=>{
        
        $(".cart-rating").starRating({
          starSize: 15,
          starShape: 'rounded',
          readOnly: true
        });
        }, 2000);
      this.message = `${this.categoryIds.length} Results for ${this.CourseName}`
    }
  }
    
    if(data.statusMessage == `There is no Course with the Name ${this.CourseName}`) {
      this.message = data.statusMessage;
      $("#message").show
      console.log(this.message);
  }
},
  err => {
    console.log(err);
    this.message = "An Error Occured. Could not get your Courses"
    return false;
  });
  }

  getRequestParams(searchTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }
  
  handlePageChange(event) {
    this.page = event;
    this.getCourseByCourseName()
  }
  

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getCourseByCourseName()
  }

  setActiveCourse(course, index): void {
    this.currentCourse = course;
    this.currentIndex = index;
  }
  
}

