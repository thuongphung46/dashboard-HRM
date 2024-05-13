export interface IContent {
  id?: number;
  staffId?: number;
  renterId?: number;
  staff?: IStaff;
  renter?: IRenter;
  contractName?: string;
  fromDate?: string;
  toDate?: string;
  status?: number;
  teachingAddress?: string;
  numberOfLesson?: number;
  lessonPrice?: number;
  taxPercent?: number;
  contractValue?: number;
  actualValue?: number;
  taxValue?: number;
  byWord?: string;
  createdDate?: string;
  modifiedDate?: string;
  createdBy?: string;
  modifiedBy?: string;
  [key: string]: any;
}

export interface IStaff {
  id?: number;
  username?: string;
  fullName?: string;
  level?: string;
  active?: boolean;
  jobTitle?: string;
  phoneNumber?: string;
  personalEmail?: string;
  gender?: string;
  dateOfBirth?: string;
  rankName?: string;
  identityBirthPlace?: string;
  country?: string;
  currentPlace?: string;
  identityPlace?: string;
  identityCode?: string;
  identityDate?: string;
  placeOfIssue?: string;
  favorite?: string;
  createdDate?: string;
  [key: string]: any;
}

export interface IRenter {
  id?: number;
  username?: string;
  fullName?: string;
  level?: string;
  active?: boolean;
  jobTitle?: string;
  phoneNumber?: string;
  personalEmail?: string;
  gender?: string;
  dateOfBirth?: string;
  rankName?: string;
  identityBirthPlace?: string;
  country?: string;
  currentPlace?: string;
  identityPlace?: string;
  identityCode?: string;
  identityDate?: string;
  placeOfIssue?: string;
  favorite?: string;
  createdDate?: string;
  [key: string]: any;
}
