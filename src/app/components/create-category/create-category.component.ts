import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
declare var $ : any;

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  pageNumber: number = 1
  pageLength: number = 50
  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
   loading : boolean
   categorys: any;
   selectedFile: File
  CourseCategoryImage: any;
  CourseCategoryName: any;
  CategoryDescription: any;
  categoryId: any;

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private adminService: AdminService,
    private courseService: CourseService,
    private router: Router) { }

  ngOnInit(): void {

    this.getCourseCatgories();

    
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  createCategory() {
    if (this.selectedFile) {
      if(this.selectedFile.size > 1000000){
        this.toastr.error("File is too big!", 'Something Went Wrong!', {
          timeOut: 3000,
        });
        // this.value = "";
     }
     
      let catImg = (document.getElementById('CourseCategoryName') as HTMLInputElement).value;
      let catDesc = (document.getElementById('CategoryDescription') as HTMLInputElement).value;
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
this.CourseCategoryImage = response.fileData.fileUrl;

const courseCategory = {
CourseCategoryName: this.CourseCategoryName,
CategoryDescription: this.CategoryDescription,
CourseCategoryImage: this.CourseCategoryImage
}

console.log(courseCategory);

this.adminService.createCourseCategory(courseCategory).subscribe(data => {
console.log(data);
if(data.statusCode == 200) {
this.toastr.success('Category Created');
location.reload()
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
},
err => {
  console.log(err);
  return false;
});
      // }
    
      
    }

  getCourseCatgories() {
    this.courseService.getCoursesCategories().subscribe(data => {
      console.log(data.data);
      
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 50,
         lengthMenu : [10, 20, 25, 50],
      processing: true
    };
    this.dtTrigger.next()
    this.categorys = data.data;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  updateCategory(id) {
    this.categoryId = id;
    $('#editModal').modal('show');
  }

  updateCourseCategory() {
    this.loading = true;
    console.log(this.categoryId)

    
    if (this.selectedFile) {
      if(this.selectedFile.size > 1000000){
        this.toastr.error("File is too big!", 'Something Went Wrong!', {
          timeOut: 3000,
        });
        // this.value = "";
     }
     
      let catImg = (document.getElementById('CourseCategoryName') as HTMLInputElement).value;
      let catDesc = (document.getElementById('CategoryDescription') as HTMLInputElement).value;
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
this.CourseCategoryImage = response.fileData.fileUrl;

const courseCategory = {
CourseCategoryName: this.CourseCategoryName,
CategoryDescription: this.CategoryDescription,
CourseCategoryImage: this.CourseCategoryImage
}

console.log(courseCategory);

    this.adminService.updateCourseCategory(courseCategory, this.categoryId).subscribe(data => {
      this.loading = false;
      console.log(data);
        if(data.statusMessage == "Course Category Updated Successfully"){
          location.reload()
          console.log(this.categorys);
          this.toastr.info('Course Category Updated');
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

  deleteCategory(id) {
    this.categoryId = id;
    $('#deleteModal').modal('show');
  }

  confirmDeleteCategory() {
    this.loading = true;
    this.adminService.deleteCourseCategory(this.categoryId).subscribe(data => {
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
              return ser.id !== this.categoryId
            });
            console.log(this.categorys);
            this.toastr.success('Course removed');
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
