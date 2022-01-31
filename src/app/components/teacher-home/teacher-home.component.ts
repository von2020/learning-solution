import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { ValidateService } from 'src/app/services/validate.service';
declare var $:any;

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent implements OnInit, OnDestroy {

  FirstName: String;
  LastName: String;
  Email: String;
  Password: String;
  ConfirmPassword: String;
  PhoneNumber: String;
  levelTypeName : String;
  LevelTypeId : number
  items : any
  registerForm: FormGroup;
  showModal: boolean;
  showSignupModal: boolean;

  // Email: any;
  Code: String;

  email : any

  constructor(
    private sendDataService : SendDataService,
    private validateService: ValidateService, 
    private _flashMessagesService: FlashMessagesService,
    private facilitatorService : FacilitatorService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    $('#confirmModal').modal({ show: false})
  }
  // ngAfterViewChecked(): void {
  //   window.scrollTo(0, 0);
  // }

  ngOnInit(): void {
    $('.set-bg').each(function() {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });

    this.registerForm = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
      ConfirmPassword: new FormControl('', Validators.required),
      PhoneNumber: new FormControl('', Validators.required),
      Email: new FormControl('', [
        Validators.required,
        Validators.email,
      ])});
    
      
  }

  onRegisterSubmit() {
    const value = this.registerForm.value;
    // let formObj = value.getRawValue();
    let serializedForm = JSON.stringify(value);
    console.log(serializedForm);

    //Required Fields
  if (!this.validateService.validateRegister(this.registerForm.value)) {
    // 1st parameter is a flash message text
          // 2nd parameter is optional. You can pass object with options.
          alert('Please fill in all fields')
          this._flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
          this._flashMessagesService.grayOut(true);
          console.log('Please fill in all fields');
    // this.ngFlashMessageService.showFlashMessage('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
    return false;
  }

  // Validate Email
  if (!this.validateService.validateEmail(this.registerForm.value.Email)) {
      // 1st parameter is a flash message text
          // 2nd parameter is optional. You can pass object with options.
          alert('Please use a valid email')
          this._flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
          this._flashMessagesService.grayOut(true);
      
    console.log('Please use a valid email');
    return false;
  }

  this.authService.registerFacilitator(serializedForm).subscribe(data => {
    console.log(data);
    if(data.statusCode == 200) {
      let userEmail = data.data.email;
      this.email = userEmail;
      // this.sendDataService.setMessage(userEmail.toString())
      console.log(userEmail.toString());
      alert('Please Activate your Account to continue')
      this.authService.storeUserData("Bearer "+data.token, data.data, data.data.userId);
      this._flashMessagesService.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
      this._flashMessagesService.grayOut(true);
      // $("submitConfirm").click();
      // this.hideSignup();
      // this.show();
      $("#myModal").modal('hide');
      $("#confirmModal").modal('show');
      // this.router.navigate(['/confirmation']);
    }else {
      this._flashMessagesService.show(data.statusMessage, { cssClass: 'alert-danger', timeout: 3000 });
      this._flashMessagesService.grayOut(true);
      // $("#myModal").modal('hide');
      // this.router.navigate(['/register']);
        }
  });
  
  }

  show()
{
  this.showModal = true; // Show-Hide Modal Check
  // this.content = "This is content!!"; // Dynamic Data
  // this.title = "This is title!!";    // Dynamic Data
}
//Bootstrap Modal Close event
hide()
{
  this.showModal = false;
}

hideSignup()
{
  this.showSignupModal = false;
}

  onActivateSubmit() {
    const user = {
      email: this.email,
      Code: this.Code
    }

    this.facilitatorService.activateFacilitatorAccount(JSON.stringify(user)).subscribe(data => {
      if(data.statusCode == 200){
        alert(data.statusMessage)
        this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
        this.router.navigate(['/login'])
      }else {
        alert(data.statusMessage)
        this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
        // this.router.navigate(['confirmation'])
      }
    });
  }

  resendCode() {
    this.facilitatorService.resendFacilitatorActivationCode(this.email).subscribe(data => {
      console.log(data);
      if(data.statusCode == 200){
        alert(data.statusMessage)
        this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
        // this.router.navigate(['login'])
      }else {
        alert(data.statusMessage)
        this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
        // this.router.navigate(['confirmation'])
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }


}
