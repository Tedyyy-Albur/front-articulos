import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { AppComponent } from './app.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PartidaComponent } from './partida/partida.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'clientes', component: ClientesComponent},
      {path:'articulos', component: ArticulosComponent},
      {path:'pedidos', component: PedidosComponent},
      {path:'partida/:id', component: PartidaComponent},
      {path:'**', redirectTo:'clientes'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
