export interface Education {
  id         : number;
  degree     : string;
  institution: string;
  location   : string;
  startDate  : string;
  endDate?   : string;
  current    : boolean;
  distinction?: string;
  description?: string;
}
