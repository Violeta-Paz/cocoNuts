import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { IPedidos } from 'src/app/interface/pedidos.interface';
import { GPedidos } from 'src/app/interface/getPedidos';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  productos: string[] = [];
  entregado = false

  pedidoEdit: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    contacto: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    fechaPedido: new FormControl('', [Validators.required]),
    fechaRetiro: new FormControl('', [Validators.required]),
    pagado: new FormControl(false, [Validators.required]),
    total: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    listaProductos: new FormControl(this.productos, [Validators.required]),
    observaciones: new FormControl('', [])
  });

  constructor(private _service: Service, private router: Router) {
  }



  ngOnInit(): void {


    if(this._service.dataEdit?.id == null){

      this.router.navigate(['visualizacion'])

    }


    if(this._service.dataEdit) {
      this.pedidoEdit.controls["nombre"].setValue(this._service.dataEdit.nombre);
      this.pedidoEdit.controls["contacto"].setValue(this._service.dataEdit.contacto);
      this.pedidoEdit.controls["fechaPedido"].setValue(this._service.dataEdit.fechaPedido);
      this.pedidoEdit.controls["fechaRetiro"].setValue(this._service.dataEdit.fechaRetiro);
      this.pedidoEdit.controls["pagado"].setValue(this._service.dataEdit.pagado);
      this.pedidoEdit.controls["total"].setValue(this._service.dataEdit.total);
      this.pedidoEdit.controls["observaciones"].setValue(this._service.dataEdit.observaciones);
      this.productos = this._service.dataEdit.productos;
    }
    
  }




  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.productos.push(value);
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

  editPedido() {

    if (this._service.dataEdit?.entregado == null){
      this.entregado = false
    }
    if (this._service.dataEdit?.entregado == false){
      this.entregado = false
    }
    if (this._service.dataEdit?.entregado == true){
      this.entregado = true
    }

    const id = this._service.dataEdit?.id

    const editPedido: IPedidos = {
      nombre: this.pedidoEdit.value.nombre,
      contacto: this.pedidoEdit.value.contacto,
      fechaPedido: this.pedidoEdit.value.fechaPedido,
      fechaRetiro: this.pedidoEdit.value.fechaRetiro,
      pagado: this.pedidoEdit.value.pagado,
      total:  this.pedidoEdit.value.total,
      productos: this.productos,
      observaciones: this.pedidoEdit.value.observaciones,
      entregado: this.entregado
    }

    this._service.editarPedido( id, editPedido)

    setTimeout(() => {
      this.router.navigate(['visualizacion']);
  }, 400);

    

  }



}
