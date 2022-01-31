import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { LearnerService } from 'src/app/services/learner.service';
import { SendDataService } from 'src/app/services/send-data.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  @Input() cartId: String;
  categories: any;
  subCategorys: any;
  selectedCategoryId: any;
  showBadge: boolean = false;
  learnerId: any;
  profilePicture: any;
  url: string;

  constructor(
    private authService: AuthService,
    private sendDataService: SendDataService,
    private learnerService: LearnerService,
    private facilitatorService: FacilitatorService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngAfterViewChecked(): void {
    if (this.isLoggedIn()) {
      // Get the input field
      var input = document.getElementById('search_in');

      // Execute a function when the user releases a key on the keyboard
      input.addEventListener('keyup', function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById('search_btn').click();
        }
      });
    }
  }

  ngOnInit(): void {
    $('#cartBadgevisibility').hide();

    this.learnerId = JSON.parse(this.authService.getId());
    console.log(this.learnerId);

    if (this.learnerId != null || this.learnerId == !typeof undefined) {
      this.learnerService.getLearnerById(this.learnerId).subscribe(
        (data) => {
          console.log(data);
          if (data.statusCode == 200) {
            console.log(data);
            console.log(data.data);
            var dp = this.authService.baseUrl;
            this.profilePicture = data.data.profilePictureUrl;

            if (this.profilePicture != null) {
              this.profilePicture = data.data.profilePictureUrl;
            }
            console.log(this.profilePicture);
          }
        },
        (err) => {
          console.log(err);
          return false;
        }
      );
    }
  }

  getCourseByCourseName(value: string) {
    if (value == '') {
      this.toastr.error('Please enter a keyword', 'Error', {
        timeOut: 3000,
      });
    } else {
      this.sendDataService.setMessage(value);
      // this.router.navigate(['/course-search']);
      this.router.navigate(['/course-search'], {
        queryParams: { name: value },
      });
      // this.router.navigate(['/login']);
    }
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.toastr.success('You are Logged Out');
  }

  isLoggedIn() {
    if (
      localStorage.getItem('id_token') == null ||
      localStorage.getItem('id_token') == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  isFLoggedIn() {
    if (
      localStorage.getItem('id_Ftoken') == null ||
      localStorage.getItem('id_Ftoken') == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  isCartExist() {
    if (
      this.authService.cartId == null ||
      this.authService.cartId == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  unBadge() {
    $('.clickme').click(function () {
      // $("#badgevisibility").fadeToggle(300);
      $('#badgevisibility, #cartBadgevisibility').fadeOut(300).hide();
    });
  }
}
