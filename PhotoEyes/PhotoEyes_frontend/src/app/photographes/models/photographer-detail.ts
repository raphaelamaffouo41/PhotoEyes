import { PortfolioItem } from "./portfolio-items";
import {Review} from "./review";
import {PricingItem} from "./pricing-item";

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
  review: Review[];
  tarrif:  PricingItem[];
}
