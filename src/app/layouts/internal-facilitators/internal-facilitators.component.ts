import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-internal-facilitators',
  templateUrl: './internal-facilitators.component.html',
  styleUrls: ['./internal-facilitators.component.css']
})
export class InternalFacilitatorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $('.nav-switch').on('click', function(event) {
      $('.main-menu').slideToggle(400);
      event.preventDefault();
    });

  }

}
