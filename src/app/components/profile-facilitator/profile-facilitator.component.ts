import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { BaseUrl } from 'src/app/baseurl';
import { AuthService } from 'src/app/services/auth.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';

declare var $:any;

@Component({
  selector: 'app-profile-facilitator',
  templateUrl: './profile-facilitator.component.html',
  styleUrls: ['./profile-facilitator.component.css']
})
export class ProfileFacilitatorComponent implements OnInit {

  profileUpdateForm: FormGroup;
  FirstName: String;
  Email: String;
  LastName: String;
  UserName: String;
  PhoneNumber: String;
  Profession: String;
  Bio: String
  InstitutionAttended: String;
  CourseOfStudy: String
  CertificateObtained: String;
  disableTextbox =  true;
  profilePictureUrl: any;
  facilitator: any;
  facilitatorId: any;
  facilitatorProfilePicture: any;
  url : string;
  
  constructor(private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private toastr: ToastrService,
    private facilitatorService: FacilitatorService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.url = this.authService.baseUrl;
    
    this.facilitatorId = JSON.parse(this.authService.getFId());
   console.log(this.facilitatorId)
    this.getFacilitatorDetails(this.facilitatorId);
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
                    facilitatorId : this.facilitatorId,
                    profilePictureUrl : this.profilePictureUrl
                  }
                  console.log(user);
              
                let serializedForm = JSON.stringify(user);
                  console.log(serializedForm);
              
                  this.facilitatorService.updateFacilitatorProfilePicture(serializedForm, this.facilitatorId, this.profilePictureUrl).subscribe(data => {
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


  onProfileUpdateSubmit(){
    const value = {
      FacilitatorId : this.facilitatorId,
      FirstName : this.profileUpdateForm.get('FirstName').value,
      LastName : this.profileUpdateForm.get('LastName').value,
      UserName : this.profileUpdateForm.get('UserName').value,
      PhoneNumber : this.profileUpdateForm.get('PhoneNumber').value,
      InstitutionAttended : this.profileUpdateForm.get('InstitutionAttended').value,
      CourseOfStudy : this.profileUpdateForm.get('CourseOfStudy').value,
      CertificateObtained : this.profileUpdateForm.get('CertificateObtained').value,
      Profession : this.profileUpdateForm.get('Profession').value,
      Bio : this.profileUpdateForm.get('Bio').value}
    let serializedForm = JSON.stringify(value);
    console.log(serializedForm);

    this.facilitatorService.updateFacilitatorProfile(value).subscribe(data => {
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
    this.profileUpdateForm.get('InstitutionAttended').enable();
    this.profileUpdateForm.get('CourseOfStudy').enable();
    this.profileUpdateForm.get('CertificateObtained').enable();
    this.profileUpdateForm.get('Profession').enable();
    this.profileUpdateForm.get('Bio').enable();
    this.disableTextbox = false;
  }

  getFacilitatorDetails(id) {
    this.facilitatorService.getFacilitatorById(id).subscribe(detail => {
      if(detail.statusCode == 200) {

      console.log(detail.data);
      this.facilitator = detail.data;

        this.profileUpdateForm = new FormGroup({
          FirstName: new FormControl({value:this.facilitator.firstName, disabled:true}, Validators.required),
          LastName: new FormControl({value:this.facilitator.lastName, disabled:true}, Validators.required),
          UserName: new FormControl({value:this.facilitator.userName, disabled:true}, null),
          PhoneNumber: new FormControl({value:this.facilitator.phoneNumber, disabled:true}, Validators.required),
          InstitutionAttended: new FormControl({value:this.facilitator.institutionAttended, disabled:true}, Validators.required),
          CourseOfStudy: new FormControl({value:this.facilitator.courseOfStudy, disabled:true}, Validators.required),
          CertificateObtained: new FormControl({value:this.facilitator.certificateObtained, disabled:true}, Validators.required),
          Profession: new FormControl({value:this.facilitator.profession, disabled:true}, Validators.required),
          Bio: new FormControl({value:this.facilitator.bio, disabled:true}, Validators.required)});
          this.Email = this.facilitator.email;

          this.facilitatorProfilePicture = detail.data.profilePictureUrl;
          if(this.facilitatorProfilePicture == null) {
            this.facilitatorProfilePicture = "assets/img/gender-neutral-user.png"
          }
          else {
          $('.profile-pic').attr('src', this.facilitatorProfilePicture);
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
