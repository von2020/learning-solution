import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CourseTopicQuizService } from 'src/app/services/course-topic-quiz.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CourseQuizService } from 'src/app/services/courseQuiz.service';
import { Iquiz } from 'src/app/shared/Model';
import { FacilitatorService } from 'src/app/services/facilitator.service';
declare var $: any;

@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.css']
})
export class CreateAssessmentComponent implements OnInit {
  courses: any;
  active = false;
  createdQuizzes: Array<any> = [];
  createdTopicQuizzes: Array<any> = [];
  
  quiz: Iquiz = {
    CourseId: 0,
    PercentagePassMark: 0,
    Description: '',
    Duration: 0,
    Status: false
  };
  activeQuiz: any = {};

  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
  facilitatorId: any;
  category: number;
  courseId: any;
  viewedQuizzes: Array<any> = [];
  message: string;
  topicMessage : string;
  quizMessage : string;

  constructor(private courseQuiz: CourseQuizService,
    private courseTopicQuiz: CourseTopicQuizService,
    private auth: AuthService,
    private facilitatorService: FacilitatorService,
    private toastr: ToastrService,
    private route: Router) {
    
    const fuser = localStorage.getItem('userFId');
    this.courseTopicQuiz.getCourseTopicQuizByFacilitator(JSON.parse(fuser)).subscribe((response) => {
     
      console.log(response);

        if(response.statusMessage == "Successful") {
          $('#topicQuiz').show();
          this.topicMessage = null
          // this.viewedQuizzes.length = 0;
          this.createdTopicQuizzes = response.data;

          console.log(response.data);
        }

        else if(response.statusMessage == "No Available Record") {
          $('#topicQuiz').hide();
          this.topicMessage = response.statusMessage;
      }

      
      // this.createdTopicQuizzes = response.data;
    }, (err) => {
      console.log(err);
    });

    this.courseQuiz.getCourseQuizByFacilitator(JSON.parse(fuser)).subscribe((response) => {
     
      console.log(response);

      if(response.statusMessage == "Successful") {
        $('#cQuiz').show();
        this.quizMessage = null
        // this.viewedQuizzes.length = 0;
        this.createdQuizzes = response.data;
    
        console.log(response.data);
      }

      else if(response.statusMessage == "No Available Record") {
        $('#cQuiz').hide();
        this.quizMessage = response.statusMessage;
    }
      
      // this.createdQuizzes = response.data;


    }, (err) => {
      console.log(err);
    });

    facilitatorService.getAllCoursesByFacilitatorId(JSON.parse(fuser)).subscribe((response) => {
      console.log(response);
      if (response.statusMessage === 'No Available Record') {
        // alert('create at least 1 course');
        // this.toastr.error('create at least 1 course', 'Something Went Wrong!', {
        //   timeOut: 3000,
        // });
        return;
      }
      this.courses = response.data;
      console.log(this.courses);

    }, (err) => {
      this.toastr.error('Please Try Again', 'An Error Occured!', {
          timeOut: 3000,
        });
      console.log(err);
    });
   }
   

  ngOnInit(): void {
   // this.getAssessment();
   const fuser = localStorage.getItem('userFId');
   this.facilitatorId = JSON.parse(fuser)
     

   this.dtOptions = {
    //pagingType: 'full_numbers',
    destroy: true,
    pageLength: 10,
    lengthMenu : [10, 20, 25, 50],
    processing: true
  };
  this.dtTrigger.next()

    const table = $('#example').DataTable( {
      fixedHeader: true
  } );
  }

  updateQuiz(quiz: any): void {
    this.activeQuiz = quiz;
  }

  completeQuizUpdate(quizData) {
    console.log(quizData);
    var data = {
      Description: quizData.description,
      CourseId: quizData.courseId,
      Duration: quizData.duration,
      PercentagePassMark: quizData.percentagePassMark,
      Status: quizData.status
    }

    console.log(data)
    this.courseQuiz.updateCourseQuiz(data, quizData.id).subscribe(data => {
      if(data.statusCode == 200){
        this.createdQuizzes = this.createdQuizzes.filter((ser) => {
          return ser.id !== quizData.id
        });
        console.log(this.createdQuizzes);
        this.toastr.info('Course Quiz Updated');
      }else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
      }
    },
    err => {
      console.log(err);
      this.toastr.error('Please Try Again', 'Something Went Wrong!', {
        timeOut: 3000,
      });
      return false;
    });
  }

  deleteQuiz(quiz: any) {
    this.courseQuiz.deleteCourseQuiz(quiz.id).subscribe(data => {
        if(data.statusCode == 200){
          this.createdQuizzes = this.createdQuizzes.filter((ser) => {
            return ser.id !== quiz.id
          });
          console.log(this.createdQuizzes);
          this.toastr.info('Course Quiz removed');
        }else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
        }
      },
      err => {
        console.log(err);
        this.toastr.error('Please Try Again', 'Something Went Wrong!', {
          timeOut: 3000,
        });
        return false;
      });
  }

  toggle() {
    var selectOptionValue = $( "#sel option:selected" ).val();
    console.log(selectOptionValue);
  if (selectOptionValue == 0) {
    // if (price.style.display == 'block') {
      this.category = selectOptionValue
      console.log(this.category);
    }
    else if (selectOptionValue == 1) {
      this.category = selectOptionValue;
    }
  // }
  }

  toggleCourse() {
    this.courseId = $( "#course option:selected" ).val();
    console.log(this.courseId);
  // }
  }

  getAssessment() {
    
    if (this.category == 0) {
      console.log(this.courseId);

      this.courseTopicQuiz.getCourseTopicQuizByCourseId(this.courseId).subscribe((data) => {
        console.log('data', data);

        if(data.statusMessage == "Successful") {
          $('#viewedQuiz').show();
          this.message = null
          // this.viewedQuizzes.length = 0;
          this.viewedQuizzes = data.data;
        }

        else if(data.statusMessage == "No Available Record") {
          $('#viewedQuiz').hide();
          this.message = data.statusMessage;
      }
      });
    }

    else if (this.category == 1) {
      console.log(this.courseId);
      
      this.courseQuiz.getCourseQuizByCourseId(this.courseId).subscribe((data) => {
        console.log('data', data);

        if(data.statusMessage == "Successful") {
          $('#viewedQuiz').show();
          this.message = null
          this.viewedQuizzes.length = 0;
          this.viewedQuizzes.push(data.data);
        }

        else if(data.statusMessage == "No Available Record") {
          $('#viewedQuiz').hide();
          this.message = data.statusMessage;
      }
      });
    }
  }


  add(): void {
     let course: any = (document.getElementById('assCourse') as HTMLInputElement).value;
     let pass: any = (document.getElementById('percent') as HTMLInputElement).value;
     this.quiz.Duration = ((document.getElementById('duration') as HTMLInputElement).value as unknown as number);
     pass = Number.parseInt(pass, 10);
     course = Number.parseInt(course, 10);
    //  this.active = true;
     this.active = this.quiz.Status;
     this.quiz.Description = (document.getElementById('description') as HTMLInputElement).value;
     this.quiz.PercentagePassMark = pass;
     this.quiz.CourseId = course;

     console.log(this.quiz);
     this.courseQuiz.createCourseQuiz(this.quiz).subscribe((response) => {
       console.log(response);
      this.active = false;
      this.quiz = {
        CourseId: 0,
        PercentagePassMark: 0,
        Description: '',
        Duration: 0,
        Status: false
      };
       
      if(response.statusCode == 200) {
      this.toastr.success(response.statusMessage);
      this.createdQuizzes.push(response.data)
      }

      else {
        this.toastr.error(response.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
      }
      // alert(response.statusMessage);
      console.log('response', response);
     },
       (error) => {
      this.active = false;
      this.toastr.error('something went wrong we are already on it', 'Something Went Wrong!', {
        timeOut: 3000,
      });
      // alert('something went wrong we are already on it');
      console.log('myerror', error);
    });
  }

  private updateQuizes(): void {

  }
  viewQuestions(quiz: any): void {
    let myQuiz: Iquiz = {};
    myQuiz.id = quiz.id;
    myQuiz.CourseId = quiz.courseId;
    myQuiz.Description = quiz.description;
    myQuiz.Duration = quiz.duration;
    myQuiz.PercentagePassMark = quiz.percentagePassMark;
    myQuiz.Status = quiz.status;
    console.log(quiz);
    localStorage.setItem('quiz', JSON.stringify(myQuiz));
    console.log(myQuiz);
  //  this.route.navigate(['/create-questions', quiz.id])
   this.route.navigate(['/edit-questions'])

    //location.href = '/create-questions';
  }

  AddQuestions(quiz): void {
    localStorage.setItem('quiz', JSON.stringify(quiz));
    console.log(quiz);
   this.route.navigate(['/create-questions'])
  }

  
onLogoutClick(){
  $("#logoutModal").modal('hide')
  this.auth.logout();
  // this._snackBar.open('You are logged out', 'dismiss', {
  //   duration: 500,
  //   horizontalPosition: this.horizontalPosition,
  //   verticalPosition: this.verticalPosition,
  // });
  this.route.navigate(['/home']);
  // return false;
}

}
