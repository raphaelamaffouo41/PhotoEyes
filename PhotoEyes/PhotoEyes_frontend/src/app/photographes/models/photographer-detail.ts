import { PortfolioItem } from "../services/portfolio-items";

export interface PhotographerDetail{
  id: number;
  nom: string;
  specialite: string;
  certifie: boolean;
  photoProfil?: string;
  photoCouverture?: string;
  bio: string;
  categories : string[];
  portfolio: PortfolioItem[];
}
