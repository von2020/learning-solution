export interface Iquiz {
  id?: number;
  Description?: string;
  CourseId?: number;
  Duration?: number;
  PercentagePassMark?: number;
  Status?: boolean;
  CourseName?: string;
  courseSubTitle?: string
}

export interface Iquestion {
  id?: number;
  CourseQuizId?: number;
  QuestionTypeId?: number;
  Question: string;
  Option1?: string;
  Option2?: string;
  Option3?: string;
  Option4?: string;
  Answer?: string;
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
  sn?: number;
}

export interface IresultData {
  QuestionId: number;
  Answer: string;
}

export interface IcreateResult {
  LearnerId: string;
  CourseQuizId: number;
  Data: Array<IresultData>
}

export interface IcreateObjective {
  CourseId?: number;
  Objective?: Array<string>;
}

export interface IcreateRequirement {
  CourseId?: number;
  Requirement?: Array<string>;
}

export interface IvideoData {
  Description?: string;
  FileName?: string;
  FileUrl?: string;
  FileType?: string;
  FileSize?: string;
  Duration?: number;
}

export interface IcreateMultiCourseTopicVid {
  FacilitatorId?: string;
  CourseId?: number;
  CourseTopicId?: number;
  Materials?: Array<IvideoData>;
}

export interface IbulkQuestions {
  CourseQuizId: number;
  Questions: Array<Iquestion>;
}

export interface Ischool{
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  schoolName?: string;
  schoolCode?: string;
  schoolTypeId?: number;
  campusName?: string;
  campusAddress?: string
}

export interface IAccount{
  FacilitatorId?: string;
  BankName?: string;
  BankCode?: string;
  AccountName?: string;
  AccountNumber?: string;
}

export interface ILAccount{
  LearnerId?: string;
  BankName?: string;
  BankCode?: string;
  AccountName?: string;
  AccountNumber?: string;
}

export interface IPayFacilitator{
  TotalEarningsId?: number;
}

export interface ItotalEarningsId {
  id?: number
}