import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotographerDashboard } from '../../models/photographer-dashboard.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cover-upload',
  standalone: true,
  imports: [ CommonModule,FormsModule],
  templateUrl: './cover-upload.component.html',
  styleUrl: './cover-upload.component.css'
})
export class CoverUploadComponent {
  @Input()

  dashboard!: PhotographerDashboard;

  @Output()
  imagesChange = new EventEmitter<any>();
profilePreview:string | null = null;
coverPreview:string | null = null;
profileFile!:File;
coverFile!:File;

selectProfile(event:any){
const file =event.target.files[0];
if(file){
  this.profileFile=file;
  const reader =new FileReader();
  reader.onload = ()=>{
    this.profilePreview =
    reader.result as string;
  }

  reader.readAsDataURL(file);
  }


}

selectCover(event:any){
  const file =event.target.files[0];
  if(file){
  this.coverFile=file;
  const reader =new FileReader();
  reader.onload = ()=>{
  this.coverPreview =
  reader.result as string;

  }

  reader.readAsDataURL(file);
  }


}


saveImages(){

 this.imagesChange.emit({

 profile:this.profileFile,

 cover:this.coverFile

 });

}

}
