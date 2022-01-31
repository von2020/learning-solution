import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';

@Component({
  selector: 'app-dash-navbar',
  templateUrl: './dash-navbar.component.html',
  styleUrls: ['./dash-navbar.component.css']
})
export class DashNavbarComponent implements OnInit {
  facilitatorId: any;
  facilitator: any;
  profileUpdateForm: any;
  Email: any;
  facilitatorProfilePicture: any;
  url : string;

  constructor(private authService: AuthService, private facilitatorService: FacilitatorService) { }

  ngOnInit(): void {
    
    this.url = this.authService.baseUrl;

    this.facilitatorId = JSON.parse(this.authService.getFId());
   console.log(this.facilitatorId)
    this.getFacilitatorDetails(this.facilitatorId);
  }

  getFacilitatorDetails(id) {
    this.facilitatorService.getFacilitatorById(id).subscribe(detail => {
      if(detail.statusCode == 200) {

      console.log(detail.data);
      this.facilitator = detail.data;

      this.facilitatorProfilePicture = detail.data.profilePictureUrl;

      if (this.facilitatorProfilePicture !=null) {
        this.facilitatorProfilePicture = detail.data.profilePictureUrl;
      }
          // $('.profile-pic').attr('src', this.facilitatorProfilePicture);
      }
      // this.sendDataService.setMessage(detail.data);
    },
    err => {
      console.log(err);
      return false;
    });
  
  }

}
