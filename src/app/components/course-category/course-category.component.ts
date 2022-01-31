import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterEvent,
  NavigationEnd,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { of, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CourseService } from 'src/app/services/course.service';
declare var $: any;

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.css'],
})
export class CourseCategoryComponent
  implements OnInit, OnDestroy, AfterViewInit
  
{
  @Output() messageEvent = new EventEmitter<any>();

  public show: boolean = false;

  learnerId: any;
  id: any;
  private sub: any;
  categoryIds: any;
  category: any;
  graphics: any;
  courseTypes: any;

  currentCourse = null;

  page = 1;
  count = 0;
  pageSize = 9;
  pageSizes = [9, 12, 15];
  currentIndex = -1;

  
  categories: any;
  form: FormGroup;
  ordersData = [];
  marked = false;
  courseLevels: any;
  subCategorys: any;
  message: string;
  public destroyed = new Subject<any>();
  cCatName: any;
  // typeCourses: any;

  get ordersFormArray() {
    return this.form.controls.orders as FormArray;
  }

  constructor(
    private titleService: Title,
    private meta: Meta,
    private authService: AuthService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.destroyed.next();
    this.destroyed.complete();
    // alert('e choke');
  }
  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT', this.id);
  }

  ngOnInit(): void {
    this.learnerId = JSON.parse(this.authService.getId());
    console.log('learnerId',this.learnerId)
    

    this.meta.updateTag({ name: 'author', content: 'Softworks Limited' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'e-learning, online courses',
    });

    console.log('ON INIT', this.id);
    this.sub = this.route.queryParams.subscribe((params) => {
      this.cCatName = params['category'];
      var cName = params['category'];

      const title = cName as string;

      this.titleService.setTitle(title + ' - expertplat');

      this.meta.updateTag({
        name: 'name',
        content: cName as string,
      });
      if (cName == null || cName == typeof undefined) {
        this.router.navigate(['/']);
      } else {
        this.courseService.getCoursesCategories().subscribe((data) => {
          if (data.statusCode == 200) {
            this.categories = data.data;
            console.log(this.categories, 'here');
            this.categories = this.categories.filter((item) => {
              return item.courseCategoryName == cName;
            });
            var cId = this.categories[0].id;
            this.id = cId;
            console.log(this.id);

            this.sendMessage();

            // this.retrieveCourses();
          }
        });
      }
      // this.id = this.categories[0].id// (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    console.log(this.id);

    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.sendMessage();
        this.retrieveCourses();
      });

    this.courseService.getAllCourseType().subscribe(
      (data) => {
        console.log(data.data);
        this.courseTypes = data.data;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );

    this.courseService.getCourseLevel().subscribe(
      (data) => {
        console.log(data.data);
        this.courseLevels = data.data;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );

    $('.set-bg').each(function () {
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
    this.courseService.getCoursesByTypeId(id).subscribe(
      (courseType) => {
        console.log(courseType);

        if (
          courseType.statusMessage == 'No Course with the specified ID' ||
          courseType.statusMessage == 'No Available Record'
        ) {
          $('#message').show();
          $('.shopping-list-section').hide();
          this.message = 'No Available course for this section';
        } else {
          console.log(courseType.data);
          this.categoryIds = courseType.data;
          this.categoryIds = this.categoryIds.filter((item) => {
            return item.courseData.courseCategoryName == this.cCatName;
          });

          console.log(this.categoryIds);

          if (this.categoryIds.length == 0) {
            $('#message').show();
            $('.shopping-list-section').hide();
            this.message = 'No Available course for this section';
          }

          setTimeout(() => {
            $('.cart-rating').starRating({
              starSize: 15,
              starShape: 'rounded',
              readOnly: true,
            });
          }, 2000);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getCourseByLevelId(id) {
    this.courseService.getCoursesByLevelId(id).subscribe(
      (courseType) => {
        console.log(courseType);

        if (
          courseType.statusMessage == 'No Course with the specified ID' ||
          courseType.statusMessage == 'No Available Record'
        ) {
          $('#message').show();
          $('.shopping-list-section').hide();
          this.message = 'No Available course for this section';
        } else {
          console.log(courseType.data);
          // this.categoryIds = []
          // var courses = courseType.data;
          // courses = courses.forEach(element => {
          //   this.categoryIds.push(element.courseData)
          // });

          this.categoryIds = courseType.data;
          this.categoryIds = this.categoryIds.filter((item) => {
            return item.courseData.courseCategoryName == this.cCatName;
          });

          console.log(this.categoryIds);

          if (this.categoryIds.length == 0) {
            $('#message').show();
            $('.shopping-list-section').hide();
            this.message = 'No Available course for this section';
          }

          setTimeout(() => {
            $('.cart-rating').starRating({
              starSize: 15,
              starShape: 'rounded',
              readOnly: true,
            });
          }, 2000);

          console.log(this.categoryIds);

          if (this.categoryIds.length == 0) {
            $('#message').show();
            $('.shopping-list-section').hide();
            this.message = 'No Available course for this section';
          }
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  onNativeTypeChange(e, id) {
    // here e is a native event
    if (e.target.checked) {
      // do something
      this.marked = e.target.checked;
      console.log('selected: ' + id);
      this.getCourseByTypeId(id);
    } else if (!e.target.checked) {
      $('#message').hide();
      $('.shopping-list-section').show();
      this.marked != this.marked;
      this.sendMessage();
      // this.retrieveCourses();
    }
  }

  onNativeChange(e, id) {
    // here e is a native event
    if (e.target.checked) {
      // do something
      this.marked = e.target.checked;
      console.log('selected: ' + id);
      this.getCourseByLevelId(id);
      // this.show = !this.show;
    } else if (!e.target.checked) {
      $('#message').hide();
      $('.shopping-list-section').show();
      this.marked != this.marked;
      this.sendMessage();
      // this.retrieveCourses();
    }
    // this.buttonName = "Show";
  }

  sendMessage() {
    if(this.learnerId != null){
    this.courseService.getCoursesByCategoryId(this.id, this.learnerId).subscribe(
      (category) => {
        console.log(category);
        if (category.statusMessage == 'No Available Record') {
          this.courseService.getCourseCategoryById(this.id).subscribe((res) => {
            this.category = res.data.courseCategoryName;
          });
          $('#message').show();
          $('.shopping-list-section').hide();
          this.message = 'No Available course for this section';
        } else {
          console.log(category.data);
          this.categoryIds = category.data;
          setTimeout(() => {
            $('.cart-rating').starRating({
              starSize: 15,
              starShape: 'rounded',
              readOnly: true,
            });
          }, 2000);
          this.messageEvent.emit(this.categoryIds);

          var item = [];

          this.categoryIds.forEach((element) => {
            item.push(element.courseData.courseCategoryName);
          });

          this.category = item[0];

          console.log(this.category);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }else{
    this.courseService.courseByCategoryId(this.id).subscribe(
      (category) => {
        console.log(category);
        if (category.statusMessage == 'No Available Record') {
          this.courseService.getCourseCategoryById(this.id).subscribe((res) => {
            this.category = res.data.courseCategoryName;
          });
          $('#message').show();
          $('.shopping-list-section').hide();
          this.message = 'No Available course for this section';
        } else {
          console.log(category.data);
          this.categoryIds = category.data;
          setTimeout(() => {
            $('.cart-rating').starRating({
              starSize: 15,
              starShape: 'rounded',
              readOnly: true,
            });
          }, 2000);
          this.messageEvent.emit(this.categoryIds);

          var item = [];

          this.categoryIds.forEach((element) => {
            item.push(element.courseData.courseCategoryName);
          });

          this.category = item[0];

          console.log(this.category);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
  }

  

  retrieveCourses() {
    this.courseService
      .getCoursesPaginationByCategoryId(this.id, this.page, this.pageSize)
      .subscribe(
        (response) => {
          console.log(response);
          const { categoryIds, totalItems } = response;
          this.categoryIds = categoryIds;
          this.count = totalItems;
          this.categoryIds = response.data;
          console.log(response.data);
        },
        (err) => {
          console.log(err);
          return false;
        }
      );
  }

  getRequestParams(searchTitle, page, pageSize): any {
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
