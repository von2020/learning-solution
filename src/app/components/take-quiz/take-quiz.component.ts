import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Itquestion,
  Iquiz,
  IresultData,
  IcreateResult,
} from '../../shared/Model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseQuizService } from 'src/app/services/courseQuiz.service';
import { SendDataService } from 'src/app/services/send-data.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ScriptService } from 'src/app/services/script.service';
import { CourseService } from 'src/app/services/course.service';
import { LearnerService } from 'src/app/services/learner.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
declare var $: any;

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css'],
})
export class TakeQuizComponent implements OnInit, OnDestroy {
  quiz: Iquiz;
  description: string;
  percentagePassMark: any;
  duration: any;
  totalQuestion: any;
  resultDatas: Array<IresultData>;
  createdData: IcreateResult;
  id: number;
  private sub: any;
  answer: string;
  myQuestion: Itquestion;
  questions: Array<Itquestion>;

  course: any;
  facilitatorId: any;
  facilitator: any;
  url: string;
  profilePicture: any;
  answerForm: FormGroup;
  isLastItem: string;
  message: string;

  constructor(
    fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private courseQuizService: CourseQuizService,
    private courseService: CourseService,
    private facilitatorService: FacilitatorService,
    private learnerService: LearnerService,
    private sendDataService: SendDataService
  ) {
    this.resultDatas = [];
  }
  ngOnDestroy(): void {
    $('#elapsedModal').modal('hide');
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.isLastItem = 'false';
    this.answerForm = new FormGroup({
      answer: new FormControl('', Validators.required),
    });

    this.url = this.auth.baseUrl;
    this.sub = this.route.queryParams.subscribe((params) => {
      this.id = +params['id'];

      this.sendDataService.setMessage(this.id);
      this.auth.storeCourseId(this.id);

      this.courseService.getCoursesById(this.id).subscribe(
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

      this.learnerService.courseQuizByCourseId(this.id).subscribe(
        (res: any) => {
          console.log(res);
          if (res.statusMessage == 'Successful') {
            this.quiz = res.data;
            this.description = res.data.description;
            this.percentagePassMark = res.data.percentagePassMark;
            this.duration = res.data.duration;
            this.countdown('timer', this.duration, 0);
            console.log(this.quiz);
            this.learnerService
              .courseQuizQuestions(this.quiz.id)
              .subscribe((red: any) => {
                console.log(red);
                this.questions = red.data;
                const no0fQuestions = red.data;
                this.totalQuestion = no0fQuestions.length;
                // this.questions.unshift(null);
                // this.questions = this.questions.splice(0, 0, null);
                this.myQuestion = this.questions[0];
                this.myQuestion.sn = 1;
                console.log(this.myQuestion);
              });
          } else if (res.statusMessage == 'No Available Record') {
            this.message = 'Quiz has not yet been set by this Facilitator';
          }
        },
        (err) => {
          console.log('a big big error', err);
        }
      );
    });

    $('.btnNext').click(function () {
      $('.nav-pills .active')
        .parent()
        .next('li')
        .find('button')
        .trigger('click');
    });

    $('.btnPrevious').click(function () {
      $('.nav-pills .active')
        .parent()
        .prev('li')
        .find('button')
        .trigger('click');
    });
  }

  countdown(elementName, minutes, seconds) {
    var element, endTime, hours, mins, msLeft, time;

    function returnDate() {
      return Number(new Date());
    }

    function twoDigits(n) {
      return n <= 9 ? '0' + n : n;
    }

    function timeElapsed() {
      $('#elapsedModal').modal('show');
    }

    function updateTimer() {
      msLeft = endTime - returnDate();
      if (msLeft < 1000) {
        element.innerHTML = '0:00';
        timeElapsed();
      } else {
        time = new Date(msLeft);
        hours = time.getUTCHours();
        mins = time.getUTCMinutes();
        element.innerHTML =
          (hours ? hours + ':' + twoDigits(mins) : mins) +
          ':' +
          twoDigits(time.getUTCSeconds());
        setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
      }
    }

    element = document.getElementById(elementName);
    endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;
    updateTimer();
  }

  fixanswer(data: IresultData) {
    console.log(data);
    let exist = false;
    this.resultDatas.forEach((element, index) => {
      if (element.QuestionId == data.QuestionId) {
        exist = true;
        this.resultDatas[index] = data;
      }
    });

    if (!exist) {
      this.resultDatas.push(data);
    }
  }
  submit(e) {
    this.answer = this.answerForm.get('answer').value;
    this.fixanswer({ Answer: this.answer, QuestionId: e.id });

    let learn = localStorage.getItem('userId');
    console.log(JSON.parse(learn));
    this.createdData = {
      CourseQuizId: this.quiz.id,
      Data: this.resultDatas,
      LearnerId: JSON.parse(learn),
    };
    console.log(this.createdData);
    this.courseQuizService.postResult(this.createdData).subscribe(
      (res) => {
        console.log(res);
        if (res.statusMessage == 'Result Computed Successfully') {
          const resultId = res.data.id;
          this.router.navigate(['/quiz-result'], {
            queryParams: { id: resultId },
          });
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
  next(e: any) {
    console.log(e);
    // this.questions.unshift(null);
    // this.assignQuestion(this.answerForm.value[e.sn], e.sn);
    // this.assignQuestion((this.answerForm.get('answer').value), e.sn);
    this.answer = this.answerForm.get('answer').value;
    this.fixanswer({ Answer: this.answer, QuestionId: e.id });
    console.log(this.questions.length);
    console.log(this.myQuestion.sn);

    if (this.myQuestion.sn == this.questions.length) {
      this.isLastItem = 'true';
    } else {
      this.answerForm.get('answer').patchValue('');
      this.assignQuestion(
        this.questions[this.myQuestion.sn],
        this.myQuestion.sn
      );
    }
  }

  //  next () {
  //    console.log (this.answerForm.value);
  //  }

  update2() {
    this.assignAnswer(this.answer);
  }
  assignQuestion(question: Itquestion, index): void {
    this.answer = '';

    // this.answerForm = new FormGroup({
    //   answer: new FormControl('', Validators.required)});

    console.log(question, index);
    this.myQuestion = question;
    this.myQuestion.sn = index + 1;
  }
  assignAnswer(answer: string) {
    this.fixanswer({ Answer: answer, QuestionId: this.myQuestion.id });
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
}
