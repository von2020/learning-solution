import { TestBed } from '@angular/core/testing';

import { CourseTopicQuizService } from './course-topic-quiz.service';

describe('CourseTopicQuizService', () => {
  let service: CourseTopicQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseTopicQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
