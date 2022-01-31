import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
declare var $ : any;

@Component({
  selector: 'app-create-sub-category',
  templateUrl: './create-sub-category.component.html',
  styleUrls: ['./create-sub-category.component.css']
})
export class CreateSubCategoryComponent implements OnInit {
  pageNumber: number = 1
  pageLength: number = 50
  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
   loading : boolean
   subcategorys: any;
   categorys : any
   selectedFile: File
   CourseCategoryId : number
   CourseSubCategoryImageUrl: string;
  CourseSubCategoryName: string;
  CourseSubCategoryDescription: string;
  subCategoryId: any;

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private courseService: CourseService,
    private adminService: AdminService,
    private router: Router) { 
      this.CourseCategoryId = null;
    }

  ngOnInit(): void {

    this.getCourseCategories()

    this.courseService.getCourseSubCategories().subscribe(data => {
      console.log(data.data);
      
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 50,
         lengthMenu : [10, 20, 25, 50],
      processing: true
    };
    this.dtTrigger.next()
    this.subcategorys = data.data;
    },
    err => {
      console.log(err);
      return false;
    });

    
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  // The fundamental skills that are required to efficiently run or manage a business
  createSubcategory() {
    if (this.selectedFile) {
      // var catImg = $('#CourseCategoryName').val()
      // var catDesc = $('#CategoryDescription').val()
      let catImg = (document.getElementById('CourseSubCategoryName') as HTMLInputElement).value;
      let catDesc = (document.getElementById('CourseSubCategoryDescription') as HTMLInputElement).value;
  
      if (catImg == "" || catDesc == "") {
          
        this.toastr.error('Fill in All Fields, please', 'Something Went Wrong!', {
          timeOut: 3000,
        });
        }

        
      
      else if(this.selectedFile.size > 1000000){
        this.toastr.error("File is too big!", 'Something Went Wrong!', {
          timeOut: 3000,
        });
        // this.value = "";
     }
     

      else {
        
    //Upload my image to server
    const file_data = this.selectedFile;
    const data = new FormData();
    data.append('File', file_data);
    data.append('FolderTypeId', '1')
    data.append('AppId', '1');
    console.log(data);

this.authService.uploadImage(data).subscribe((response) => {
if (response.statusCode == 200) {
console.log(response);
console.log(response.fileData.fileUrl);
this.CourseSubCategoryImageUrl = response.fileData.fileUrl;

const courseCategory = {
  CourseCategoryId : Number(this.CourseCategoryId),
  CourseSubCategoryName: this.CourseSubCategoryName,
CourseSubCategoryImageUrl: this.CourseSubCategoryImageUrl,
CourseSubCategoryDescription: this.CourseSubCategoryDescription
}

console.log(courseCategory);

this.adminService.createCourseSubCategory(courseCategory).subscribe(data => {
console.log(data);
if(data.statusCode == 200) {
this.toastr.success('Subcategory Created');
location.reload();

}else {
this.toastr.error(data.stausMessage, 'Something Went Wrong!', {
  timeOut: 3000,
});
}
});

}
else {
this.toastr.error('An Error Occured, Please try again', 'Error', {
timeOut: 3000,
});
}
});
}
      }

      else if (!this.selectedFile) {
        this.toastr.error('Select an Image, please', 'Something Went Wrong!', {
          timeOut: 3000,
        });
      }
      // }
    
      
    }


  getCourseCategories() {
    this.courseService.getCoursesCategories().subscribe(data => {
      console.log(data.data);
    this.categorys = data.data;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  updateSubCategory(id) {
    this.subCategoryId = id;
    $('#editModal').modal('show');
  }

  updateCourseSubCategory() {
    this.loading = true;
    console.log(this.subCategoryId)

    
    if (this.selectedFile) {
      if(this.selectedFile.size > 1000000){
        this.toastr.error("File is too big!", 'Something Went Wrong!', {
          timeOut: 3000,
        });
        // this.value = "";
     }
     
     let catImg = (document.getElementById('CourseSubCategoryName') as HTMLInputElement).value;
     let catDesc = (document.getElementById('CourseSubCategoryDescription') as HTMLInputElement).value;
      // $('#CategoryDescription').val()
  
      if (catImg == "" || catDesc == "") {
          
        this.toastr.error('Fill in All Fields, please', 'Something Went Wrong!', {
          timeOut: 3000,
        });
        }
  
      }

      else if (!this.selectedFile) {
        this.toastr.error('Select an Image, please', 'Something Went Wrong!', {
          timeOut: 3000,
        });
      }

      // else {
        
    //Upload my image to server
    const file_data = this.selectedFile;
    const data = new FormData();
    data.append('File', file_data);
    data.append('FolderTypeId', '1')
    data.append('AppId', '1');
    console.log(data);

this.authService.uploadImage(data).subscribe((response) => {
if (response.statusCode == 200) {
console.log(response);
console.log(response.fileData.fileUrl);
this.CourseSubCategoryImageUrl = response.fileData.fileUrl;

const courseCategory = {
  CourseCategoryId : Number(this.CourseCategoryId),
  CourseSubCategoryName: this.CourseSubCategoryName,
CourseSubCategoryImageUrl: this.CourseSubCategoryImageUrl,
CourseSubCategoryDescription: this.CourseSubCategoryDescription
}

console.log(courseCategory);

    this.adminService.updateCourseSubCategory(courseCategory, this.subCategoryId).subscribe(data => {
      this.loading = false;
      console.log(data);
        if(data.statusMessage == "Course SubCategory Updated Successfully"){
          location.reload()
          console.log(this.categorys);
          this.toastr.info('Course SubCategory Updated');
          $('#editModal').modal('hide');
        } else if (data.statusMessage == "No Record Found") {
          this.toastr.info(data.statusMessage);
          $('#editModal').modal('hide');
        }
        else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          $('#editModal').modal('hide');
        }
      },
      err => {
        this.loading = false;
        console.log(err);
        return false;
      });
  }
});
}

  deleteSubCategory(id) {
    this.subCategoryId = id;
    $('#deleteModal').modal('show');
  }

  confirmDeleteSubCategory() {
    this.loading = true;
    this.adminService.deleteCourseSubCategory(this.subCategoryId).subscribe(data => {
      this.loading = false;
      console.log(data);
        if(data.statusCode == 200){

          if (data.statusMessage == "This Course has been Enrolled for") {
            this.toastr.info(data.statusMessage);
            $('#deleteModal').modal('hide');
          }
          else 
          {
            this.categorys = this.categorys.filter((ser) => {
              return ser.id !== this.subCategoryId
            });
            console.log(this.categorys);
            this.toastr.success('Course SubCategory removed');
            $('#deleteModal').modal('hide');
          }
        } 
        // else if (data.statusMessage == "This Course has been Enrolled for") {
        //   this.toastr.info(data.statusMessage);
        //   $('#deleteModal').modal('hide');
        // }
        else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          $('#deleteModal').modal('hide');
        }
      },
      err => {
        this.loading = false;
        console.log(err);
        return false;
      });
  }

  
onLogoutClick(){
  $("#logoutModal").modal('hide')
  this.authService.logout();
  this.toastr.success('Logout Successfull');
  this.router.navigate(['/login-super-admin']);
  return false;
}

}
