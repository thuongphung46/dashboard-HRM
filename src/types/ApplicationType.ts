export type ObjectType = { [key: string]: any | any[] };
export type GetRequestParams = {
  parentId?: string | number;
  partial?: string | number;
  subId?: string | number;
  action?: string | number;
};

export interface StaffDetail {
  id?: number;
  username: string;
  fullName: string;
  level: string;
  active: boolean;
  jobTitle: string;
  phoneNumber: string;
  personalEmail: string;
  workEmail: string;
  gender: string;
  dateOfBirth: string;
  rankName: string;
  identityBirthPlace: string;
  country: string;
  currentPlace: string;
  identityPlace: string;
  identityCode: string;
  identityDate: string;
  placeOfIssue: string;
  favorite: string;
  department: string;
  group: string;
  departmentId?: number;
  groupId?: number;
  staffAdmissions: StaffAdmissionResponse[];
  staffRankHistories: StaffRankHistoryResponse[];
  staffWorkingHistoriesInAcademy: StaffWorkingHistoryResponse[];
  staffWorkingHistoriesOutAcademy: StaffWorkingHistoryResponse[];
  createdDate: string;
  ratio?: number;
  examCourses: StaffExamCourse[];
  instructProject: StaffInstructProject[];
  project: StaffProject[];
  magazine: StaffMagazine[];
  invention: StaffInvention[];
  book: StaffBook[];
  training: StaffTraining[];
  editorProgram: StaffEditorProgram[];
  buildingProgram: StaffBuildingProgram[];
  summary: StaffSummary[];
  excessLessons: StaffExcessLesson[];
  research: StaffResearch[];
  teaching: StaffTeaching[];
  trainingSummary: StaffTrainingSummaryResponse[];
  [key: string]: any;
  doan_tncs_hcm?: string;
  dang_csvn?: string;
}

export interface StaffAdmissionResponse {
  id?: number;
  type: string;
  date: string;
  place: string;
}

interface StaffRankHistoryResponse {
  id?: number;
  rankId?: number;
  rankName: string;
  date: string;
}

interface StaffWorkingHistoryResponse {
  id?: number;
  jobTitle: string;
  date: string;
  bonus: string;
  discipline: string;
  fromDate: string;
  toDate: string;
  type: string;
  workingPlace: string;
}

export interface StaffExamCourse {
  id: number;
  staffId: number;
  schoolYear: string;
  term: string;
  systemSchool: string;
  action: string;
  courseCode: string;
  courseName: string;
  numberOfStudent: number;
  numberOfExam: number;
  estimatedLesson: number;
  examName: string;
  trainingCourse: string;
}

export interface StaffInstructProject {
  id: number;
  staffId: number;
  schoolYear: string;
  studentName: string;
  trainingCourse: string;
  decisionNumber: string;
  numberOfInstructors: number;
  instructorName: string;
  numberOfLesson: number;
}

interface StaffProject {
  id: number;
  staffId: number;
  schoolYear: string;
  projectName: string;
  role: string;
  projectLevel: string;
  endDate: string;
  result: string;
  numberOfHours: number;
}

interface StaffMagazine {
  id: number;
  staffId: number;
  schoolYear: string;
  magazineName: string;
  magazineType: string;
  magazineIndex: string;
  numberOfPeople: number;
  authorName: string;
  numberOfHour: number;
}

interface StaffInvention {
  id: number;
  staffId: number;
  schoolYear: string;
  inventionName: string;
  decisionNumber: string;
  dateDecision: string;
  numberOfPeople: number;
  authorName: string;
  numberOfHour: number;
}

interface StaffBook {
  id: number;
  staffId: number;
  bookName: string;
  schoolYear: string;
  numberOfPublish: string;
  numberOfPage: number;
  numberOfPeople: number;
  authorName: string;
  numberOfHour: number;
}

interface StaffTraining {
  id: number;
  staffId: number;
  schoolYear: string;
  projectName: string;
  decisionNumber: string;
  dateDecision: string;
  resultFaculty: string;
  resultAcademy: string;
  numberOfHour: number;
}

interface StaffEditorProgram {
  id: number;
  staffId: number;
  schoolYear: string;
  buildingProgramName: string;
  decisionNumber: string;
  numberOfCredits: number;
  numberOfPeople: number;
  authorName: string;
  numberOfHour: number;
}

interface StaffBuildingProgram {
  id: number;
  staffId: number;
  schoolYear: string;
  buildingProgramName: string;
  decisionNumber: string;
  buildingType: string;
  numberOfHour: number;
}

export interface StaffSummary {
  id: number;
  staffId: number;
  schoolYear: string;
  reasonReduce: string;
  contentWorks: ContentWork[];
}
export interface ContentWork {
  contentWork: string;
  numberOfLesson: number;
}

interface StaffExcessLesson {
  id: number;
  staffId: number;
  schoolYear: string;
  sum?: number;
  paidSystem?: number;
  sumPayment?: number;
  campuchia?: number;
  vietnam?: number;
  lao?: number;
}

interface StaffResearch {
  id: number;
  staffId: number;
  schoolYear: string;
  content?: string;
  numberOfResearchExceed?: number;
  numberOfResearchReserved?: number;
}

export interface StaffTeaching {
  id: number;
  staffId: number;
  schoolYear: string;
  term: string;
  systemSchool: string;
  courseName: string;
  numberOfStudent: number;
  roundStandard: number;
  startDate: string;
  endDate: string;
  numberOfCredit: number;
}

interface StaffTrainingSummaryResponse {
  id: number;
  fromDate: string;
  toDate: string;
  schoolName: string;
  major: string;
  formOfTraining: string;
  certificate: string;
}
