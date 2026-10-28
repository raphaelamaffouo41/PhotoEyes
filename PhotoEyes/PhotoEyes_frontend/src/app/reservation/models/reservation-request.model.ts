export interface ReservationRequest{

    photographerId:number;

    date:string;

    heureDebut:string;

    heureFin:string;

    message:string;
    typePrestation?: string;
    lieu?: string;
    delaiLivraison?: string;
}
