export interface ICV {
  name?: string;
  dateOfBirth?: string;
  address?: string;
  phoneNumber?: string;
  email?: any;
  introduction?: string;
  education?: Education[];
  experience?: Experience[];
  skills?: string[];
  languages?: string[];
  certifications?: Certification[];
}

export interface Education {
  school?: string;
  degree?: string;
  graduationPeriod?: string;
  details?: string;
}

export interface Experience {
  position?: string;
  company?: any;
  period?: string;
  responsibilities?: string[];
}

export interface Certification {
  certificationName?: string;
  score?: string;
}
