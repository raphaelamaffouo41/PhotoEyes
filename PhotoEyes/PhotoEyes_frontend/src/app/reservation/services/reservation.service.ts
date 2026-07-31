import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ReservationRequest } from '../models/reservation-request.model';


@Injectable({
  providedIn:'root'
})
export class ReservationService {

        private API="http://localhost:8080/api/reservation";
        constructor(private http:HttpClient){}

        async createReservation(
        request:ReservationRequest
        ){

        return await firstValueFrom(

        this.http.post<any>(
        `${this.API}/create`,
        request
        )

        );

    }
}