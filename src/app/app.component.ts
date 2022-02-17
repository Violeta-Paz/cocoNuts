
import { Component } from '@angular/core';
//import 'firebase/compat/firestore';
import { Router } from '@angular/router';
import { Service } from './service/service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{
  title = 'cocoNuts'; 
  navLinks: any[];
  activeLinkIndex = -1;
  authActive = false
  

  

  constructor(private router: Router,
              public _service: Service,
              private auth: AngularFireAuth,
              private afs: AngularFireStorage) {
    this.navLinks = [
        {
            label: 'visualizacion',
            link: './visualizacion',
            index: 0
        }, 
        {
            label: 'pedidos',
            link: './pedidos',
            index: 1
        },
        {
          label: 'Crear cuenta',
          link: './registro',
          index: 2
      },
    ];
}

  ngOnInit(): void {

    

    this.value()

    this.auth.user.subscribe(user =>{

      if(user){
        this.authActive = true
      }

    })

    
    

   

    //if (localStorage.getItem('currentUser')) {
      // logged in so return true
      //this.auth = true
      
    
    //} 


    this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

  }

  redirect(){

    this.router.navigate(['registro'])
  }


   value(){
    this._service.authActived.valueOf()
   }


  logout(){
    this._service.logout()
    this._service.logoutStorage()

    this.authActive = false

    setTimeout(() => {
      this.router.navigate(['login']);
  }, 3000);

  }
  
}
