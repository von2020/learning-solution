import { Component, Input, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
})
export class CourseItemComponent implements OnInit {
  @Input() courseAmount: any;
  @Input() courseTypeName: String;
  @Input() courseName: String;
  @Input() courseDescription: String;
  @Input() courseImage: any;
  @Input() aboutCourse: String;
  @Input() firstName: String;
  @Input() lastName: String;
  @Input() rating: number;
  @Input() rateCount: number;
  // @Input() rating: any;
  @Input() loading: boolean = false;

  currentRate = 0;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      $('.my-rating').starRating({
        starSize: 18,
        starShape: 'rounded',
        readOnly: true,
      });
    }, 2000);

    $('.course-rating').starRating({
      starSize: 18,
      readOnly: true,
      starShape: 'rounded',
      hoverColor: 'crimson',
      activeColor: 'salmon',
    });
  }
}
