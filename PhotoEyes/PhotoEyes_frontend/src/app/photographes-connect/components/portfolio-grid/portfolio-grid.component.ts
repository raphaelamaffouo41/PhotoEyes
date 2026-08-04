import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotographerDashboard } from '../../models/photographer-dashboard.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioCardComponent } from '../portfolio-card/portfolio-card.component';

@Component({
  selector: 'app-portfolio-grid',
  standalone: true,
  imports: [CommonModule,FormsModule,PortfolioCardComponent],
  templateUrl: './portfolio-grid.component.html',
  styleUrl: './portfolio-grid.component.css'
})
export class PortfolioGridComponent {
  @Input()

  dashboard?: PhotographerDashboard;

  @Output()

addPhoto = new EventEmitter<File>();


@Output()

deletePhoto = new EventEmitter<number>();

preview:string | null = null;

selectedFile!:File;

maxPhotos = 5;

get progress(){

return this.dashboard?.portfolio?.length || 0;

}

selectImage(event:any){

  const file = event.target.files[0];

      if(file){

      this.selectedFile=file;

      const reader = new FileReader();

      reader.onload=()=>{
      this.preview =reader.result as string;


      }


      reader.readAsDataURL(file);

      }

    }

    upload(){

      if(this.selectedFile){


      this.addPhoto.emit(
      this.selectedFile
      );

      this.preview=null
      }

    }

    remove(id:number){
    this.deletePhoto.emit(id);

    }
    ngOnChanges(){

      console.log("Portfolio reçu :",this.dashboard?.portfolio);

    }
}
