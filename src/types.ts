interface Weight {
  imperial: string;
  metric: string;
}

interface Breed {
  weight: Weight;
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
}

export interface CatData {
  breeds: Breed[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface PostCard {
  id: string;
  breed: string;
  origin: string;
  temperment: string;
  image: string;
}

export interface CatDetails {
  breed: string;
  origin: string;
  temperment: string;
  image: string;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  life_span: string;
  description: string;
  shedding_level: number;
}

export interface BreedOption {
  id: string;
  name: string;
}

export interface CatUpload {
  id: string;
  url: string;
  sub_id: string;
  width: number;
  height: number;
  original_filename: string;
  breed_ids: string;
  pending: number;
  approved: number;
}
