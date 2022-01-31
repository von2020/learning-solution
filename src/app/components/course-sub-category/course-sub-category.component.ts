import { AfterViewChecked, AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, ValidatorFn  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
declare var $:any;

@Component({
  selector: 'app-course-sub-category',
  templateUrl: './course-sub-category.component.html',
  styleUrls: ['./course-sub-category.component.css']
})
export class CourseSubCategoryComponent implements OnInit,OnDestroy,AfterViewInit {
  

  @Output() messageEvent = new EventEmitter<any>();

  id: number;
  private sub: any;
  categoryIds: any;
  category: any
  graphics: any
  courseTypes: any;
  currentIndex = -1;

  ishttpLoaded:boolean=false;
  isLoaded:boolean=false;

  currentCourse = null;

  page = 1;
  count = 0;
  pageSize = 9;
  pageSizes = [9, 12, 15];


  form: FormGroup;
  ordersData = [];
  marked=false;
  courseLevels: any;
  subCategorys: any;
  message : string;
  categoryName: any;
  sCatId: any;
  // typeCourses: any;

  get ordersFormArray() {
    return this.form.controls.orders as FormArray;
  }

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {

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
        this.categoryIds = courseType.data;
        this.categoryIds =  this.categoryIds.filter((item)=>{
          return item.courseData.courseSubCategoryName == this.categoryName;
        })
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
      console.log(courseType);
      
      if(courseType.statusMessage == "No Course with the specified ID" || courseType.statusMessage == "No Available Record"){
        $("#message").show();
        $(".shopping-list-section").hide();
        this.message = "No Available course for this section"
      }
      else {
        console.log(courseType.data);

        this.categoryIds = courseType.data;
        this.categoryIds =  this.categoryIds.filter((item)=>{
          return item.courseData.courseSubCategoryName == this.categoryName;
        })

        console.log(this.categoryIds)
        
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
        console.log(this.categoryIds)
        console.log(this.categoryName)

        if (this.categoryIds.length == 0) {
          $("#message").show();
        $(".shopping-list-section").hide();
        this.message = "No Available course for this section"
        }
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  
  onNativeTypeChange(e, id) { // here e is a native event
    if(e.target.checked){
      // do something 
      this.marked= e.target.checked;
      console.log("selected: "+id)
      this.getCourseByTypeId(id)
    }
    else if(!e.target.checked)  {
      $("#message").hide();
      $(".shopping-list-section").show();
      this.marked != this.marked;
      this.sendMessage();
      // this.retrieveCourses();
    }
  }

  onNativeChange(e, id) { // here e is a native event
    if(e.target.checked){
      // do something 
      this.marked= e.target.checked;
      console.log("selected: "+id)
      this.getCourseByLevelId(id)
    }
    else if(!e.target.checked)  {
      $("#message").hide();
      $(".shopping-list-section").show();
      this.marked != this.marked;
      this.sendMessage();
      // this.retrieveCourses();
    }
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT', this.id);
  }

  ngOnInit(): void {
    console.log('ON INIT', this.id);

    this.sub = this.route.queryParams.subscribe(params => {
      this.categoryName = params["subcategory"]
      var cName = params["subcategory"]
 
      if (cName == null || cName == typeof(undefined)) {
       this.router.navigate(['/']);
      }
      else {
       this.courseService.getCourseSubCategories().subscribe(data => {
         if (data.statusCode == 200) {
         this.subCategorys = data.data;
          console.log(this.subCategorys, "here");
         this.subCategorys =  this.subCategorys.filter((item)=>{
            return item.courseSubCategoryName == cName;
          })
          var cId = this.subCategorys[0].courseCategoryId;
          this.id = cId;
          this.sCatId = this.subCategorys[0].id;
         console.log(this.sCatId);
         console.log(this.id);
         
     this.sendMessage();
     
    //  this.retrieveCourses();
 
     
         }
       })
 
     }
      // this.id = this.categories[0].id// (+) converts string 'id' to a number
 
       // In a real app: dispatch action to load the details here.
    });
   console.log(this.id)

   this.courseService.getAllCourseType().subscribe(data => {
    console.log(data.data);
    this.ishttpLoaded=data;
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

    // this.authService.getAllCourseSubCategoryById(this.id).subscribe(subCategory => {
    //   console.log(subCategory.data);
    //   this.subCategorys = subCategory.data;

    // },
    // err => {
    //   console.log(err);
    //   return false;
    // });


    
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

  sendMessage() {
    this.courseService.getCoursesBySubCategoryId(this.sCatId).subscribe(category => {
      console.log(category);
      if (category.statusMessage == "No Available Record") {

        this.category = this.categoryName;
        $("#message").show();
        $(".shopping-list-section").hide();
        this.message = "No Available course for this section"
    }
    else {
    console.log(category.data);
    this.categoryIds = category.data;
    setTimeout( ()=>{
      
      $(".cart-rating").starRating({
        starSize: 15,
        starShape: 'rounded',
        readOnly: true
      });
      }, 2000);
    this.messageEvent.emit(this.categoryIds);

    var item = []

      this.categoryIds.forEach(element => { 
       item.push(element.courseData.courseSubCategoryName);
        });

        
    this.category = item[0]

      console.log(this.category)
    }

  },
  err => {
    console.log(err);
    return false;
  });


  }

  retrieveCourses() {
    this.courseService.getCoursesPaginationBySubCategoryId(this.sCatId,this.page,this.pageSize).subscribe(
      // category => {
      // console.log(category.data);
      // this.categoryIds = category.data;
      response => {
        const { categoryIds, totalItems } = response;
        this.categoryIds = categoryIds;
        this.count = totalItems;
        this.categoryIds = response.data;
        console.log(response);
    },
    err => {
      console.log(err);
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
    this.sendMessage();
    // this.retrieveCourses();
  }
  

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.sendMessage();
    // this.retrieveCourses();
  }

  setActiveCourse(course, index): void {
    this.currentCourse = course;
    this.currentIndex = index;
  }
  
}
