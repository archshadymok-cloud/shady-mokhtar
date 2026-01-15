
export enum ModuleType {
  HOME = 'home',
  PROMPT_GEN = 'prompt-generator',
  RE_RENDER = 're-render',
  IDEAS_GEN = 'ideas-concept',
  PLAN_TO_3D = 'plan-to-3d',
  HISTORY = 'history'
}

export interface PromptOutput {
  id: string;
  style: string;
  type: string;
  buildingType: string;
  camera: string;
  lighting: string;
  environment: string;
  fullPrompt: string;
  timestamp: number;
}

export interface ConceptOutput {
  id: string;
  name: string;
  mainIdea: string;
  narrative: string;
  keywords: string[];
  materials: string[];
  formApproach: string;
  timestamp: number;
}

export interface HistoryItem {
  id: string;
  type: ModuleType;
  title: string;
  content: any;
  imageUrl?: string;
  timestamp: number;
  tags: string[];
}
