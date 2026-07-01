import db from "./db.json";

export interface Milestone {
  date: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
}

export interface Resource {
  name: string;
  type: string;
  detail: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  country: string;
  region: string;
  sector: string;
  status: "active" | "completed" | "planned";
  overview: string;
  objectives: string[];
  technologies: string[];
  milestones: Milestone[];
  resources: Resource[];
  impact: string;
  videoId: string;
  videoTitle: string;
  lastUpdated: string;
  coordinates: [number, number];
  facts: Record<string, string>;
  keywords: string[];
}

export const projects: Project[] = db.projects as Project[];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
