import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Service } from 'src/app/service/service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  change = false
  registro = new FormGroup({
    email: new FormControl('', [Validators.required,  Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$')]),
    pass: new FormControl('',[Validators.required, Validators.pattern('.{8,}')]),

  })

  constructor(private _service: Service,
              private router: Router,
              private auth: AngularFireAuth) {

   }

  ngOnInit(): void {
  }

  addRegistro(){

    const email = this.registro.value.email
    const pass = this.registro.value.pass 

    this._service.registro(email, pass).then( resp =>{
      console.log('Ingreso exitoso')

      if( this.registro.valid){

        this.auth.user.subscribe(user =>{

          if(user){

            this._service.currentUser(email)

            setTimeout(() => {
              this.router.navigate(['visualizacion']);
            }, 400);

          }

        })
        

      }

    })



  }


}
