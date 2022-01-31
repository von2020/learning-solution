import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LearnerService } from 'src/app/services/learner.service';
import { SendDataService } from 'src/app/services/send-data.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  Email: any;
  Code: String;
  countdown: boolean = false;

  constructor(
    private sendDataService: SendDataService,
    private learnerService: LearnerService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var email =
      this.sendDataService.getMessage() ||
      JSON.parse(this.authService.getConfimationEmail());
    this.Email = email;
    console.log(this.Email);
  }

  startCountdown() {
    var maxTicks = 60;
    var tickCount = 0;

    var tick = () => {
      if (tickCount >= maxTicks) {
        // Stops the interval.
        clearInterval(myInterval);
        this.countdown = false;
        return;
      }

      /* The particular code you want to excute on each tick */
      document.getElementById('timer').innerHTML = (
        maxTicks - tickCount
      ).toString();

      tickCount++;
    };

    // Start calling tick function every 1 second.
    var myInterval = setInterval(tick, 1000);
  }

  onActivateSubmit() {
    const user = {
      Email: this.Email,
      Code: this.Code,
    };
    console.log(user);

    this.learnerService
      .activateAccount(JSON.stringify(user))
      .subscribe((data) => {
        console.log(data);
        if (data.statusCode == 200) {
          this.toastr.success(data.statusMessage);
          this.router.navigate(['login']);
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          this.router.navigate(['confirmation']);
        }
      });
  }

  resendCode() {
    this.learnerService.resendLearnerActivationCode(this.Email).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          this.toastr.success(data.statusMessage);
          this.countdown = true;
          this.startCountdown();
          // this.router.navigate(['login']);
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}
