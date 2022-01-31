import { Component, OnDestroy, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-school-log-in',
  templateUrl: './school-log-in.component.html',
  styleUrls: ['./school-log-in.component.css']
})
export class SchoolLogInComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnDestroy(): void {
    $('.header-section').css({ position: "relative" });
    $(".header-section").addClass("shadow");
    $(".navbar").addClass('navbar-light').removeClass('navbar-dark');
    $(".navbar").addClass('bg-white').removeClass('bg-light');
  }

  ngOnInit(): void {
    $(".header-section").removeAttr("style");
    $('.header-section').css({ position: "absolute" });
    $(".header-section").removeClass("shadow");
    // $(".navbar").removeClass('navbar-light').addClass('navbar-dark');
    // $(".navbar").removeClass('bg-white').addClass('bg-light');
  }

}
