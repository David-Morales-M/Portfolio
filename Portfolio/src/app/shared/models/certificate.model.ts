export interface Certificate {
  id         : number;
  title      : string;
  issuer     : string;
  year       : string;
  description: string;
  fileUrl?   : string;
  verifyUrl? : string;
  tier       : 1 | 2;
  category   : string;
}
