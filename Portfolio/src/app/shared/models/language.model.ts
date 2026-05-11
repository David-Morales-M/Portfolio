export interface Language {
  id        : number;
  name      : string;
  level     : LanguageLevel;
  levelLabel: string;
  native    : boolean;
}

export type LanguageLevel =
  | 'A1' | 'A2'
  | 'B1' | 'B2'
  | 'C1' | 'C2'
  | 'native';
