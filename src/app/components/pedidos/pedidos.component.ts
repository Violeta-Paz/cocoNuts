import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { IPedidos } from 'src/app/interface/pedidos.interface';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Service } from 'src/app/service/service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  
})


export class PedidosComponent implements OnInit {

  //pedido: FormGroup;
  entregado = false;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  productos: string[] = ['marraqueta'];
  //dataSource: GPedidos[] = [];

  pedido: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    contacto: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    fechaPedido: new FormControl('',[Validators.required]),
    fechaRetiro: new FormControl('',[Validators.required]),
    pagado: new FormControl( false,[Validators.required]),
    total: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    listaProductos: new FormControl( this.productos ,[Validators.required]),
    observaciones: new FormControl( '',[])
  })

  constructor(
    private _service: Service,
    private router: Router
    ) {


  }


  ngOnInit(): void {
    //this.addPedido()

  
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.productos.push( value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(producto: string): void {
    const index = this.productos.indexOf(producto);

    if (index >= 0) {
      this.productos.splice(index, 1);
    }
  }

  addPedido(){
    if(this.pedido.invalid){
      return;
    }

    if (this.pedido.valid) { 

      const agregarPedido: IPedidos = {
        nombre: this.pedido.value.nombre,
        contacto: this.pedido.value.contacto,
        fechaPedido: this.pedido.value.fechaPedido,
        fechaRetiro: this.pedido.value.fechaRetiro,
        pagado: this.pedido.value.pagado,
        total:  this.pedido.value.total,
        productos: this.productos,
        observaciones: this.pedido.value.observaciones,
        entregado: this.entregado
      }
      this._service.addPedido(agregarPedido).then((resp) => {
        console.log(resp)
        this.pedido.reset();
      }).catch(err => {
        console.log(err);
      })

    }
  }









}
