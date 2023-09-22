import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clientes } from '../interfaces/clientes';
import { Articulos } from '../interfaces/articulos';
import { Pedidos } from '../interfaces/pedidos';
import { PartidaPedido } from '../interfaces/partida-pedido';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8000/api/';
  //private apiUrl = 'https://articulos-crud-production.up.railway.app/api/';
  /**clientes */
  obtenerClientes() {
    return this.http.get<any>(this.apiUrl+'clientes/obtener');
  }
  guardarClientes(valores: Clientes) {
    return this.http.post<any>(this.apiUrl+'clientes/guardar', valores);
  }
  editarClientes(valores: Clientes) {
    return this.http.put<any>(this.apiUrl+'clientes/editar', valores);
  }
  borrarClientes(id: number) {
    return this.http.delete<any>(this.apiUrl+'clientes/eliminar', {body: id});
  }
   /**Articuloss */

  obtenerArticulo() {
    return this.http.get<any>(this.apiUrl+'articulo/obtener');
  }
  guardarArticulo(valores: Articulos) {
    return this.http.post<any>(this.apiUrl+'articulo/guardar', valores);
  }
  editarArticulos(valores: Articulos) {
    return this.http.put<any>(this.apiUrl+'articulo/editar', valores);
  }
  borrarArticulo(id: number) {
    return this.http.delete<any>(this.apiUrl+'articulo/eliminar', {body: id});
  }
    /**Pedidos */

    guardarPedidos(valores: Pedidos) {
      return this.http.post<any>(this.apiUrl+'pedidos/guardar', valores);
    }
    obtenerPedidos(id: any) {
      const params = new HttpParams().set('id', id);
      return this.http.get<any>(this.apiUrl+'pedidos/listar', {params});
    }
    guardarPartidaPedido(valores: PartidaPedido) {
      return this.http.post<any>(this.apiUrl+'partidas-pedido/guardar', valores);
    }
    imprimirPedido(id: any) {
      const params = new HttpParams().set('id', id);
      
      return this.http.post<any>(this.apiUrl+'partidas-pedido/imprimir', params)
    }
    obtenerPedido(id: any) {
      const params = new HttpParams().set('id', id);
      return this.http.post<any>(this.apiUrl+'partidas-pedido/obtener', params)
    }

}
