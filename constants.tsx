
export const ARCH_STYLES = [
  'Modern', 'Parametric', 'Brutalist', 'Minimal', 'Islamic', 'Neo-futurism', 'High-tech', 'Organic'
];

export const IMAGE_TYPES = [
  'Exterior render', 'Interior render', 'Landscape', 'Urban context', '2D plan to 3D', 'Section', 'Axonometric'
];

export const BUILDING_TYPES = [
  'Residential', 'Office', 'Commercial', 'Cultural', 'Mixed-use', 'Interior spaces'
];

export const CAMERA_ANGLES = [
  'Eye-level', 'Bird-eye', 'Worm-eye', 'Isometric', 'Wide angle 18–24mm', 'Cinematic 35–50mm'
];

export const LIGHTING_OPTIONS = [
  'Day', 'Night', 'Sunset', 'Golden hour', 'Overcast', 'Dramatic lighting', 'Soft ambient lighting'
];

export const ENVIRONMENTS = [
  'Urban dense', 'Desert', 'Coastal', 'Forest', 'Mountain', 'Futuristic city'
];

export const RENDER_MODES = [
  'Close to original', 'High realism', 'Stylized', 'Conceptual'
];

export interface PlanPresetDetail {
  id: string;
  name: string;
  description: string;
  materials: string[];
  forms: string;
}

export const PLAN_PRESET_DETAILS: PlanPresetDetail[] = [
  {
    id: 'res-modern',
    name: 'Residential Modern',
    description: 'Clean lines and open floor plans emphasizing horizontal and vertical elements.',
    materials: ['Glass', 'Steel', 'Smooth Concrete'],
    forms: 'Cubist, Cantilevered'
  },
  {
    id: 'res-contemp',
    name: 'Residential Contemporary',
    description: 'Dynamic styles with a focus on sustainability and fluid interior-exterior connection.',
    materials: ['Recycled Wood', 'Stone', 'Eco-plaster'],
    forms: 'Asymmetrical, Free-flowing'
  },
  {
    id: 'off-minimal',
    name: 'Office Minimal',
    description: 'Pure functionalism that removes distraction to focus on light and space.',
    materials: ['Polished Concrete', 'White Steel', 'Glass'],
    forms: 'Strict Geometries'
  },
  {
    id: 'off-scandi',
    name: 'Office Scandinavian',
    description: 'Warm, human-centric design with maximum natural light and cozy textures.',
    materials: ['Light Oak', 'Wool Textiles', 'White Masonry'],
    forms: 'Soft Angles, Gable Motifs'
  },
  {
    id: 'comm-luxury',
    name: 'Commercial Luxury',
    description: 'High-end aesthetic featuring reflective surfaces and monumental scales.',
    materials: ['Marble', 'Champagne Metal', 'Curtain Walls'],
    forms: 'Iconic, Sculptural'
  },
  {
    id: 'comm-industrial',
    name: 'Commercial Industrial',
    description: 'Raw aesthetic celebrating exposed structures and utilitarian honesty.',
    materials: ['Exposed Brick', 'Black I-Beams', 'Weathered Timber'],
    forms: 'Loft-style, Modular'
  },
  {
    id: 'concept-massing',
    name: 'Conceptual Massing',
    description: 'Abstract focus on volume and shadow, mimicking physical architectural models.',
    materials: ['Matte White Plaster', 'Translucent Resin'],
    forms: 'Experimental, Exploratory'
  }
];

export const PLAN_PRESETS = PLAN_PRESET_DETAILS.map(p => p.name);
