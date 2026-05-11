export interface Publication {
  id       : number;
  title    : string;
  resume   : string;
  keywords : string[];
  doi      : string;
  year     : string;
  journal? : string;
  quartile?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  topic   ?: PublicationTopic;
}

export type PublicationTopic =
  | 'serious-games'
  | 'ux-ui'
  | 'telerehabilitation'
  | 'accessibility'
  | 'usability'
  | 'health'
  | 'education';
