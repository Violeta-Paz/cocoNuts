import { Component, OnInit, ViewChild } from '@angular/core';
import { IPedidos } from 'src/app/interface/pedidos.interface';
import { Service } from 'src/app/service/service';
import { MatTable } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GPedidos } from 'src/app/interface/getPedidos';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-visualizacion',
  templateUrl: './visualizacion.component.html',
  styleUrls: ['./visualizacion.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class VisualizacionComponent implements OnInit {
  checkedT = true
  checkedF = false
  dataSource: GPedidos[] = [];
  displayedColumns: string[] = ['fechaRetiro','fechaPedido', 'nombre','contacto', 'pagado', 'total','observaciones', 'entregado', 'eliminar', 'editar'];
  expandedElement: IPedidos | null = null;

  
  constructor(private _service: Service,
              private firestore: AngularFirestore,
              private router: Router
              ) {


  }
              
  @ViewChild(MatTable) table!: MatTable<any>;

  ngOnInit(): void {
 
    this.getPedidos()
  }

  
  estadoEntregaT( id: string){

    let ref = this.firestore.collection('pedidos').doc(id);
      ref.update({"entregado": this.checkedT }).then(()=>{
        console.log('listo')
      })

  }


  estadoEntregaF( id: string){

    let ref = this.firestore.collection('pedidos').doc(id);
      ref.update({"entregado": this.checkedF }).then(()=>{
        console.log('listo')
      })

  }

  getPedidos(){
    
    this._service.getPedidos().subscribe(data => {
      this.dataSource = [];
      data.forEach(( element: any) => {
        let docData = element.payload.doc.data();
        this.dataSource.push({
          id: element.payload.doc.id,
          fechaRetiro: docData.fechaRetiro.toDate(),
          fechaPedido: docData.fechaPedido.toDate(),
          nombre: docData.nombre,
          contacto: docData.contacto,
          pagado: docData.pagado,
          total: docData.total,
          observaciones: docData.observaciones,
          productos: docData.productos,
          entregado: docData.entregado

        })
    
      });
      //console.log(this.dataSource);
      this.table.renderRows();
      
    })

  }

  eliminarPedidos(id: string){
    this._service.eliminarPedidos(id).then(()=>{
      console.log('pedido eliminado')
    }).catch(()=>{
      console.log('Err')
    })
  }

  redirect(){

    this.router.navigate(['editPedido'])
  }


  editar(id: string, fechaRetiro: Date, fechaPedido: Date, nombre: string, contacto: number, pagado: boolean, total: number, observaciones: string, productos: Array<string>, entregado: boolean){
    let data: GPedidos = {
      id: id, 
      fechaRetiro: fechaRetiro, 
      fechaPedido: fechaPedido, 
      nombre: nombre, 
      contacto: contacto, 
      pagado: pagado, 
      total: total, 
      observaciones: observaciones, 
      productos: productos,
      entregado: entregado
    }
    this.redirect()
    //this._service.dataEdit$.emit(data);
    this._service.dataEdit = data;

  }


}




