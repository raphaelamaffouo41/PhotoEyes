import { Component, OnInit } from '@angular/core';
import { RouterLink, Router,ActivatedRoute } from '@angular/router';
import { Photographer } from '../../../accueil/models/photographer.model';
import { PhotographerService } from '../../../accueil/service/photographerservice';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private photographerService: PhotographerService
  ){}

  photographerId!: number;
  photographer!: Photographer;

  ngOnInit(){

    this.photographerId = Number(

        this.route.snapshot.paramMap.get(
            'photographerId'
        )

    );

    console.log(this.photographerId);

}
}
