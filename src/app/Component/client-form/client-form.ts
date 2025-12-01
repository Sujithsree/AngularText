import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,} from '@angular/forms'

@Component({
  selector: 'app-client-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css',
})
export class ClientForm {
  
  ClientProfileForm = new FormGroup({
    id : new FormControl('20abc6550'),
    name : new FormControl(''),
    email : new FormControl(''),
    tags : new FormControl(''),
    notes : new FormControl('') 
  })

  display = false;

  getDetails(){
    this.display = true;
    console.log(this.ClientProfileForm.value);
  }
}
