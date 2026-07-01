import { Project, projects } from "@/data/projects";

export interface SearchResult {
  project: Project;
  answer: string;
  confidence: "high" | "medium" | "low";
  matchedFields: string[];
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[?.,!''""()\-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

const STOP_WORDS = new Set([
  "the", "is", "of", "in", "a", "an", "and", "or", "to", "for",
  "it", "this", "that", "are", "was", "be", "has", "have", "do",
  "does", "did", "will", "can", "its", "with", "on", "at", "by",
  "from", "as", "but", "not", "if", "so", "no", "my", "me",
  "about", "up", "out", "just", "been", "than", "them", "then",
]);

function scoreProject(tokens: string[], project: Project): number {
  let score = 0;

  const keywordSet = new Set(project.keywords);
  const nameTokens = tokenize(project.name);
  const countryToken = project.country.toLowerCase();
  const sectorTokens = tokenize(project.sector);
  const overviewTokens = tokenize(project.overview);
  const factValues = Object.values(project.facts).join(" ").toLowerCase();

  for (const token of tokens) {
    if (STOP_WORDS.has(token)) continue;

    if (keywordSet.has(token)) score += 10;
    if (nameTokens.includes(token)) score += 8;
    if (token === countryToken) score += 6;
    if (sectorTokens.includes(token)) score += 4;
    if (overviewTokens.includes(token)) score += 1;
    if (factValues.includes(token)) score += 2;
  }

  return score;
}

const FACT_KEYWORDS: Record<string, { fields: string[]; labels: string[] }> = {
  capacity: { fields: ["capacity"], labels: ["Capacity"] },
  barrels: { fields: ["capacity"], labels: ["Capacity"] },
  bpd: { fields: ["capacity"], labels: ["Capacity"] },
  tonnes: { fields: ["capacity"], labels: ["Capacity"] },
  ounces: { fields: ["capacity", "size"], labels: ["Capacity", "Resource Size"] },
  production: { fields: ["capacity", "products"], labels: ["Capacity", "Products"] },

  cost: { fields: ["investment"], labels: ["Investment"] },
  investment: { fields: ["investment"], labels: ["Investment"] },
  money: { fields: ["investment"], labels: ["Investment"] },
  billion: { fields: ["investment"], labels: ["Investment"] },
  million: { fields: ["investment"], labels: ["Investment"] },
  capital: { fields: ["investment"], labels: ["Investment"] },
  finance: { fields: ["investment"], labels: ["Investment"] },

  size: { fields: ["size"], labels: ["Size"] },
  hectares: { fields: ["size"], labels: ["Size"] },
  area: { fields: ["size"], labels: ["Size"] },
  resource: { fields: ["size"], labels: ["Resource"] },
  reserve: { fields: ["size"], labels: ["Resource"] },

  jobs: { fields: ["jobs"], labels: ["Employment"] },
  employment: { fields: ["jobs"], labels: ["Employment"] },
  workers: { fields: ["jobs", "construction_workforce"], labels: ["Employment", "Construction Workforce"] },
  hire: { fields: ["jobs"], labels: ["Employment"] },
  hiring: { fields: ["jobs"], labels: ["Employment"] },

  product: { fields: ["products"], labels: ["Products"] },
  fuel: { fields: ["products"], labels: ["Products"] },
  petrol: { fields: ["products"], labels: ["Products"] },
  diesel: { fields: ["products"], labels: ["Products"] },
  produce: { fields: ["products"], labels: ["Products"] },
  output: { fields: ["products"], labels: ["Products"] },
  gold: { fields: ["products", "size"], labels: ["Products", "Resource Size"] },

  power: { fields: ["power"], labels: ["Power / Energy"] },
  electricity: { fields: ["power"], labels: ["Power / Energy"] },
  energy: { fields: ["power"], labels: ["Power / Energy"] },
  megawatt: { fields: ["power"], labels: ["Power / Energy"] },
  hydroelectric: { fields: ["power"], labels: ["Power / Energy"] },

  pipeline: { fields: ["pipeline"], labels: ["Pipeline Infrastructure"] },
  pipe: { fields: ["pipeline"], labels: ["Pipeline Infrastructure"] },

  savings: { fields: ["savings"], labels: ["Economic Impact"] },
  revenue: { fields: ["savings"], labels: ["Economic Impact"] },
  tax: { fields: ["savings"], labels: ["Economic Impact"] },
  royalties: { fields: ["savings"], labels: ["Economic Impact"] },
  foreign: { fields: ["savings"], labels: ["Economic Impact"] },
  exchange: { fields: ["savings"], labels: ["Economic Impact"] },
  economy: { fields: ["savings"], labels: ["Economic Impact"] },

  location: { fields: ["location"], labels: ["Location"] },
  where: { fields: ["location"], labels: ["Location"] },
  located: { fields: ["location"], labels: ["Location"] },

  status: { fields: ["status"], labels: ["Current Status"] },
  progress: { fields: ["status"], labels: ["Current Status"] },
  happening: { fields: ["status"], labels: ["Current Status"] },
  current: { fields: ["status"], labels: ["Current Status"] },
  now: { fields: ["status"], labels: ["Current Status"] },
  phase: { fields: ["status"], labels: ["Current Status"] },

  owner: { fields: ["owner"], labels: ["Project Owner"] },
  who: { fields: ["owner"], labels: ["Project Owner"] },
  company: { fields: ["owner"], labels: ["Project Owner"] },
  owns: { fields: ["owner"], labels: ["Project Owner"] },

  construction: { fields: ["construction_workforce"], labels: ["Construction Workforce"] },
  build: { fields: ["construction_workforce"], labels: ["Construction Workforce"] },
  building: { fields: ["construction_workforce"], labels: ["Construction Workforce"] },

  grade: { fields: ["grade"], labels: ["Ore Grade"] },
  processing: { fields: ["processing"], labels: ["Processing Method"] },
  mine_life: { fields: ["mine_life"], labels: ["Mine Life"] },
  life: { fields: ["mine_life"], labels: ["Mine Life"] },
  long: { fields: ["mine_life"], labels: ["Mine Life"] },
  years: { fields: ["mine_life"], labels: ["Mine Life"] },
  duration: { fields: ["mine_life"], labels: ["Mine Life"] },

  resettlement: { fields: ["resettlement"], labels: ["Community Resettlement"] },
  community: { fields: ["resettlement"], labels: ["Community Resettlement"] },
  relocation: { fields: ["resettlement"], labels: ["Community Resettlement"] },

  emissions: { fields: ["emissions"], labels: ["Emissions Standards"] },
  environment: { fields: ["emissions"], labels: ["Environmental Standards"] },
  pollution: { fields: ["emissions"], labels: ["Emissions Standards"] },

  port: { fields: ["port"], labels: ["Port Infrastructure"] },
  shipping: { fields: ["port"], labels: ["Port Infrastructure"] },
};

function extractFacts(tokens: string[], project: Project): Map<string, string> {
  const matched = new Map<string, string>();

  for (const token of tokens) {
    if (STOP_WORDS.has(token)) continue;
    const mapping = FACT_KEYWORDS[token];
    if (!mapping) continue;

    for (let i = 0; i < mapping.fields.length; i++) {
      const field = mapping.fields[i];
      const label = mapping.labels[i];
      if (project.facts[field] && !matched.has(field)) {
        matched.set(field, label);
      }
    }
  }

  return matched;
}

export function searchProjects(query: string): SearchResult[] {
  const tokens = tokenize(query);

  const scored = projects
    .map((project) => ({ project, score: scoreProject(tokens, project) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return [];
  }

  return scored.map(({ project }) => {
    const facts = extractFacts(tokens, project);

    if (facts.size > 0) {
      const parts = Array.from(facts.entries()).map(
        ([field, label]) => `**${label}:** ${project.facts[field]}`
      );
      return {
        project,
        answer: parts.join("\n\n"),
        confidence: (facts.size >= 2 ? "high" : "medium") as "high" | "medium",
        matchedFields: Array.from(facts.keys()),
      };
    }

    const overviewWords = ["what", "about", "tell", "explain", "overview", "describe", "project"];
    const isOverview = tokens.some((t) => overviewWords.includes(t));

    if (isOverview) {
      return {
        project,
        answer: project.overview,
        confidence: "medium" as const,
        matchedFields: ["overview"],
      };
    }

    return {
      project,
      answer: `${project.tagline} ${project.overview.slice(0, 200)}...`,
      confidence: "low" as const,
      matchedFields: [],
    };
  });
}
