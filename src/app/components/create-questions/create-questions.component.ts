import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CourseQuizService } from 'src/app/services/courseQuiz.service';
import { Iquestion, Iquiz, IbulkQuestions } from 'src/app/shared/Model';

declare var $: any;

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css'],
  // animations: [
  //   trigger('slide', [
  //     state('void', style({ transform: 'translateX(-50%)' })),
  //     state('*', style({ transform: 'translateX(0)' })),
  //     transition('void => *', animate(2000))
  //   ])
  // ]
})

export class CreateQuestionsComponent implements OnInit {
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
  quiz: Iquiz = {};
  active = 'multiple';
  loader = false;
  createdQuizzes: any=[]
  constructor(private courseQuiz: CourseQuizService,
    private authService: AuthService,
    private router: Router) {
    console.log(localStorage.getItem('quiz'));
    let temp: any = JSON.parse(localStorage.getItem('quiz'));
    console.log(temp);
    this.quiz = temp;

    const fuser = localStorage.getItem('userFId');
    this.courseQuiz.getCourseQuizByFacilitator(JSON.parse(fuser)).subscribe((response) => {
     
      console.log(response.data);
      
      this.createdQuizzes = response.data;
    }, (err) => {
      console.log(err);
    });
    // if(this.quiz.CourseId){
    //   console.log('quiz',this.quiz);
    // }
    // else {
    //   alert('You  have to select  an Assessment');
    //   location.href = '/create-assessment';
    // }

   }

  ngOnInit(): void {
  }


  update(): void {
    if (this.question.QuestionTypeId == 2) {
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

    if (this.question.QuestionTypeId == 1) {
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
    if (this.question.QuestionTypeId == 3) {
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


  remove() {

    this.questions.forEach((ele, i) => {
      if (this.question.id == ele.id) {
        this.questions.splice(i, 1);
        this.questionString = '';
        this.questions.forEach((element) => {
          this.questionString += JSON.stringify(element) + '~';
        })
       
        console.log(this.questionString);
        return;
      }
    })

  }
  edit(item: Iquestion): void{

     this.question = item;
    if (this.question.QuestionTypeId === 1) {
      this.active = 'multiple';
    }
    if (this.question.QuestionTypeId === 2) {
      this.active = 'filling';
    }
    if (this.question.QuestionTypeId === 3) {
      this.active = 'bool';
    }
  }

  submit(): void {
    
    const DATA: IbulkQuestions = {
      CourseQuizId: this.quiz.id,
      Questions: this.questions
    };
    console.log(DATA);
    this.loader = true;
    this.courseQuiz.createBulkCourseQuizQuestion(DATA).subscribe((success) => {
      this.loader = false;
      alert('Your Quiz Questions have successfully created');
    }, (err) => {
        console.log(err);
        alert('oops something went wrong');
    });
  }

  

onLogoutClick(){
  $("#logoutModal").modal('hide')
  this.authService.logout();
  // this._snackBar.open('You are logged out', 'dismiss', {
  //   duration: 500,
  //   horizontalPosition: this.horizontalPosition,
  //   verticalPosition: this.verticalPosition,
  // });
  this.router.navigate(['/home']);
  return false;
}

}
