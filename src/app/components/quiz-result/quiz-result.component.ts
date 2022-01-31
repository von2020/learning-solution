import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { CourseQuizService } from 'src/app/services/courseQuiz.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { LearnerService } from 'src/app/services/learner.service';
import { SendDataService } from 'src/app/services/send-data.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css'],
})
export class QuizResultComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  answer: string;
  course: any;
  facilitatorId: any;
  facilitator: any;
  learner: any;
  url: string;
  profilePicture: any;
  quizResult: any;
  learnerId: any;
  courseId: String;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private sendDataService: SendDataService,
    private courseQuizService: CourseQuizService,
    private courseService: CourseService,
    private learnerService: LearnerService,
    private facilitatorService: FacilitatorService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.auth.removeCourseId();
  }

  ngOnInit(): void {
    this.url = this.auth.baseUrl;
    this.sub = this.route.queryParams.subscribe((params) => {
      this.id = +params['id'];

      this.learnerService.getCourseQuizByResult(this.id).subscribe(
        (result) => {
          console.log(result.data);
          if (result.statusCode == 200) {
            this.quizResult = result.data[0];
            console.log(this.quizResult);
            this.getLearnerById(this.quizResult.learnerId);
          }
        },
        (err) => {
          console.log(err);
          return false;
        }
      );

      if (this.sendDataService.getMessage() != null) {
        this.courseId = this.sendDataService.getMessage();
      } else {
        this.courseId = JSON.parse(this.auth.getCourseId());
      }
      console.log(this.courseId);

      this.courseService.getCoursesById(this.courseId).subscribe(
        (category) => {
          console.log(category.data);
          if (category.statusCode == 200) {
            this.course = category.data[0];
            this.facilitatorId = category.data[0].courseData.facilitatorId;
            console.log(this.facilitatorId);
            this.getFacilitatorById(this.facilitatorId);
          }
          //  this.sendDataService.setMessage(category.data);
        },
        (err) => {
          console.log(err);
          return false;
        }
      );
    });

    // this.learnerId = this.quizResult.learnerId
  }

  getFacilitatorById(id) {
    this.facilitatorService.getFacilitatorById(id).subscribe(
      (detail) => {
        console.log(detail.data);
        this.facilitator = detail.data;
        this.profilePicture = this.facilitator.profilePictureUrl;
        // this.sendDataService.setMessage(detail.data);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getLearnerById(id) {
    this.learnerService.getLearnerById(id).subscribe(
      (detail) => {
        console.log(detail.data);
        this.learner = detail.data;
        // this.sendDataService.setMessage(detail.data);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getCourseCertificate() {
    this.learnerService
      .getCourseCertificate(this.quizResult.learnerId, this.courseId)
      .subscribe(
        (data) => {
          console.log(data);
          if (data.statusMessage == 'Successful') {
            console.log(data.statusMessage);
            this.router.navigate(['/certificate'], { queryParams: data.data });
            // this.sendDataService.setMessage(data.data);
            // this.isCourseCompleted = true
          } else {
            console.log(data.statusMessage);
          }
        },
        (err) => {
          console.log(err);
          return false;
        }
      );
  }
}
