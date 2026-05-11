export interface Experience {
  id          : number;
  role        : string;
  company     : string;
  location    : string;
  startDate   : string;
  endDate?    : string;
  current     : boolean;
  description : string[];
  type        : ExperienceType;
}

export type ExperienceType =
  | 'full-time'
  | 'freelance'
  | 'research'
  | 'volunteer';
