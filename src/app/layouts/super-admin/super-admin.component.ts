import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScriptService } from 'src/app/services/script.service';



@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SuperAdminComponent implements OnInit {

  constructor(private script : ScriptService) { 
    
  this.script.load('chartist', 'sparkline', 'raphael', 'morris', 'c3', 'd3', 'C3chartjs', 'e-commerce').then(data => {
    console.log('script loaded ', data);
}).catch(error => console.log(error));

  }

  ngOnInit(): void {
  }

}
