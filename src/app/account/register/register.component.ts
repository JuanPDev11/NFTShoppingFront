import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';
import { AccountService } from '../../services/account.service';
import { subscribe } from 'diagnostics_channel';
import Swal from 'sweetalert2';
import { title } from 'process';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})




export class RegisterComponent {
  formRegister!: FormGroup;
  submitted = false;
  errorMessages: string[] = [];

  constructor(private _fb: FormBuilder, private _service:AccountService,private _redirect:Router) {
    this.formRegister = _fb.group({
      Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      Phone: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    })
  }


  submit() {
    this.submitted = true;


    this._service.register(this.formRegister.value).subscribe({
      next: (response:any) => {
        console.log(response);
        
        Swal.fire({
          icon: 'success',
          title: `${response.value.title}`,
          text: `${response.value.message}`
        });
        this._redirect.navigate(['/account/login']);
      },
      error: error => {
        console.log(error)
        if (error.error.errors) {
          this.errorMessages = error.error.errors
        } else {
          this.errorMessages.push(error.error.error)
        }
      }
    })

  }

}
