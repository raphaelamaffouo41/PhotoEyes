export interface AdminPhotographer {

  userId: number;

  photographerId?: number;

  nom: string;
  imageUrl:string;
  prenom: string;
  nombrePhotos: number;
  email: string;
  ville:string
  accountStatut: string;
  specialites?: string[];
  message: string;

}
