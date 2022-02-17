
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase from 'firebase/compat/app';

import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { GPedidos } from '../interface/getPedidos';

@Injectable({
  providedIn: 'root'
})
export class Service {

  dataEdit: GPedidos | null = null;
  authActived = false



  constructor(private firestore: AngularFirestore,
              private auth: AngularFireAuth,

              private route: ActivatedRoute,
              private router: Router) { }

  addPedido(pedido: any): Promise<any>{
    return this.firestore.collection('pedidos').add(pedido)
  }

  getPedidos(): Observable<any> {
    return this.firestore.collection('pedidos', ref => ref.orderBy('fechaRetiro', 'asc')).snapshotChanges()
  }

  editarPedido(id: any, data: any): Promise<any>{
    return this.firestore.collection('pedidos').doc(id).update(data)
  }

  eliminarPedidos(id: string): Promise<any>{
    return this.firestore.collection('pedidos').doc(id).delete();
  }

  getPedido(id: string): Observable<any>{
    return this.firestore.collection('pedidos').doc(id).snapshotChanges()
  }

  async login(email: string, pass: string){
    try {
      return await this.auth.signInWithEmailAndPassword(email, pass)
    } catch (err) {
      console.log('error login Google', err);
      return null;
    }
  }

  async loginGoogle(){
    try {
      return await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    } catch (err) {
      console.log('error login Google', err);
      return null;
    }

  }

  async registro(email: string, pass: string){
    try {
      return await this.auth.createUserWithEmailAndPassword(email, pass)
    } catch (err) {
      console.log('error en  registro', err);
      return null;
    }

  }

  getUserlogged(){
    return this.auth.authState;
  }

  async logout(){
    try { 
    await this.auth.signOut(); 
    } catch (err) {
      console.log(err)
    }
  }

  logoutStorage() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
      
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  

  
  currentUser(email: any){
    return localStorage.setItem('currentUser', JSON.stringify(email));
  }






  
}
