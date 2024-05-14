export interface IListStaff {
  id: number;
  username: string;
  fullName: string;
  level: string;
  active: number;
  jobTitle: string;
  rankName?: string;
  department: string;
  departmentId: number;
  createdDate: string;
  bankAccount: string;
  bankName: string;
  group?: string;
  groupId?: number;
}
