export interface IDataDetail {
  id: number;
  name: string;
  members: Member[];
  groups: Group[];
}

export interface Member {
  fullName: string;
  id: number;
  jobTitle: string;
}

export interface Group {
  id: number;
  name: string;
  members: Member2[];
}

export interface Member2 {
  fullName: string;
  id: number;
  jobTitle: string;
}
