export interface SkillCategory {
  id       : string;
  label    : string;
  icon?    : string;
  skills   : Skill[];
}

export interface Skill {
  name    : string;
  level   : SkillLevel;
  learning: boolean;
}

export type SkillLevel =
  | 'expert'       // Dominio real, usado en producción
  | 'proficient'   // Cómodo, proyectos propios
  | 'familiar'     // Conocimiento básico, en aprendizaje
