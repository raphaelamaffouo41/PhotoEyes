export interface PhotographerProfileRequest {
    description:string;
    ville:string;
    imageUrl:string;
    photoCouverture:string;
    prixPortrait:number|null;
    prixDemiJournee:number|null;
    prixJournee:number|null;
    specialites:string[];

}