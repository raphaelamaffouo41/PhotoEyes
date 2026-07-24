import { PortfolioItem } from "./portfolio-items";
import {Review} from "./review";
import {PricingItem} from "./pricing-item";

export interface PhotographerDetail{
  id: number;
  nom: string;
  ville: string;
  description:string;
  specialite: string;
  note:number
  noteMoyenne:number;
  nombreAvis: number;
  certifie: boolean;
  photoProfil: string;
  photoCouverture: string;
  bio: string;
  categories: string[];
  portfolio: PortfolioItem[];
  tarifs: PricingItem[];
  avis: Review[];
}
