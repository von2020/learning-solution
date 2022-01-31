import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-login-super-admin',
  templateUrl: './login-super-admin.component.html',
  styleUrls: ['./login-super-admin.component.css']
})
export class LoginSuperAdminComponent implements OnInit {

  Email: String;
  Password: String;
  loginForm: FormGroup;

  constructor(
    private validateService: ValidateService,
    private sendDataService : SendDataService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Password: new FormControl('', Validators.required),
      Email: new FormControl('', [
        Validators.required,
        Validators.email,
      ])});
  }

  onLoginSubmit(){

    const value = this.loginForm.value;
    let serializedForm = JSON.stringify(value);
    console.log(serializedForm);

    //Required Fields
  if (!this.validateService.validateRegister(this.loginForm.value)) {
    // 1st parameter is a toast message text
          // 2nd parameter is optional. You can pass object with options.
          this.toastr.error('Please fill in all fields', 'Something Went Wrong!', {
            timeOut: 3000,
          });
          console.log('Please fill in all fields');
    return false;
  }

  // Validate Email
  if (!this.validateService.validateEmail(this.loginForm.value.Email)) {
      // 1st parameter is a toast message text
          // 2nd parameter is optional. You can pass object with options.
          this.toastr.error('Please use a valid email', 'Something Went Wrong!', {
            timeOut: 3000,
          });
    console.log('Please use a valid email');
    return false;
  }

    this.authService.loginAdmin(serializedForm).subscribe(data => {
      console.log(data);
      if(data.statusMessage == "Login Successful!"){
        let userFirstname = data.userDetails.firstName;
        this.sendDataService.setMessage(userFirstname.toString())
        this.authService.storeAdminData("Bearer "+data.token, data.userDetails, data.userDetails.userId);

        this.toastr.success(data.statusMessage);

        this.router.navigate(['/dashboard-super-admin'])
      }
      else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });

        this.router.navigate(['/login-super-admin'])

      }
    });


  }

}
