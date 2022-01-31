import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-create-facilitator',
  templateUrl: './create-facilitator.component.html',
  styleUrls: ['./create-facilitator.component.css']
})
export class CreateFacilitatorComponent implements OnInit {

  registerFacilitatorForm: FormGroup;

  constructor(
    private sendDataService : SendDataService,
    private validateService: ValidateService, 
    private _flashMessagesService: FlashMessagesService,
    private toastr: ToastrService,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerFacilitatorForm = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      PhoneNumber: new FormControl('', Validators.required),
      Email: new FormControl('', [
        Validators.required,
        Validators.email,
      ])});

  }

  onRegisterFacilitatorSubmit() {
    const value = this.registerFacilitatorForm.value
    let serializedForm = JSON.stringify(value);
    console.log(serializedForm);

//Required Fields
if (!this.validateService.validateRegister(this.registerFacilitatorForm.value)) {
// 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      this.toastr.error('Please fill in all fields', 'One or more validation errors occurred!', {
        timeOut: 3000,
      });
      console.log('Please fill in all fields');
return false;
}

// // Validate Email
else if (!this.validateService.validateEmail(this.registerFacilitatorForm.value.Email)) {
  // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      this.toastr.error('Please use a valid email', 'One or more validation errors occurred!', {
        timeOut: 3000,
      });
  
console.log('Please use a valid email');
return false;
}

else {


  

  //Register user
  this.adminService.createInternalFacilitator(serializedForm).subscribe(data => {
    console.log(data);
    if(data.statusCode == 200) {
      this.toastr.success(data.statusMessage);
      this.registerFacilitatorForm.reset()
    } else if(data.statusMessage == "This Email has been taken") {
      this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
        timeOut: 3000,
      });
      this._flashMessagesService.show(data.statusMessage, { cssClass: 'alert-danger', timeout: 3000 });
    }
    else {
      this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
        timeOut: 3000,
      });
    }
  });
}
}

onLogoutClick(){
  this.authService.logout();
  this.toastr.success('You are Logged Out');
  // this._snackBar.open('You are logged out', 'dismiss', {
  //   duration: 500,
  //   horizontalPosition: this.horizontalPosition,
  //   verticalPosition: this.verticalPosition,
  // });
  this.router.navigate(['/home']);
  return false;
}

}
