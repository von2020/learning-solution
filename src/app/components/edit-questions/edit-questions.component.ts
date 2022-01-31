import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CourseQuizService } from 'src/app/services/courseQuiz.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { LearnerService } from 'src/app/services/learner.service';
import { Iquestion } from 'src/app/shared/Model';
declare var $ : any;

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.css']
})


export class EditQuestionsComponent implements OnInit {
  pageLength: number = 10
  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
  // questions : Itquestion
  questions: Array<Iquestion> = [];
  questionString: string = '';
  question: Iquestion = {
    Question: ''
  };
  MultipleQuestion: Iquestion = {
    Question: '',
    QuestionTypeId: 1

  };
  filQuestion: Iquestion = {
    Question: '',
    QuestionTypeId: 2

  };
  boolQuestion: Iquestion = {
    Question: '',
    QuestionTypeId: 3,

  };
  loading : boolean
  courses: any;
  courseId: any;
  questionId: any;
  quest: any = [];

  constructor(private courseQuiz: CourseQuizService,
    private toastr: ToastrService,
    private authService: AuthService,
    private courseQuizService: CourseQuizService,
    private learnerService: LearnerService,
    private router: Router) {
      
    console.log(localStorage.getItem('quiz'));
    let id: any = JSON.parse(localStorage.getItem('quiz')).id;
    
    this.learnerService.courseQuizQuestions(id).subscribe((red: any) => {
      console.log(red);
      this.dtOptions = {
        // pagingType: 'full_numbers',
        pageLength: 10,
           lengthMenu : [10, 20, 25, 50],
        processing: true
      };
      this.dtTrigger.next()
      this.questions = red.data;
      // this.questions.push(red.data);
      // this.questions.unshift(null);
      // this.questions = this.questions.splice(0, 0, null);
      console.log(this.questions)
    });
     }

  ngOnInit(): void {
  }

  editQuestion(e) {
    this.quest = e
  }

  update(): void {
    if (this.quest.questionTypeId == 2) {
      let test = this.question;
    test.Question = (document.getElementById('filQuestionE') as HTMLInputElement).value;
      test.Answer = (document.getElementById('filAnswerE') as HTMLInputElement).value;
      
      this.questions.forEach((element, index) => {
        if (this.question.id == element.id) { 
          this.questions[index] = test;
          return;
}
      })
      this.questionString = '';
      this.questions.forEach((element) => {
        this.questionString += JSON.stringify(element) + '~';
      })
     
      console.log(this.questionString);
      
    }

    if (this.quest.questionTypeId == 1) {
      let test = this.question;
      test.Question = (document.getElementById('mulQuestionE') as HTMLInputElement).value;
    test.Option1 = (document.getElementById('mulOpt1E') as HTMLInputElement).value;
    test.Option2 = (document.getElementById('mulOpt2E') as HTMLInputElement).value;
    test.Option3 = (document.getElementById('mulOpt3E') as HTMLInputElement).value;
    test.Option4 = (document.getElementById('mulOpt4E') as HTMLInputElement).value;
    if ((document.getElementById('mOption1E') as HTMLInputElement).checked) test.Answer = 'Option1';
    if ((document.getElementById('mOption2E') as HTMLInputElement).checked) test.Answer = 'Option2';
    if ((document.getElementById('mOption3E') as HTMLInputElement).checked) test.Answer = 'Option3';
      if ((document.getElementById('mOption4E') as HTMLInputElement).checked) test.Answer = 'Option4';
      
      this.questions.forEach((element, index) => {
        if (this.question.id == element.id) { 
          this.questions[index] = test;
          return;
}
      })
      this.questionString = '';
      this.questions.forEach((element) => {
        this.questionString += JSON.stringify(element) + '~';
      })
     
      console.log(this.questionString);

    }
    if (this.quest.questionTypeId == 3) {
      let test = this.question;
      test.Question = (document.getElementById('boolQuestionE') as HTMLInputElement).value;
      if ((document.getElementById('option1E') as HTMLInputElement).checked) test.Answer = 'Option1';
      if ((document.getElementById('option2E') as HTMLInputElement).checked) test.Answer = 'Option2';
      this.questions.forEach((element, index) => {
        if (this.question.id == element.id) { 
          this.questions[index] = test;
          return;
}
      })
      this.questionString = '';
      this.questions.forEach((element) => {
        this.questionString += JSON.stringify(element) + '~';
      })
     
      console.log(this.questionString);
    }
  }
  upload() {
    console.log();
  }
  private cleanArray(str: string): Array<any> {
    let ary: Array<string> = str.split('~');
    console.log(ary);
    let result: Array<any> = [];
    ary.forEach(element => {
      if (element) {
        console.log(element);
        let test: any = JSON.parse(element);
       result.push( test );
      }
    });
    return result;
  }

  add(question: Iquestion): void {
    console.log(this.MultipleQuestion);
    question.id = this.questions.length + 1;
    question.Question = (document.getElementById('mulQuestion') as HTMLInputElement).value;
    question.Option1 = (document.getElementById('mulOpt1') as HTMLInputElement).value;
    question.Option2 = (document.getElementById('mulOpt2') as HTMLInputElement).value;
    question.Option3 = (document.getElementById('mulOpt3') as HTMLInputElement).value;
    question.Option4 = (document.getElementById('mulOpt4') as HTMLInputElement).value;
    if ((document.getElementById('mOption1') as HTMLInputElement).checked) question.Answer = 'Option1';
    if ((document.getElementById('mOption2') as HTMLInputElement).checked) question.Answer = 'Option2';
    if ((document.getElementById('mOption3') as HTMLInputElement).checked) question.Answer = 'Option3';
    if ((document.getElementById('mOption4') as HTMLInputElement).checked) question.Answer = 'Option4';

    
    this.questionString += JSON.stringify(question) + '~';
    this.questions = this.cleanArray(this.questionString);
    console.log(this.questions);
    console.log(this.questionString);

  }
  addFill(): void {
    let question = this.filQuestion;
    question.id = this.questions.length + 1;
    question.Question = (document.getElementById('filQuestion') as HTMLInputElement).value;
    question.Answer = (document.getElementById('filAnswer') as HTMLInputElement).value;
    this.questionString += JSON.stringify(question) + '~';
    this.questions.push(question);
    this.questions = this.cleanArray(this.questionString);
    console.log(this.questions);
    console.log(this.questionString);
  }
  addBool(): void  {
    let question = this.boolQuestion;
    question.id = this.questions.length + 1;
    question.Question = (document.getElementById('boolQuestion') as HTMLInputElement).value;
    if ((document.getElementById('option1') as HTMLInputElement).checked) question.Answer = 'Option1';
    if ((document.getElementById('option2') as HTMLInputElement).checked) question.Answer = 'Option2';
    this.questionString += JSON.stringify(question) + '~';
    this.questions.push(question);
    this.questions = this.cleanArray(this.questionString);
    console.log(this.questions);
    console.log(this.questionString);
  }

  
  deleteQuestion(id) {
    this.questionId = id;
    $('#deleteModal').modal('show');
  }

  confirmDeleteQuestion() {
    this.loading = true;
    this.courseQuizService.deleteCourseQuizQuestion(this.questionId).subscribe(data => {
      this.loading = false;
      console.log(data);
        if(data.statusCode == 200){
          // this.questions = this.questions.filter((ser) => {
          //   return ser.questionId !== this.questionId
          // });
          location.reload();
          console.log(this.questions);
          this.toastr.info('Course removed');
          $('#deleteModal').modal('hide');
        } else if (data.statusMessage == "This Course has been Enrolled for") {
          this.toastr.info(data.statusMessage);
          $('#deleteModal').modal('hide');
        }
        else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          $('#deleteModal').modal('hide');
        }
      },
      err => {
        this.loading = false;
        console.log(err);
        return false;
      });
  }

  updateQuestion(id) {
    this.questionId = id;
    $('#deleteModal').modal('show');
  }

  confirmUpdateQuestion(data, id) {
    console.log(data, id)
    const quizData = {
      CourseQuizId : data.courseQuizId,
      QuestionTypeId : data.questionTypeId,
      Question : data.question,
      Option1 : data.option1,
      Option2 : data.option2,
      Option3 : data.option3,
      Option4 : data.option4,
      Answer : data.answer
    }
    console.log(quizData);

    this.courseQuizService.updateCourseQuizQuestion(quizData, id).subscribe(data => {
      console.log(data);
      if(data.statusCode == 200){
        this.toastr.success('Question updated');
      }else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
      }
    });
  }
  

onLogoutClick(){
  $("#logoutModal").modal('hide')
  this.authService.logout();
  this.router.navigate(['/home']);
  return false;
}

}


export interface Itquestion {
  id?: number;
  courseQuizId?: number;
  questionTypeId?: number;
  question: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  answer?: string;
}