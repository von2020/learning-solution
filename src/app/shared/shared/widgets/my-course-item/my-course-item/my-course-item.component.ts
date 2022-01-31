import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-course-item',
  templateUrl: './my-course-item.component.html',
  styleUrls: ['./my-course-item.component.css'],
})
export class MyCourseItemComponent implements OnInit {
  @Input() courseName: String;
  @Input() courseImage: String;
  @Input() duration: String;

  constructor() {}

  ngOnInit(): void {}
}
