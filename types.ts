export type StepId = 'basics' | 'technical' | 'soft-skills' | 'xfactor' | 'review' | 'success';

export interface FormData {
  // Part 1: Hiring Basics
  developerCount: string;
  startDate: string;

  // Part 2: Technical Focus
  roadmapFocus: 'Frontend' | 'Backend' | 'Balanced' | '';
  codebaseType: 'Greenfield' | 'Legacy' | '';
  languages: string[];

  // Part 3: Soft Skills
  personas: string[];
  successfulTrait: string;

  // Part 4: X-Factor
  nonTechnicalBackground: string;
}

export const INITIAL_DATA: FormData = {
  developerCount: '',
  startDate: '',
  roadmapFocus: '',
  codebaseType: '',
  languages: ['JavaScript (Node.js, React)'], // Default selection
  personas: [],
  successfulTrait: '',
  nonTechnicalBackground: '',
};

export const AVAILABLE_LANGUAGES = [
  "Python", "Ruby", "Java", "Go", "Kotlin", "PHP", "C#", "TypeScript", "Swift", "JavaScript (Node.js, React)"
];

export const JUNIOR_PERSONAS = [
  {
    id: "researcher",
    title: "The Researcher",
    description: "Independent problem-solver, deep dive into documentation."
  },
  {
    id: "collaborator",
    title: "The Collaborator",
    description: "Constant communication, asks questions early, team player."
  },
  {
    id: "builder",
    title: "The Builder",
    description: "Quick to ship features, willing to refactor later."
  },
  {
    id: "innovator",
    title: "The Innovator",
    description: "Creative thinker, loves experimenting with new ideas."
  },
  {
    id: "strategist",
    title: "The Strategist",
    description: "Enjoys planning, designing systems, and thinking long-term."
  },
  {
    id: "problem_solver",
    title: "The Problem-Solver",
    description: "Focused on tackling specific challenges with logic and precision."
  }
];
