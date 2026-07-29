import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationRequest } from '../../models/validation-request.model';

@Component({
  selector:'app-validation-card',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./validation-card.component.html',
  styleUrls:['./validation-card.component.css']
})
export class ValidationCardComponent{

  @Input({required:true})
  demande!: ValidationRequest;

  @Output()
  validate = new EventEmitter<number>();

  @Output()
  reject = new EventEmitter<number>();

  onValidate(){

    this.validate.emit(this.demande.id);

  }

  onReject(){

    this.reject.emit(this.demande.id);

  }

}