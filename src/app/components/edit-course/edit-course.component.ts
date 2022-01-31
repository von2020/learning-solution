import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { CourseQuizService } from 'src/app/services/courseQuiz.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { ValidateService } from 'src/app/services/validate.service';
declare var $: any;
declare var videojs: any;

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  public videoJsConfigObj = {
    preload: 'metadata',
    controls: true,
    autoplay: true,
    overrideNative: true,
    techOrder: ['html5', 'flash'],
    html5: {
      nativeVideoTracks: false,
      nativeAudioTracks: false,
      nativeTextTracks: false,
      hls: {
        withCredentials: false,
        overrideNative: true,
        debug: true,
      },
    },
  };

  files: File[] = [];

  resourceFile: File;

  responses: Array<any>;

  title = '';

  Medias: File[] = [];
  mediaFile: File;

  EditedCourseName: String;
  EditedSectionCourseName: String;

  fileName: any;
  courseTopicId: any;
  courseTopicLists: any;
  sectionListIdName: any;
  loading: boolean;
  // private title: string;

  FacilitatorId: any;
  CourseName: String;
  CourseDescription: String;
  CourseSubTitle: String;
  CourseImageUrl: String;
  CourseTypeId: any;
  LevelTypeId: any;
  CourseCategoryId: any;
  CourseSubCategoryId: any;
  AboutCourse: String;
  CourseAmount: any;
  Description: String;
  Topic: any;
  Duration: String;
  TopicDescription: String;
  resources: any = [];

  id: any;

  createdCourseId: number;
  private sub: any;

  items: any;
  courseTypes: any;
  categories: any;
  subCategorys: any;
  editorForm: FormGroup;
  message: string;
  isSuccess: any;

  editorStyle = {
    height: '300px',
    backgroundColor: '#ffffff',
  };

  quillTheme = 'snow';

  config = {
    toolbar: [
      [
        {
          header: [1, 2, 3, 4, 5, 6, false],
        },
      ],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      // [{
      //   'header': 1
      // }, {
      //   'header': 2
      // }], // custom button values
      [
        {
          list: 'ordered',
        },
        {
          list: 'bullet',
        },
      ],
      [
        {
          script: 'sub',
        },
        {
          script: 'super',
        },
      ], // superscript/subscript
      [
        {
          indent: '-1',
        },
        {
          indent: '+1',
        },
      ], // outdent/indent
      [
        {
          direction: 'rtl',
        },
      ], // text direction

      // [{
      //   'size': ['small', false, 'large', 'huge']
      // }], // custom dropdown

      [
        {
          color: [],
        },
        {
          background: [],
        },
      ], // dropdown with defaults from theme
      // [{
      //   'font': []
      // }],
      [
        {
          align: [],
        },
      ],
      // ['link', 'image'],

      ['clean'], // remove formatting button
    ],
  };
  uploadUrl: any;
  fileType: any;
  CourseId: any;
  CourseTopic: any;
  course: any;
  courseTopicContents: any;
  cardIdName: string;
  sortableIdName: string;
  error: any;
  success: string;
  editorContent: any;
  objectiveContents: any;
  requirementContents: any;
  duration: any;
  fileSize: any;
  path: any;
  courseTopicMaterials: any;
  Quizzes: Array<any> = [];
  finish: string;
  objectiveId: any;
  requirementId: any;
  coursePreview: any;
  courseTopicDuration: any;
  courseTopicVideoId: any;
  videoMaterialId: any;

  constructor(
    private validateService: ValidateService,
    private route: ActivatedRoute,
    private sendDataService: SendDataService,
    private _flashMessagesService: FlashMessagesService,
    private toastr: ToastrService,
    private courseQuiz: CourseQuizService,
    private courseService: CourseService,
    private facilitatorService: FacilitatorService,
    private authService: AuthService,
    private router: Router
  ) {
    this.responses = [];
    this.title = '';
    this.CourseId =
      this.authService.getCourseId() || this.sendDataService.getMessage();
  }

  ngOnDestroy(): void {
    this.authService.removeCourseId();
    this.sendDataService.removeMessage();
    var player = videojs('my-video', this.videoJsConfigObj);
    player.dispose();
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT', this.id);
    if (this.CourseId != null) {
      this.getCourseById();
      this.getCreatedCourseTopics();
      this.getCreatedCourseObjectives();
      this.getCreatedCourseRequirements();
    }
  }

  ngOnInit(): void {
    console.log(this.CourseId);
    window.scrollTo(0, 0);

    $('.btnNext').click(function () {
      $('.nav-pills .active').parent().next('li').find('a').trigger('click');
    });

    $('.btnPrevious').click(function () {
      $('.nav-pills .active').parent().prev('li').find('a').trigger('click');
    });

    $('.sortable').each(function () {
      var clone, before, parent;
      $(this)
        .sortable({
          connectWith: $('.sortable').not(this),
          helper: 'clone',
          start: function (event, ui) {
            $(ui.item).show();
            clone = $(ui.item).clone();
            before = $(ui.item).prev();
            parent = $(ui.item).parent();
          },
          stop: function (event, ui) {
            if (before.length) before.after(clone);
            else parent.prepend(clone);
          },
        })
        .disableSelection();
    });

    $('[data-toggle="tooltip"]').tooltip();

    this.FacilitatorId = JSON.parse(this.authService.getFId());
    console.log(this.FacilitatorId);
    this.courseService.getCoursesCategories().subscribe(
      (data) => {
        console.log(data.data);
        this.categories = data.data;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );

    // this.id = this.CourseCategoryId
    // console.log(this.CourseCategoryId);

    this.editorForm = new FormGroup({
      editor: new FormControl(null),
    });

    //   $( function() {
    //   $( ".section_menu" ).sortable();
    //   $( ".section_menu" ).disableSelection();
    // } );
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onSelectResource(event) {
    console.log(event);

    this.resourceFile = event.target.files[0];
    // event.target.files[0]
    console.log(event.target.files[0]);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit() {
    console.log(this.editorForm.get('editor').value);
    this.editorContent = this.editorForm.get('editor').value;
  }

  getAssessment() {
    this.courseQuiz.getCourseQuizByCourseId(this.CourseId).subscribe((data) => {
      console.log('data', data);

      if (data.statusMessage == 'Successful') {
        this.Quizzes.length = 0;
        this.Quizzes.push(data.data);
      } else if (data.statusMessage == 'No Available Record') {
        this.Quizzes.push(data.statusMessage);
      }
    });
  }

  editQuiz() {
    var selectSubOptionValue = $('#Quiz option:selected').val();
    console.log(selectSubOptionValue);
    this.id = selectSubOptionValue;
  }

  showEditSectionModal(clicked) {
    // $("#editModal").modal('hide')
    console.log(clicked);
  }

  updateTitle(value: string) {
    this.title = value;
  }

  maxLength(e) {
    if (e.editor.getLength() > 10007) {
      e.editor.deleteText(10, e.editor.getLength());
    }
  }

  onLogoutClick() {
    $('#logoutModal').modal('hide');
    this.authService.logout();
    // this._snackBar.open('You are logged out', 'dismiss', {
    //   duration: 500,
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
    this.router.navigate(['/home']);
    return false;
  }

  playVideo(url) {
    // e = this.path
    console.log(url);
    var player = videojs('my-video', this.videoJsConfigObj);
    player.src(url);
    // this.path = url
  }

  play(e) {
    // var path  = $('#path').value;
    console.log(e);
    // document.getElementById('show').innerHTML='<video id="movie" src="'+path+'" height="400px" width="400px" poster="img/video-placeholder.gif" controls autoplay > </video>';
    var player = videojs('my-video', this.videoJsConfigObj);
    player.src(e);
    // alert(''+player.duration);
  }

  onSelectMedia(event) {
    console.log(event);

    if (event.target.files[0].size > 50000000) {
      this.toastr.error('File is too big!');
    } else {
      this.mediaFile = event.target.files[0];
    }
    // event.target.files[0]
    console.log(event.target.files[0]);

    // this.Medias.push(...event.addedFiles);
    // if (event.rejectedFiles[0].reason == 'size') {
    //   alert('File Size too Large');
    // }
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = (e) => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }

  onRemoveMedia(event) {
    console.log(event);
    this.Medias.splice(this.Medias.indexOf(event), 1);
  }

  onUploadFile() {
    //Upload my file to cloudinary
    const file_data = this.mediaFile;
    const data = new FormData();
    data.append('File', file_data);
    data.append('AppId', '1');
    console.log(data);

    if (this.mediaFile.type == 'video/mp4') {
      data.append('FolderTypeId', '5');
      // data.append('folder', 'expertplat/course_videos');
      this.uploadVideo(data);
    } else if (
      this.mediaFile.type == 'image/png' ||
      'image/jpeg' ||
      'image/jpg'
    ) {
      data.append('FolderTypeId', '2');
      // data.append('folder', 'expertplat/course_images');
      this.uploadImage(data);
    } else if (
      this.mediaFile.type ==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      'application/pdf'
    ) {
      data.append('FolderTypeId', '3');
      // data.append('folder', 'expertplat/course_materials')
      this.uploadMaterial(data);
    }
    // image/jpeg,image/jpg,image/png,image/gif
  }

  onUploadMaterial() {
    //Scape empty array
    if (!this.mediaFile) {
      alert('Primero sube una imagen, por favor');
    }

    //Upload my file to cloudinary
    const file_data = this.mediaFile;
    const data = new FormData();
    data.append('File', file_data);
    data.append('AppId', '1');
    data.append('FolderTypeId', '3');
    console.log(data);
    this.uploadMaterial(data);
  }

  uploadVideo(data) {
    this.authService.uploadImage(data).subscribe((response) => {
      if (response.statusCode == 200) {
        console.log(response);
        console.log(response.fileData);
        this.uploadUrl = response.fileData.fileUrl;
        this.fileType = response.fileData.fileType;
        this.fileName = response.fileData.uniqueFileName;
        const video = document.createElement('video');
        // set the file object URL as the src of the video element
        video.src = this.uploadUrl;

        this.fileSize = response.fileData.bytes;
        if (response.fileData.fileUrl) {
          // get video/audio duration when it's available
          video.addEventListener('loadedmetadata', () => {
            this.duration = video.duration;
            console.log(`Duration: ${video.duration.toFixed(2)}s`);
          });
          if (this.duration != null || this.duration != undefined) {
            this.toastr.success('Video Uploaded Successfully');
          }
          //     alert("Video Uploaded Successfully")
          // this._flashMessagesService.show("Video Uploaded Successfully", { cssClass: 'alert-success', timeout: 3000 });
        }
      } else {
        this.toastr.error('An Error Occured, Please try again', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

  uploadImage(data) {
    this.authService.uploadImage(data).subscribe((response) => {
      if (response.statusCode == 200) {
        console.log(response);
        console.log(response.fileData.fileUrl);
        this.uploadUrl = response.fileData.fileUrl;
        this.fileType = response.fileData.fileType;
        this.fileName = response.fileData.uniqueFileName;
        this.fileSize = response.fileData.fileSize;
        if (response.fileData.fileUrl) {
          this.toastr.success('Image Uploaded Successfully');
          //     alert("Image Uploaded Successfully")
          // this._flashMessagesService.show("Image Uploaded Successfully", { cssClass: 'alert-success', timeout: 3000 });
        }
      } else {
        this.toastr.error('An Error Occured, Please try again', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

  uploadMaterial(data) {
    this.authService.uploadMaterial(data).subscribe((response) => {
      if (response.statusCode == 200) {
        console.log(response);
        console.log(response.fileData.fileUrl);
        this.uploadUrl = response.fileData.fileUrl;
        this.fileType = response.resource_type;
        this.fileName = response.uniqueFileName;
        this.fileSize = response.fileSize;
        if (response.fileData.fileUrl) {
          this.createCourseCourseTopicMaterial();
          this.toastr.success('Material Uploaded Successfully');
          //     alert("Material Uploaded Successfully")
          // this._flashMessagesService.show("Material Uploaded Successfully", { cssClass: 'alert-success', timeout: 3000 });
        }
      } else {
        this.toastr.error('An Error Occured, Please try again', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

  createSection(value: string) {
    $('#addSectionModal').modal('hide');

    //   var cardIdName = 'collapse-new' +Date.now();
    //   var sortableIdName = 'sortable' +Date.now();
    //   var sectionListIdName = 'section-list' +Date.now();
    //   var title = value
    //   console.log(cardIdName);
    //   this.title += value;
    //   console.log(this.title);
    //   var newSection = $( '<div class="card border-2 mb-0 mb-5 shadow"><div class="card-header course-topic-header collapsed" data-toggle="collapse" data-parent="#accordion" href="'+"#"+cardIdName+'"><a id="makeEditable" contenteditable="true" class="card-title"> '+title+' </a></div>'
    //             + '<div id="'+cardIdName+'" class="collapse moreCollapse" data-parent="#accordion">'
    //                +'<div class="card-body p-0"><ul id="'+sortableIdName+'" class="connected sortable list1 section_menu p-0 m-0" aria-labelledby="userDropdown"><li id="'+sectionListIdName+'" class="section-item toKnow ui-state-default"><a href="#" class="d-inline">'
    //                       +'<i class="fas fa-grip-lines fa-sm fa-fw mr-2 text-gray-400"></i>'
    //                       + "heading" +'<p style="float: right; margin: 0px; font-size:14px;color:rgba(0, 0, 0, 0.5);">duration</p></a>'
    //                       +'<i style="float: right;" data-toggle="modal" data-target="#editSectionModal" class="fas fa-edit fa-sm fa-fw mr-2 text-gray-400"></i>'
    //                       +'<span class="course-topic-video-remove"><a (click)="deleteCourseTopicContent(courseTopicContent.id)"><i class="fas fa-trash-alt"></i></a></span>'
    //                     + '</li></ul></div></div></div>' );
    // $('#accordion').append( newSection );
    this.createCourseTopic(value);
    // this.getCreatedCourseTopicVideos(value)
    // +'<i data-toggle="modal" data-target="#editModal" class="far fa-copy fa-sm fa-fw mr-2 text-gray-400"></i>'
    $('.sortable').each(function () {
      var clone, before, parent;
      $(this)
        .sortable({
          connectWith: $('.sortable').not(this),
          helper: 'clone',
          start: function (event, ui) {
            $(ui.item).show();
            clone = $(ui.item).clone();
            before = $(ui.item).prev();
            parent = $(ui.item).parent();
          },
          stop: function (event, ui) {
            if (before.length) before.after(clone);
            else parent.prepend(clone);
          },
        })
        .disableSelection();
    });
    // ui-state-default
  }

  createSubSection(value: string) {
    $('#editModal').modal('hide');
    //   var listIdName = 'collapse-new' +Date.now();
    //   this.sortableIdName = $('.list1').attr('id')
    //   var heading = value;
    //   console.log(listIdName);
    //   // this.title += value;
    //   console.log(heading);
    //   var newSubSection = $( '<li id="'+listIdName+' class="section-item toKnow ui-state-default"><a href="#" class="d-inline">'
    //   +'<i class="fas fa-grip-lines fa-sm fa-fw mr-2 text-gray-400"></i>'
    //   + heading +'</a><div style="float: right;">'
    //   +'<span class="course-topic-edit mr-2"><i (click)="editCourseTopicContent(courseTopicContent)" class="fas fa-edit fa-sm fa-fw mr-2 text-gray-400"></i></span>'
    //   +'<span class="course-topic-video-remove"><a (click)="deleteCourseTopicContent(courseTopicContent.id)"><i class="fas fa-trash-alt"></i></a></span>'
    // +'</div></li>');

    // $('#'+this.sortableIdName).prepend( newSubSection );
    this.createCourseCourseTopicVideo();
  }

  createResourceSection(value: string) {
    $('#addResourceModal').modal('hide');
    var listIdName = 'collapse-new' + Date.now();
    this.sortableIdName = $('.list1').attr('id');
    var heading = value;
    console.log(listIdName);
    // this.title += value;
    console.log(heading);
    if (value == '') {
      this.toastr.error(
        'Please Fill in a Resource Title',
        'Something Went Wrong!',
        {
          timeOut: 3000,
        }
      );
    } else {
      this.createCourseCourseTopicMaterial();
    }
  }

  deleteResourceItem(id) {
    console.log(id);
    this.videoMaterialId = id;
  }

  confirmDeleteResourceItem() {
    this.loading = true;
    this.facilitatorService
      .deleteCourseTopicVideoMaterial(this.videoMaterialId)
      .subscribe(
        (data) => {
          this.loading = false;
          if (data.statusCode == 200) {
            this.courseTopicLists = this.courseTopicLists.filter((ser) => {
              return (ser.courseTopic.video = ser.courseTopic.video.filter(
                (ser) => {
                  return ser.id !== this.videoMaterialId;
                }
              ));
            });

            console.log(this.courseTopicLists);
          } else {
            this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
              timeOut: 3000,
            });
          }
        },
        (err) => {
          this.loading = false;
          console.log(err);
          return false;
        }
      );
  }

  editSubSection(value: string) {
    $('#editSectionModal').modal('hide');
    var accordionId = $('.moreCollapse.collapse.show').attr('id');
    this.sectionListIdName = $('.toKnow').attr('id');
    var sortableIdName = 'sortable' + Date.now();
    var uploadLink = this.uploadUrl;
    console.log(uploadLink);
    console.log(value);

    // console.log(accordionId);
    console.log(this.sectionListIdName);
    // this.title += value;
    console.log(sortableIdName);
    var newEditedSection = $(
      '<li id="' +
        this.sectionListIdName +
        '" class="section-item ui-state-default"><a href="' +
        uploadLink +
        '" class="d-inline">' +
        '<i class="fas fa-grip-lines fa-sm fa-fw mr-2 text-gray-400"></i>' +
        value +
        '<p style="float: right; margin: 0px; font-size:14px;color:rgba(0, 0, 0, 0.5);">duration</p></a>' +
        '<i style="float: right;" data-toggle="modal" data-target="#editSectionModal" class="fas fa-edit fa-sm fa-fw mr-2 text-gray-400"></i>' +
        '</li>'
    );
    //  </ul></div>
    $('#' + this.sectionListIdName).replaceWith(newEditedSection);
    this.createCourseCourseTopicVideo();

    $('.sortable').each(function () {
      var clone, before, parent;
      $(this)
        .sortable({
          connectWith: $('.sortable').not(this),
          helper: 'clone',
          start: function (event, ui) {
            $(ui.item).show();
            clone = $(ui.item).clone();
            before = $(ui.item).prev();
            parent = $(ui.item).parent();
          },
          stop: function (event, ui) {
            if (before.length) before.after(clone);
            else parent.prepend(clone);
          },
        })
        .disableSelection();
    });
  }

  createCourseTopic(value: string) {
    const course = {
      FacilitatorId: this.FacilitatorId,
      CourseId: this.CourseId,
      Topic: value,
      // Duration: "20 ",
    };

    this.cardIdName = 'collapse-new' + Date.now();
    this.sortableIdName = 'sortable' + Date.now();
    this.sectionListIdName = 'section-list' + Date.now();

    console.log(course);

    this.facilitatorService.createCourseTopics(course).subscribe(
      (data) => {
        console.log(data);
        if (data.statusMessage == 'Course Topics Created Successfully') {
          this.courseTopicLists = data.data.courseTopic;
          this.courseTopicDuration = data.data.duration;
          this.courseTopicLists = this.courseTopicLists.filter((ser) => {
            return ser == this.courseTopicLists.splice(0, 0, ser);
          });
          this.Topic = '';
          // this.courseTopicLists.splice(0, 0, course);
          // alert('Your course Heading have been Created Successfully')
          this.toastr.success(
            'Your Course Heading has been Created Successfully'
          );
          this.success = data.statusMessage;
          this.message = 'Your course Heading have been Created Successfully';
          $('#successModal').modal('show');

          // this._flashMessagesService.show('Your course have been Created Successfully', { cssClass: 'alert-success', timeout: 3000 });
          // this.error = null;
          // this.router.navigate(['/confirmation']);
          this.getCreatedCourseTopics();
        } else {
          // alert(data.statusMessage)
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // this._flashMessagesService.show(data.statusMessage, { cssClass: 'alert-danger', timeout: 3000 });
          this.error = data.statusMessage;
          this.message = data.statusMessage;
          this.success = null;
          $('#successModal').modal('show');
          // $('.toast').toast('show')
          // this.router.navigate(['/register']);
        }
      },
      (err) => {
        console.log(err);
        this.isSuccess == false;
        $('#successModal').modal('show');
        return false;
      }
    );
  }

  getCourseTopicId(value) {
    this.getAssessment();
    this.courseTopicId = value;
    $('#editSubSectionModal').modal('show');
  }

  createCourseObjectives() {
    const course = {
      CourseId: this.CourseId,
      Objective: this.editorContent,
      // Duration: "20 ",
    };

    this.cardIdName = 'collapse-new' + Date.now();
    this.sortableIdName = 'sortable' + Date.now();
    this.sectionListIdName = 'section-list' + Date.now();

    console.log(course);

    this.facilitatorService.createCourseObjectives(course).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          this.objectiveContents = data.data;
          // this.courseTopicLists = this.courseTopicLists.filter((ser) => {
          //   return ser.id !== this.course.id;
          // });
          // this.isSuccess == true
          // this.message = data.statusMessage
          // $('#successModal').modal('show')
          this.toastr.success(data.statusMessage);
          // alert(data.statusMessage)
          this.editorContent = '';
          this.editorForm.reset();
          // this.courseTopicLists.splice(0, 0, this.course);
          // this._flashMessagesService.show('Your course have been Created Successfully', { cssClass: 'alert-success', timeout: 3000 });
          this.error = null;
          this.success = 'Course Topic Creation Successful';
          // $('.toast').toast('show')
          this.sendDataService.setMessage(this.CourseId);
          $('.nav-pills .active')
            .parent()
            .next('li')
            .find('a')
            .trigger('click');
          // this.router.navigate(['/confirmation']);
        } else {
          // alert("eeror")
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // alert(data.statusMessage)
          // this._flashMessagesService.show(data.statusMessage, { cssClass: 'alert-danger', timeout: 3000 });
          this.error = data.statusMessage;
          // this.isSuccess == false
          // this.message = data.statusMessage
          $('#successModal').modal('show');

          this.success = null;
          // $('.toast').toast('show')
          // this.router.navigate(['/register']);
        }
      },
      (err) => {
        console.log(err);
        this.isSuccess == false;
        this.message = 'An error Occured';
        $('#successModal').modal('show');

        return false;
      }
    );
  }

  deleteCourseObjectives() {
    this.loading = true;
    this.facilitatorService.deleteCourseObjectives(this.objectiveId).subscribe(
      (data) => {
        this.loading = false;
        if (data.statusCode == 200) {
          this.objectiveContents = this.objectiveContents.filter((ser) => {
            return ser.id !== this.objectiveId;
          });
          // this.authService.removeCart();
          // $("#badgevisibility").hide();
          // this.getCartSubTotalCheckout();
          console.log(this.objectiveContents);
          // this.emptyCart = "Your cart is empty. Keep shopping to find a course!"
          this.toastr.info('Course Requirement removed');
          // this._flashMessagesService.show("Course Topic removed", {cssClass: 'alert-success', closeOnClick: true,});
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          // this.router.navigate(['confirmation'])
        }
      },
      (err) => {
        this.loading = false;
        console.log(err);
        return false;
      }
    );
  }

  createCourseRequirements() {
    const course = {
      CourseId: this.CourseId,
      Requirement: this.editorContent,
      // Duration: "20 ",
    };

    this.cardIdName = 'collapse-new' + Date.now();
    this.sortableIdName = 'sortable' + Date.now();
    this.sectionListIdName = 'section-list' + Date.now();

    console.log(course);

    this.facilitatorService.createCourseRequirements(course).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          // this.courseTopicLists = this.courseTopicLists.filter((ser) => {
          //   return ser.id !== this.course.id;
          // });
          // alert(data.statusMessage)
          this.finish = 'Course Finished';
          this.toastr.success(data.statusMessage);
          this.success = data.statusMessage;
          this.message =
            "Your course have been Created Successfully and is now Awaiting Approval. if it's not being Approved within 2 Days Kindly Contact our Support Team";
          $('#successModal').modal('show');
          this.editorContent = '';
          this.editorForm.reset();
          // this.courseTopicLists.splice(0, 0, this.course);
          // this._flashMessagesService.show('Your course have been Created Successfully', { cssClass: 'alert-success', timeout: 3000 });
          this.error = null;
          this.success = 'Course Topic Creation Successful';
          this.sendDataService.setMessage(this.CourseId);
          $('.nav-pills .active')
            .parent()
            .next('li')
            .find('a')
            .trigger('click');
          // this.router.navigate(['/confirmation']);
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // alert(data.statusMessage)
          // this._flashMessagesService.show(data.statusMessage, { cssClass: 'alert-danger', timeout: 3000 });
          this.error = data.statusMessage;
          this.message = data.statusMessage;
          $('#successModal').modal('show');
          // $('.toast').toast('show')
          // this.router.navigate(['/register']);
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  deleteCourseRequirements() {
    this.loading = true;
    this.facilitatorService
      .deleteCourseRequirements(this.requirementId)
      .subscribe(
        (data) => {
          this.loading = false;
          if (data.statusCode == 200) {
            this.requirementContents = this.requirementContents.filter(
              (ser) => {
                return ser.id !== this.requirementId;
              }
            );
            // this.authService.removeCart();
            // $("#badgevisibility").hide();
            // this.getCartSubTotalCheckout();
            console.log(this.requirementContents);
            // this.emptyCart = "Your cart is empty. Keep shopping to find a course!"
            this.toastr.info('Course Requirement removed');
            // this._flashMessagesService.show("Course Topic removed", {cssClass: 'alert-success', closeOnClick: true,});
          } else {
            this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
              timeOut: 3000,
            });
            // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
            // this.router.navigate(['confirmation'])
          }
        },
        (err) => {
          this.loading = false;
          console.log(err);
          return false;
        }
      );
  }

  passVideoId(videoId, courseTopicId) {
    this.courseTopicVideoId = videoId;
    this.courseTopicId = courseTopicId;
  }

  createCourseCourseTopicMaterial() {
    if (this.resourceFile == null) {
      alert('Please select a file');
    } else {
      //Upload file to server
      const file_data = this.resourceFile;
      const data = new FormData();
      data.append('File', file_data);
      data.append('AppId', '1');
      data.append('FolderTypeId', '3');
      console.log(data);

      // this.authService.uploadImage(data).subscribe((response) => {
      //   if (response) {
      //     console.log(response);
      //     console.log(response.url);
      //     this.CourseImageUrl = response.url;
      //   }

      this.authService.uploadImage(data).subscribe((response) => {
        if (response.statusCode == 200) {
          console.log(response);
          console.log(response.fileData.fileUrl);
          this.uploadUrl = response.fileData.fileUrl;
          this.fileType = response.fileData.fileType;
          this.fileName = response.fileData.uniqueFileName;
          this.fileSize = response.fileData.fileSize;
          if (response.fileData.fileUrl) {
            this.toastr.success('Resource Uploaded Successfully');

            const courseContent = {
              FacilitatorId: this.FacilitatorId,
              CourseId: this.CourseId,
              CourseTopicId: this.courseTopicId,
              CourseTopicVideoId: this.courseTopicVideoId,
              Description: this.Description,
              FileName: this.fileName,
              FileUrl: this.uploadUrl,
              FileType: this.fileType,
              FileSize: this.formatBytes(this.fileSize),
              Duration: 200,
            };

            console.log(courseContent);

            this.facilitatorService
              .createCourseTopicVideoMaterial(courseContent)
              .subscribe(
                (data) => {
                  console.log(data);
                  if (data.statusCode == 200) {
                    // this.courseTopicLists = data.data;
                    //   this.courseTopicLists = this.courseTopicLists.filter((ser) => {
                    //     return ser.id !== this.CourseId;
                    //   });

                    this.getCreatedCourseTopics();

                    this.toastr.success('Resource Added');
                    // this.courseTopicLists.splice(0, 0, courseContent);
                    // let userEmail = data.data.email;
                    // this.sendDataService.setMessage(userEmail.toString())
                    // console.log(userEmail.toString());
                    // this.authService.storeUserData("Bearer "+data.token, data.data);
                    // this._flashMessagesService.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
                    // this.router.navigate(['/course/course-objective']);
                  } else {
                    this.toastr.error(
                      data.statusMessage,
                      'Something Went Wrong!',
                      {
                        timeOut: 3000,
                      }
                    );
                    // this._flashMessagesService.show(data.statusMessage, { cssClass: 'alert-danger', timeout: 3000 });
                    // this.router.navigate(['/register']);
                  }
                },
                (err) => {
                  console.log(err);
                  this.toastr.error(
                    'Please Try Again',
                    'Something Went Wrong!',
                    {
                      timeOut: 3000,
                    }
                  );
                  return false;
                }
              );
          }
        } else {
          this.toastr.error('An Error Occured, Please try again', 'Error', {
            timeOut: 3000,
          });
        }
      });
    }
    // }});
  }

  createCourseCourseTopicVideo() {
    // if (!this.files[0]) {
    //   alert('Primero sube una imagen, por favor');
    // }

    // //Upload my image to cloudinary
    // const file_data = this.files[0];
    // const data = new FormData();
    // data.append('file', file_data);
    // data.append('folder', 'expertplat/course_images')
    // data.append('upload_preset', 'ypj1byk2');
    // data.append('cloud_name', 'mywebsite');

    // this.authService.uploadImage(data).subscribe((response) => {
    //   if (response) {
    //     console.log(response);
    //     console.log(response.url);
    //     this.CourseImageUrl = response.url;

    const courseContent = {
      FacilitatorId: this.FacilitatorId,
      CourseId: this.CourseId,
      CourseTopicId: this.courseTopicId,
      FileName: this.fileName,
      FileUrl: this.uploadUrl,
      FileType: this.fileType,
      FileSize: this.formatBytes(this.fileSize),
      Description: this.Description,
      Duration: this.duration,

      // Duration: this.formatTime(this.duration)
    };

    console.log(courseContent);

    this.facilitatorService.createCourseTopicVideo(courseContent).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          this.toastr.success('Video Added');
          this.getCreatedCourseTopics();
          this.sendDataService.setMessage(this.CourseId);
          // $('.nav-pills .active').parent().next('li').find('a').trigger('click');
          this.error = null;
          this.success = 'Course Topic Creation Successful';
          this.Description = '';
          (
            document.getElementById('topicVideoInput') as HTMLInputElement
          ).value = '';
          // $('.toast').toast('show')
          // this.router.navigate(['/course/course-objective']);
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          //   alert(data.statusMessage)
          // this._flashMessagesService.show(data.statusMessage, { cssClass: 'alert-danger', timeout: 3000 });
          this.error = data.statusMessage;
          this.success = null;
          // $('.toast').toast('show')
          // this.router.navigate(['/register']);
        }
      },
      (err) => {
        console.log(err);
        this.toastr.error('Please Try Again', 'Something Went Wrong!', {
          timeOut: 5000,
        });
        return false;
      }
    );
    // }});
  }

  getCreatedCourseTopics() {
    this.courseService.getCourseTopicByCourseId(this.CourseId).subscribe(
      (detail) => {
        console.log(detail.data);
        // this.courseTopicId = detail.data.id;
        this.courseTopicLists = detail.data;
        console.log(detail);
        // console.log(this.courseTopicId);
        // this.courseTopicLists = this.courseTopicLists.filter((ser) => {
        //   return ser.id !== this.courseTopicId;
        // });

        // this.courseTopicLists.splice(0, 0, this.)
        // this.sendDataService.setMessage(detail.data);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getCreatedCourseObjectives() {
    this.courseService.getCourseObjectivesbyCourseId(this.CourseId).subscribe(
      (detail) => {
        console.log(detail);
        // this.courseTopicId = detail.data.id;
        if (detail.data != null) {
          this.objectiveContents = detail.data;
          this.objectiveId = detail.data[0].id;
        }
        console.log(detail);
        // console.log(this.courseTopicId);
        // this.courseTopicLists = this.courseTopicLists.filter((ser) => {
        //   return ser.id !== this.courseTopicId;
        // });

        // this.courseTopicLists.splice(0, 0, this.)
        // this.sendDataService.setMessage(detail.data);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  getCreatedCourseRequirements() {
    this.courseService.getCourseRequirementsbyCourseId(this.CourseId).subscribe(
      (detail) => {
        // console.log(detail.data);
        // this.courseTopicId = detail.data.id;
        if (detail.data != null) {
          this.requirementContents = detail.data;
          this.requirementId = detail.data[0].id;
        }
        console.log(detail);
        // console.log(this.courseTopicId);
        // this.courseTopicLists = this.courseTopicLists.filter((ser) => {
        //   return ser.id !== this.courseTopicId;
        // });

        // this.courseTopicLists.splice(0, 0, this.)
        // this.sendDataService.setMessage(detail.data);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  deleteCourseTopics(id) {
    this.loading = true;
    this.facilitatorService.deleteCourseTopics(id).subscribe(
      (data) => {
        this.loading = false;
        if (data.statusCode == 200) {
          this.courseTopicLists = this.courseTopicLists.filter((ser) => {
            return ser.courseTopic.id !== id;
          });
          // this.authService.removeCart();
          // $("#badgevisibility").hide();
          // this.getCartSubTotalCheckout();
          console.log(this.courseTopicLists);
          // this.emptyCart = "Your cart is empty. Keep shopping to find a course!"
          this.toastr.info('Course Topic removed');
          // this._flashMessagesService.show("Course Topic removed", {cssClass: 'alert-success', closeOnClick: true,});
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          // this.router.navigate(['confirmation'])
        }
      },
      (err) => {
        this.loading = false;
        console.log(err);
        return false;
      }
    );
  }

  deleteCourseTopicContent(id) {
    this.loading = true;
    this.facilitatorService.deleteCourseTopicVideo(id).subscribe(
      (data) => {
        this.loading = false;
        console.log(data);
        if (data.statusCode == 200) {
          console.log(this.courseTopicLists);
          // var x = this.findElement(this.courseTopicLists, "courseTopicVideos", this.courseTopicContents); // x is {"name":"k2", "value":"hi"}
          this.courseTopicLists = this.courseTopicLists.filter((ser) => {
            return (ser.courseTopic.video = ser.courseTopic.video.filter(
              (ser) => {
                return ser.id !== id;
              }
            ));
          });
          // x[this.courseTopicContents] = this.courseTopicContents.filter((ser) => {
          //   return ser.id !== id
          // });
          // this.authService.removeCart();
          // $("#badgevisibility").hide();
          // this.getCartSubTotalCheckout();
          console.log(this.courseTopicLists);
          // console.log(x);
          // this.emptyCart = "Your cart is empty. Keep shopping to find a course!"
          this.toastr.info('Course Topic Video removed');
          // this._flashMessagesService.show("Course Topic removed", {cssClass: 'alert-success', closeOnClick: true,});
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          // this.router.navigate(['confirmation'])
        }
      },
      (err) => {
        this.loading = false;
        console.log(err);
        return false;
      }
    );
  }

  editCourseTopicContent(data) {
    // this.getAssessment();
    this.Description = data.description;
    $('#editSectionModal').modal('show');
  }

  getCreatedCourseTopicMaterials() {
    this.facilitatorService
      .getCourseTopicMaterialsByCourseTopicId(this.CourseId)
      .subscribe(
        (detail) => {
          console.log(detail.data);
          // this.courseTopicId = detail.data.id;
          this.courseTopicMaterials = detail.data;
          console.log(detail);
          // console.log(this.courseTopicId);
          // this.courseTopicLists = this.courseTopicLists.filter((ser) => {
          //   return ser.id !== this.courseTopicId;
          // });

          // this.courseTopicLists = this.courseTopicLists.forEach(element => {
          //   this.courseTopicVideoMaterial = this.courseTopicVideoMaterial.forEach(element => {

          //   });
          // });

          // this.courseTopicLists.splice(0, 0, this.)
          // this.sendDataService.setMessage(detail.data);
        },
        (err) => {
          console.log(err);
          return false;
        }
      );
  }

  findElement(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++)
      if (arr[i][propName] == propValue) return arr[i];

    // will return undefined if not found; you could return a default instead
  }

  formatBytes(a, b = 2) {
    if (0 === a) return '0 Bytes';
    const c = 0 > b ? 0 : b,
      d = Math.floor(Math.log(a) / Math.log(1024));
    return (
      parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
      ' ' +
      ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
    );
  }

  formatTime(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = '';
    if (hrs > 0) {
      ret += '' + hrs + 'h' + ':' + (mins < 10 ? '0' : '');
    }
    ret += '' + mins + 'm' + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs + 's';
    return ret;
  }

  getCreatedCourseTopicVideos(value: any) {
    console.log(value);

    this.courseTopicId = value;
    this.facilitatorService
      .getCourseTopicVideosByCourseTopicId(value)
      .subscribe(
        (detail) => {
          console.log(detail.data);
          // this.courseTopicId = detail.data.id;
          this.courseTopicContents = detail.data;
          console.log(detail);
          // console.log(this.courseTopicId);
          // this.courseTopicLists = this.courseTopicLists.filter((ser) => {
          //   return ser.id !== this.courseTopicId;
          // });

          // this.courseTopicLists.splice(0, 0, this.)
          // this.sendDataService.setMessage(detail.data);
        },
        (err) => {
          console.log(err);
          return false;
        }
      );
  }

  createPreview() {
    const file_data = this.mediaFile;
    const data = new FormData();
    data.append('File', file_data);
    data.append('AppId', '1');
    data.append('FolderTypeId', '5');
    console.log(data);

    this.authService.uploadImage(data).subscribe((response) => {
      if (response.statusCode == 200) {
        console.log(response);
        console.log(response.fileData);
        this.uploadUrl = response.fileData.fileUrl;
        this.fileType = response.fileData.fileType;
        this.fileName = response.fileData.uniqueFileName;
        this.duration = response.fileData.duration;
        this.fileSize = response.fileData.bytes;
        if (response.fileData.fileUrl) {
          this.toastr.success('Video Uploaded Successfully');
          //     alert("Video Uploaded Successfully")
          // this._flashMessagesService.show("Video Uploaded Successfully", { cssClass: 'alert-success', timeout: 3000 });

          const previewData = {
            CourseId: this.CourseId,
            CourseVideoPreviewUrl: this.uploadUrl,
          };

          console.log(previewData);

          this.facilitatorService
            .updateCourseVideoPreview(this.CourseId, this.uploadUrl)
            .subscribe((data) => {
              console.log(data);
              if (
                data.statusMessage ==
                'Course Video Preview Updated Successfully'
              ) {
                this.toastr.success(data.statusMessage);
                // this.coursePreview = data.data;
                location.reload();
              } else if (
                data.statusMessage == 'No Course with the specified ID'
              ) {
                this.toastr.info(data.statusMessage);
              } else {
                this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
                  timeOut: 3000,
                });
              }
            });
        }
      } else {
        this.toastr.error('An Error Occured, Please try again', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

  getCourseById() {
    this.courseService.getCoursesById(this.CourseId).subscribe(
      (category) => {
        console.log(category);
        if (category.statusCode == 200) {
          this.course = category.data[0];
          this.coursePreview =
            category.data[0].courseData.courseVideoPreviewUrl;
          console.log(this.coursePreview);
        }
        //  this.sendDataService.setMessage(category.data);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}
