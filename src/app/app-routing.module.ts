import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { LoginComponent } from './components/login/login.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VisualizacionComponent } from './components/visualizacion/visualizacion.component';
import { Service as AuthGuard } from './service/service';

const routes: Routes = [{
  path: 'pedidos', component: PedidosComponent, canActivate: [AuthGuard]
},
{
  path: 'visualizacion', component: VisualizacionComponent, canActivate: [AuthGuard]
},
{
  path: 'editPedido', component: EditComponent, canActivate: [AuthGuard]
},
{
  path: 'login', component: LoginComponent
},
{
  path: 'registro', component: RegistroComponent
},
{
  path: '**', pathMatch:'full', redirectTo: 'login'
},
{
  path: '', pathMatch:'full', redirectTo: 'login'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
