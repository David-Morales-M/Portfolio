export interface Project {
  id          : number;
  title       : string;
  client      : string;
  description : string;
  technologies: string[];
  photos      : string[];
  link        : string;
  demoUrl?    : string;
  paperDoi?   : string;
  roles       : string[];
  details     : string;
  state       : ProjectState;
  tier        : 1 | 2 | 3;
  featured    : boolean;
}

export type ProjectState =
  | 'deployed'       // Desplegado y en uso
  | 'demo-available' // Demo disponible
  | 'repository'     // Solo repositorio
  | 'in-progress';   // En desarrollo
