import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountModule } from '../../account/account.module';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-cre-upd-usr',
  templateUrl: './cre-upd-usr.component.html',
  styleUrl: './cre-upd-usr.component.scss'
})
export class CreUpdUsrComponent implements OnInit{
  formRegister!: FormGroup;
  Roles: string[] = ["Employee", "Customer"];

  constructor(private _serviceA: AccountService, private _fb: FormBuilder) {
    this.formRegister = _fb.group({
      Name:[''],
      Phone: [''],
      Email: [''],
      Password: [''],
      Role: [''],
    })
  }

  ngOnInit(): void {

  }

  submit() {
    this._serviceA.register(this.formRegister.value).subscribe({
      next: (data: any)=>{
        console.log(data);
      }
    })
  }

}
