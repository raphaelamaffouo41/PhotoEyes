import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationRequest } from '../../models/validation-request.model';
import { AdminPhotographer } from '../../models/admin-photographer.model';

@Component({
  selector:'app-validation-card',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./validation-card.component.html',
  styleUrls:['./validation-card.component.css']
})
export class ValidationCardComponent{

  @Input()

  photographer!:AdminPhotographer;

  @Output()

  validate = new EventEmitter<number>();

  @Output()

  reject = new EventEmitter<number>();

  onValidate(){

    this.validate.emit(this.photographer.userId);

  }

  onReject(){

    this.reject.emit(this.photographer.userId);

  }

}