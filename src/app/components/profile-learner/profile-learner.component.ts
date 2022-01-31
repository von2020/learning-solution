import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LearnerService } from 'src/app/services/learner.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
declare var $ : any;

@Component({
  selector: 'app-profile-learner',
  templateUrl: './profile-learner.component.html',
  styleUrls: ['./profile-learner.component.css']
})
export class ProfileLearnerComponent implements OnInit {
  profileUpdateForm: FormGroup;
  profileToFacilitatorForm: FormGroup;
  FirstName: String;
  Email: String;
  LastName: String;
  UserName: String;
  PhoneNumber: String;
  Bio: String
  disableTextbox =  true;
  profilePictureUrl: any;
  learner: any;
  learnerId: any;
  token: any;
  FacilitatorId: any;
  learnerProfilePicture: any;
  url : string;

  id: any;
  categories: any;

  constructor(private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private learnerService: LearnerService,
    private toastr: ToastrService,
    private allFacilitator: FacilitatorService,
    private router: Router) {
      this.FacilitatorId = null;
     }

  ngOnInit(): void {
    this.url = this.authService.baseUrl;

    this.learnerId = JSON.parse(this.authService.getId());
    // this.token = JSON.parse(this.authService.getFToken());
   console.log(this.learnerId)
   console.log('hey',this.token)
    this.getLearnerDetails(this.learnerId);
      this.profileUpdateForm = new FormGroup({
        FirstName: new FormControl({value:'', disabled:true}, Validators.required),
        LastName: new FormControl({value:'', disabled:true}, Validators.required),
        UserName: new FormControl({value:'', disabled:true}, null),
        PhoneNumber: new FormControl({value:'', disabled:true}, Validators.required),
        InstitutionAttended: new FormControl({value:'', disabled:true}, Validators.required),
        CourseOfStudy: new FormControl({value:'', disabled:true}, Validators.required),
        CertificateObtained: new FormControl({value:'', disabled:true}, Validators.required),
        Profession: new FormControl({value:'', disabled:true}, Validators.required),
        Bio: new FormControl({value:'', disabled:true}, Validators.required)});

        var readURL = (input) => {
          if (input.files && input.files[0]) {
              var reader = new FileReader();

              if(input.files[0].size > 1000000){
                alert("File is too big!");
                // this.value = "";
             }
             else {
  
              reader.onload = function (e) {
                
                  $('.profile-pic').attr('src', e.target.result);
              }

              // this.onUploadPicture(input.files[0]);
              // const file_data = input.files[0];
              // const data = new FormData();
              // data.append('file', file_data);
              // data.append('folder', 'expertplat/Learner_ProfilePics')
              // data.append('upload_preset', 'ypj1byk2');
              // data.append('cloud_name', 'mywebsite');
  
              const file_data = input.files[0];
              const data = new FormData();
              data.append('File', file_data);
              data.append('FolderTypeId', '4')
              data.append('AppId', '1');
              console.log(data);
  
              this.authService.uploadImage(data).subscribe((response) => {
                console.log(data);
                console.log(response);
                if (response.statusCode == 200) {
                  console.log(response);
                  console.log(response.fileData.fileUrl);
                  // if(response.url != null || undefined) {
                    this.profilePictureUrl = response.fileData.fileUrl
                    const user = {
                      learnerId : this.learnerId,
                      profilePictureUrl : this.profilePictureUrl
                    }
                    console.log(user);
                
                  let serializedForm = JSON.stringify(user);
                    console.log(serializedForm);
                
                    this.learnerService.updateLearnerProfilePicture(serializedForm, this.learnerId, this.profilePictureUrl).subscribe(data => {
                      console.log(data);
                      if(data.statusCode == 200){
                        reader.readAsDataURL(input.files[0]);
                        this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
                        // this.router.navigate(['login'])
                      }else {
                        this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
                        // this.router.navigate(['confirmation'])
                      }
                    });
                  }
                    
                  else {
                    this.toastr.error('An Error Occured, Please try again', 'Error', {
                      timeOut: 3000,
                    });
                  }
              });
                // reader.readAsDataURL(input.files[0]);
            }
          }
      }
      
  
      $(".file-upload").on('change', function(){
        
          readURL(this);
      });
      
      $(".upload-button").on('click', function() {
         $(".file-upload").click();
      });
  }
  toggle(event: any) {
    this.FacilitatorId = event.target.value;
    var selectOption =
      event.target.options[event.target.options.selectedIndex].text;
    console.log(selectOption);
    var selectOptionValue = this.FacilitatorId;
    console.log('hey',selectOptionValue);
    
    
  }

  // $scope.saveUser = function (event) {
  //   event.preventDefault();
    
  // }

  saveUser(event){
    event.preventDefault();
  }

  onProfileToFacilitatorSubmit(){
    // alert('hey there')
    // const value = {
    //   learnerId : this.learnerId,
    //   FacilitatorId: this.FacilitatorId,
    //   }
    //   console.log('fac', this.FacilitatorId)
    // let serializedForm = JSON.stringify(value);
    console.log(this.learnerId);
    console.log(this.FacilitatorId);

    this.learnerService.createLearnerToFacilitator(this.learnerId, this.FacilitatorId).subscribe(data => {
      console.log(data);
      if(data.statusCode == 200){
        this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true, timeout: 5000});
        // this.router.navigate(['login'])
      }else {
        this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
        // this.router.navigate(['confirmation'])
      }
    });
  }
  

  showFacilitators() {
    
      this.allFacilitator.getFacilitators().subscribe(
        (data) => {
          console.log('see',data.data);
          this.categories = data.data;
          event.preventDefault();
        },
        (err) => {
          console.log('see',err);
          return false;
        }
      );
      
    // if (subcategory.style.display == 'none') {
    //   subcategory.style.display = 'block';
    // }
  }

  onProfileUpdateSubmit(){
    const value = {
      learnerId : this.learnerId,
      FirstName : this.profileUpdateForm.get('FirstName').value,
      LastName : this.profileUpdateForm.get('LastName').value,
      UserName : this.profileUpdateForm.get('UserName').value,
      PhoneNumber : this.profileUpdateForm.get('PhoneNumber').value,
      Bio : this.profileUpdateForm.get('Bio').value}
    let serializedForm = JSON.stringify(value);
    console.log(serializedForm);

    this.learnerService.updateLearnerProfile(value).subscribe(data => {
      console.log(data);
      if(data.statusCode == 200){
        this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
        // this.router.navigate(['login'])
      }else {
        this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
        // this.router.navigate(['confirmation'])
      }
    });
  }

  enableFields() {
    this.profileUpdateForm.get('FirstName').enable();
    this.profileUpdateForm.get('LastName').enable();
    this.profileUpdateForm.get('UserName').enable();
    this.profileUpdateForm.get('PhoneNumber').enable();
    this.profileUpdateForm.get('Bio').enable();
    this.disableTextbox = false;
  }

  getLearnerDetails(id) {
    this.learnerService.getLearnerById(id).subscribe(detail => {
      console.log(detail);
      if(detail.statusCode == 200) {

      console.log(detail.data);
      this.learner = detail.data;

        this.profileUpdateForm = new FormGroup({
          FirstName: new FormControl({value:this.learner.firstName, disabled:true}, Validators.required),
          LastName: new FormControl({value:this.learner.lastName, disabled:true}, Validators.required),
          UserName: new FormControl({value:this.learner.userName, disabled:true}, null),
          PhoneNumber: new FormControl({value:this.learner.phoneNumber, disabled:true}, Validators.required),
          Bio: new FormControl({value:this.learner.bio, disabled:true}, Validators.required)});
          this.Email = this.learner.email;

          this.learnerProfilePicture = detail.data.profilePictureUrl;
          if(this.learnerProfilePicture == null) {
            this.learnerProfilePicture = "assets/img/gender-neutral-user.png"
          }
          else {
          $('.profile-pic').attr('src', this.learnerProfilePicture);
        }
      }
      // this.sendDataService.setMessage(detail.data);
    },
    err => {
      console.log(err);
      return false;
    });
  
  }

  onLogoutClick(){
    $("#logoutModal").modal('hide')
    this.authService.logout();
    // this._snackBar.open('You are logged out', 'dismiss', {
    //   duration: 500,
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
    this.router.navigate(['/home']);
    return false;
  }

}
