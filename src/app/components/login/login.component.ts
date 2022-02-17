import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Service } from 'src/app/service/service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = '';

  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$')]),
    pass: new FormControl('',[Validators.required]),

  })
  

  constructor( private _service: Service,
               private router: Router,
               private auth: AngularFireAuth) {



  }

  ngOnInit(): void {
  }


  ingreso(){
    const email = this.login.value.email
    const pass = this.login.value.pass 

    this._service.login(email, pass).then( resp =>{
      console.log('Ingreso exitoso')

      if( this.login.valid){

        this.auth.user.subscribe(user =>{

          if(user){

            this._service.currentUser(email)

            setTimeout(() => {
              this.router.navigate(['visualizacion']);
            }, 400);

          }

        })
        

      }



    }).catch(response => {
      this.errorMessage = response.message;
    });



  }

  google(){

    this._service.loginGoogle().then( resp =>{
      console.log('Ingreso exitoso')

      this.auth.user.subscribe(user =>{

        if(user){

        
          setTimeout(() => {
            this.router.navigate(['visualizacion']);
          }, 400);

        }

      })

    })
  }

  redirect(){

    this.router.navigate(['registro'])
  }

}
