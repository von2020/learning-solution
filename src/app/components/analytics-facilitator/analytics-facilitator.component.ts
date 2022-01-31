import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ScriptService } from 'src/app/services/script.service';
declare var $ : any;
declare var c3 : any;
declare var Morris : any;

@Component({
  selector: 'app-analytics-facilitator',
  templateUrl: './analytics-facilitator.component.html',
  styleUrls: ['./analytics-facilitator.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AnalyticsFacilitatorComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private script : ScriptService) { 
     }
     
  ngOnInit(): void {
    
    this.script.load('raphael', 'morris', 'c3', 'd3', 'C3chartjs',).then(data => {
      console.log('script loaded ', data);
      
  // ============================================================== 
    // Total Revenue
    // ============================================================== 
    Morris.Area({
      element: 'morris_totalrevenue',
      behaveLikeLine: true,
      data: [
          { x: '2016 Q1', y: 0, },
          { x: '2016 Q2', y: 7500, },
          { x: '2017 Q3', y: 15000, },
          { x: '2017 Q4', y: 22500, },
          { x: '2018 Q5', y: 30000, },
          { x: '2018 Q6', y: 40000, }
      ],
      xkey: 'x',
      ykeys: ['y'],
      labels: ['Y'],
      lineColors: ['#5969ff'],
      resize: true

  });


    // ============================================================== 
    // Revenue By Categories
    // ============================================================== 

    var chart = c3.generate({
      bindto: "#c3chart_category",
      data: {
          columns: [
              ['Men', 100],
              ['Women', 80],
              ['Accessories', 50],
              ['Children', 40],
              ['Apperal', 20],

          ],
          type: 'donut',

          onclick: function(d, i) { console.log("onclick", d, i); },
          onmouseover: function(d, i) { console.log("onmouseover", d, i); },
          onmouseout: function(d, i) { console.log("onmouseout", d, i); },

          colors: {
              Men: '#5969ff',
              Women: '#ff407b',
              Accessories: '#25d5f2',
              Children: '#ffc750',
              Apperal: '#2ec551',



          }
      },
      donut: {
          label: {
              show: false
          }
      },



  });

  }).catch(error => console.log(error));

  }

  onLogoutClick(){
    $("#logoutModal").modal('hide')
    this.authService.logout();
    this.toastr.success('Logout Successfull');
    this.router.navigate(['/login']);
    return false;
  }
}
