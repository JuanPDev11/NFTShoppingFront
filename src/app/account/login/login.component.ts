import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { AccountService } from '../../services/account.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

  

export class LoginComponent {
  formLogin!: FormGroup;
  submitted = false;
  errorMessages: string[] = [];

  constructor(private _fb: FormBuilder,private _service:AccountService,private _redirect:Router)
  {
    this.formLogin = _fb.group({
      UserName: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    })
  }

  submit() {
    this.submitted = true;


    this._service.login(this.formLogin.value).subscribe({
      next: (response: any) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: `Bienvenido ${response.name} has inicado sesion`
        });
        this._redirect.navigate(['']);
      },
      error: error => {
        console.log(error);
        if (error.error.errors) {
          this.errorMessages = error.error.errors;
        } else {
          /*this.errorMessages.push(error.error.error);*/
          Swal.fire({
            icon: 'error',
            title: `${error.error.error}`
          });
          this.formLogin.reset();
        }
      }
    })
  }
}
