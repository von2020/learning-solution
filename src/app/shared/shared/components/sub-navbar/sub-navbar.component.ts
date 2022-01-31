import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-sub-navbar',
  templateUrl: './sub-navbar.component.html',
  styleUrls: ['./sub-navbar.component.css']
})
export class SubNavbarComponent implements OnInit, OnDestroy {

  subCategorys: any;
  id: number;
  private sub: any;
  categories : any;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.sub = this.route.queryParams.subscribe(params => {
      var cName = params["category"]
 
      if (cName == null || cName == typeof(undefined)) {
       this.router.navigate(['/']);
      }
      else {
       this.courseService.getCoursesCategories().subscribe(data => {
         if (data.statusCode == 200) {
         this.categories = data.data;
         this.categories =  this.categories.filter((item)=>{
            return item.courseCategoryName == cName;
          })
          var cId = this.categories[0].id;
          this.id = cId;
         console.log(this.id);
 
         
    this.courseService.getAllCourseSubCategoryById(this.id).subscribe(subCategory => {
      console.log(subCategory.data);
      this.subCategorys = subCategory.data;

  });

     
         }
       })
 
     }
      // this.id = this.categories[0].id// (+) converts string 'id' to a number
 
       // In a real app: dispatch action to load the details here.
    });



  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
