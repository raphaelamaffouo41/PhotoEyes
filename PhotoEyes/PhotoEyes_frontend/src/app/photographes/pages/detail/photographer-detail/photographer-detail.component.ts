import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PhotographerService} from "../../../../accueil/service/photographerservice";
import {Photographer} from "../../../../accueil/models/photographer.model";
import {ProfileHeaderComponent} from "../../../components/profile-header/profile-header.component";
import {AboutCarrdComponent} from "../../../components/about-carrd/about-carrd.component";
import {PhotographerDetail} from "../../../models/photographer-detail";
import { PhotoGrapherService } from "../../../services/photographer.service";
import {PortfolioGalleryComponent} from "../../../components/portfolio-gallery/portfolio-gallery.component";
import {ReviewsListComponent} from "../../../components/reviews-list/reviews-list.component";

@Component({
  selector: 'app-photographer-detail',
  standalone: true,
  imports: [ProfileHeaderComponent,AboutCarrdComponent,PortfolioGalleryComponent,ReviewsListComponent],
  templateUrl:'./photographer-detail.component.html',
  styleUrl: './photographer-detail.component.css'
})
export class PhotographerDetailComponent implements OnInit {
  photographer?: Photographer;
  photographerDetail?: PhotographerDetail;

  constructor(
    private photographerService: PhotographerService,
    private detailService: PhotoGrapherService,
    private route: ActivatedRoute) {}

  async ngOnInit():Promise<void> {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.photographer = await this.photographerService.getById(id);

    this.photographerDetail = await this.detailService.getById(id);
  }
}
