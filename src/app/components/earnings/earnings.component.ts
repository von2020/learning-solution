import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
declare var $ : any;

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit {
  courses: any;
  settled: any;
  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
  unsettled: any;
  total : number
  settles : any =[]
  unsettles : any =[]
  amounts: any;
  settledAmounts: any[];

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private facilitatorService: FacilitatorService,
    private router: Router) { }

  ngOnInit(): void {
    const fuser = localStorage.getItem('userFId');

    this.facilitatorService.getPercentageEarnedOnCourses(JSON.parse(fuser)).subscribe((response) => {
      if (response.statusMessage === 'No Available Record') {
        // alert('create at least 1 course');
        return;
      }
      // this.toastr.success(response.statusMessage);
      this.dtOptions = {
        // pagingType: 'full_numbers',
        pageLength: 10,
           lengthMenu : [10, 20, 25, 50],
        processing: true
      };
      this.dtTrigger.next()
      this.courses = response.data;
      console.log(response);

    });

    this.facilitatorService.getTotalEarningsSettled(JSON.parse(fuser)).subscribe((response) => {
      
      console.log(response);
      if (response.statusMessage === "No Available Record") {
        // alert('create at least 1 course');
        this.settled = 0
        return;
      }

      else {
      // this.toastr.success(response.statusMessage);
      this.settles = response.data
      console.log(this.settles)

      this.settledAmounts = []

      this.settles.forEach(element => { 
        this.settledAmounts.push(element.totalAmountEarned);
        });
      
      console.log(this.settledAmounts)
      this.settled = this.settledAmounts.reduce((a, b) => a + b, 0)
      console.log(this.settled)
      }
    });

    this.facilitatorService.getTotalEarningsUnSettled(JSON.parse(fuser)).subscribe((response) => {
      
      console.log(response);
      if (response.statusMessage === "No Available Record") {
        // alert('create at least 1 course');
        this.unsettled = 0
        this.total = this.settled+this.unsettled
        console.log(this.total)
        return;
      }

      else {
      this.unsettles = response.data
      console.log(this.unsettles)

      this.amounts = []

      this.unsettles.forEach(element => { 
        this.amounts.push(element.totalAmountEarned);
        });
      
      console.log(this.amounts)
      this.unsettled = this.amounts.reduce((a, b) => a + b, 0)
      console.log(this.unsettled)
      // this.toastr.success(response.statusMessage);
      // this.unsettled = response.data.totalAmountEarned;

      
      this.total = this.settled+this.unsettled;
      }
    });
  }


  onLogoutClick(){
    $("#logoutModal").modal('hide')
    this.authService.logout();
    this.toastr.success('You are logged out');
    this.router.navigate(['/home']);
    return false;
  }

}